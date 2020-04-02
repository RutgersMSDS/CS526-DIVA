var chartName = 'Line Chart';
var selectedCountryNamesList = [];
var wp={};
var wpSliced = {};
var continentp;
var startIndex=0;
var endIndex=100;
var startYear = 1950;
var endYear = 2050;
var sliderStart, sliderEnd;

let glineX = d3.select("#searchLineX")
    .attr("transform", "translate(0,-10)")

let glineY = d3.select("#searchLineY")
    .attr("transform", "translate(0,-10)")

$.ajax(
    {
        url:"/showWorldData",
        success: function(result)
        {
            data = JSON.parse(result).wp;
            wp = data['populationList'];
            //wpSliced = wp;
            console.log(wp);
            clickLineChart();
            initializeSliders();
        }
    });

function drawMap()
{
    const svg = d3.select('#gMap');

    const projection = d3.geoNaturalEarth1();
    const pathGenerator = d3.geoPath().projection(projection);

    svg.append('path')
        .attr('class', 'sphere')
        .attr('d', pathGenerator({type: 'Sphere'}));

    Promise.all([
        d3.tsv('https://unpkg.com/world-atlas@1.1.4/world/110m.tsv'),
        d3.json('https://unpkg.com/world-atlas@1.1.4/world/110m.json')
    ]).then(([tsvData,jsonData]) => {

        const countryNameDict = {};
        tsvData.forEach(d => {
            countryNameDict[d.iso_n3] = d.name;
        })
        //console.log(countryName);
        const countries = topojson.feature(jsonData, jsonData.objects.countries);
        //console.log(countries)
        svg.selectAll('path').data(countries.features)
            .enter().append('path')
            .attr('class', 'country')
            .attr('d', pathGenerator)
            .style('fill','white')
            .on('mouseover',d=>{
                //console.log(countryName[d.id]);
                //d3.select("#"+d.id);
                //console.log(d)
                //d3.select(d.id).attr('fill','red')
            })
            .on('mousedown.log', function (d) {
                //console.log(d);  // outputs data of country
                //console.log(this); // outputs path of country
                selectedCountryName = countryNameDict[d.id]
                currentColor = this.style.fill;
                (currentColor=='white')?(addCountry(selectedCountryName)):(removeCountry(selectedCountryName));
                newColor = (currentColor=='white')?'red':'white';
                d3.select(this).style('fill',newColor);
                plotCountries();
                //console.log(selectedCountryNamesList);
            })
            .append('title')
            .attr('class','countryName')
            .text(d=>countryNameDict[d.id]);
    });
} // end of drawMap

function clickLineChart()
{
    document.getElementById("defaultOpen").click(); // select line chart tab by default
}

function initializeSliders()
{
    gStart = d3.select("#Start_Slider")
    gEnd = d3.select("#End_Slider")

    sliderStart = d3
        .sliderHorizontal()
        .min(1950)
        .max(2050)
        .step(1)
        .width(900)
        .displayValue(true)
        .on('onchange', val => {
            startYear = parseInt(val);
            startIndex = startYear - 1950;
            showChart(chartName);
        });

    sliderEnd = d3
        .sliderHorizontal()
        .min(1950)
        .max(2050)
        .step(1)
        .width(900)
        .default(2050)
        .displayValue(true)
        .on('onchange', val => {
            endYear = parseInt(val);
            endIndex = endYear - 1950;
            showChart(chartName);
        });

    gStart.call(sliderStart)
    gEnd.call(sliderEnd)
}

function setSliderStart(sy)
{
    startYear = sy;
    startIndex = startYear-1950;
    sliderStart.value(sy);
    //sliceWp();
}

function setSliderEnd(ey)
{
    endYear = ey;
    endIndex = endYear - 1950;
    sliderEnd.value(ey);
    //sliceWp();
}

function sliceWp() // slices data according to currently selected year range
{
    for(var key in wp)
    {
        //console.log(wp[key])
        wpSliced[key]=wp[key].slice(startIndex,endIndex+1)
        //console.log(wpSliced[key])
    }
}

function showChart(chartName)
{
    console.log("showChart called")
    sliceWp();
    switch(chartName)
    {
        case 'Line Chart':
            drawLine(wpSliced,"svg","xAxis","yAxis","plot");
            break;
        case 'Scatter Chart':
            drawScatter(wpSliced,"svg","xAxis","yAxis","plot");
            break;
        case 'Bar Chart':
            drawScatter(wp.slice(startIndex,endIndex+1),"svg","xAxis","yAxis","plot");
            break;
    }
    drawMap();
}

function changeChart(evt, cn) // called when tab is changed - Line, Bar, Scatetr
{
    console.log("tab changed")
    chartName = cn;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++)
    {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++)
    {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    // document.getElementById(chartName).style.display = "block";
    evt.currentTarget.className += " active";
    showChart(chartName);
}

function blankSlate()
{
    d3.selectAll(".PathLine").remove();
    d3.selectAll(".PathScatter").remove();
}

function plotWorld()
{
    $.ajax(
        {
            url:"/showWorldData",
            success: function(result)
            {
                data = JSON.parse(result).wp
                wp = data['populationList']
                console.log(wp)
                showChart(chartName);
                //clickLineChart();
                //initializeSliders();
                //drawChart(wp,type_of_plot)
            }
        });
}

function plotContinents()
{
    blankSlate();
    wp = {};
    wpSliced = {};
    //var wp;
    //continentNames = document.getElementById("continents").value;
    continentNames = ["Asia","Africa","Europe","Oceania","North America","South America"];
    continentNames = JSON.stringify(continentNames)
    //d3.select("#plotText").text(continentNames)
    console.log(continentNames);
    $.ajax(
        {
            type: "POST",
            data: { csrfmiddlewaretoken: "{{ csrf_token }}",   // < here
                'continents':continentNames
            },
            url:"/showContinentsData",
            success: function(result)
            {
                data = JSON.parse(result).cp
                //console.log(data['populationList'])
                wp = data['populationList']
                console.log(wp)
                sliceWp();
                //drawLine(wp.slice(startIndex,endIndex+1),"svg","xAxis","yAxis","plot")
                showChart(chartName);
            }
        });
}

function plotCountries()
{
    blankSlate();
    wp = {};
    wpSliced = {};
    //var wp;
    countryNames = selectedCountryNamesList//['India','China','United States','Canada','Russia','Malaysia']
    countryNames = JSON.stringify(countryNames)
    //d3.select("#plotText").text(countryName);
    console.log(countryNames);
    $.ajax(
        {
            type: "POST",
            data: { csrfmiddlewaretoken: "{{ csrf_token }}",   // < here
                'countries':countryNames
            },
            url:"/showCountryData",
            success: function(result)
            {
                data = JSON.parse(result).cp
                //console.log(data)
                wp = data['populationList']
                console.log(wp)
                sliceWp();
                //drawLine(wp.slice(startIndex,endIndex+1),"svg","xAxis","yAxis","plot")
                showChart(chartName);
            }
        });
}

function addCountry(countryName)
{
    //sliderEnd.value(2000);
    selectedCountryNamesList.push(countryName);
}

function removeCountry(countryName) // removes country from selected list
{
    let i=0;
    let noe = selectedCountryNamesList.length;
    for(i=0;i<noe;i++)
    {
        console.log(selectedCountryNamesList[i]);
        if((selectedCountryNamesList[i].localeCompare(countryName))==0)
        {
            selectedCountryNamesList.splice(i,1);
            break;
        }
    }
    console.log(selectedCountryNamesList)
}
