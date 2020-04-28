//include('/choropleth2.js')
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

        var choroplethSlider;
        var choroplethSliderYear=1950;
        var colorScale = d3.scaleThreshold()
                            .domain([10000, 100000, 1000000, 5000000, 10000000, 50000000, 100000000, 500000000, 1000000000])
                            .range(d3.schemeYlGn[9]);
        var geoMapSliderYear = 1950;
        var choroplethData; // all years
        var choroplethDataIndex;
        var currentChoroplethData; // current year
        const countryNameDict = {};
        var gMap = d3.select("#gMap");


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
            console.log(wp);
            clickLineChart();
            initializeSliders();
        }
    });

getChoroplethData();
drawMaleBarChart();
    
function clickLineChart()
{
    document.getElementById("defaultOpen").click();
}

function initializeSliders()
{
    var minStart = 1950, maxStart = 2050,
        minEnd = 1950, maxEnd = 2050;

    gStart = d3.select("#Start_Slider");
    gEnd = d3.select("#End_Slider");

    sliderStart = d3
        .sliderHorizontal()
        .min(minStart)
        .max(maxStart)
        .step(1)
        .width(500)
        .fill("#eee")
        .displayValue(true)
        .on('onchange', val => {
            startYear = parseInt(val);
            startIndex = startYear - 1950;
            showChart(chartName);
        });

    sliderEnd = d3
        .sliderHorizontal()
        .min(minEnd)
        .max(maxEnd)
        .step(1)
        .width(500)
        .default(2050)
        .fill("#0600b8")
        .displayValue(true)
        .on('onchange', val => {
            endYear = parseInt(val);
            endIndex = endYear - 1950;
            showChart(chartName);
        });

    gStart.call(sliderStart);
    d3.select("#Start_Slider")
        .selectAll(".track-inset")
        .attr("stroke", "#0600b8");

    gEnd.call(sliderEnd);
}

function setSliderStart(sy)
{
    startYear = sy;
    startIndex = startYear-1950;
    sliderStart.value(sy);
}

function setSliderEnd(ey)
{
    endYear = ey;
    endIndex = endYear - 1950;
    sliderEnd.value(ey);
}

// slices data according to currently selected year range
function sliceWp() {
    for(var key in wp) {
        wpSliced[key]=wp[key].slice(startIndex,endIndex+1)
    }
}

function showChart(chartName)
{
    //blankSlate();
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
            drawBar(wpSliced,"svg","xAxis","yAxis","plot");
            break;
    }
    areaData = [
		{
			"name": "World",
			"area": 148429000
		}, {
			"name": "Asia",
			"area": 44579000
		}, {
			"name": "Africa",
			"area": 30065000
		}, {
			"name": "North America",
			"area": 24256000
		}, {
			"name": "South America",
			"area": 17819000
		}, {
			"name": "Europe",
			"area": 9938000
		},  {
			"name": "Oceania",
			"area": 7687000
		}
	];
    showBubbleChartForQuestion1(areaData);
    //showChoroplethForQuestion1(wpSliced, areaData);
    //drawMap();
}

function changeChart(evt, cn) // called when tab is changed - Line, Bar, Scatetr
{
    console.log("tab changed")
    //blankSlate();
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
    console.log('black slate called')
    d3.selectAll(".PathLine").remove();
    d3.selectAll(".PathScatter").remove();
}

function plotWorld()
{
    $.ajax({
        url:"/showWorldData",
        success: function(result)
        {
            data = JSON.parse(result).wp
            wp = data['populationList']
            console.log(wp)
            showChart(chartName);
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
    //console.log(selectedCountryNamesList)
    blankSlate();
    wp = {};
    wpSliced = {};
    //var wp;
    countryNames = selectedCountryNamesList; //['India','China','United States','Canada','Russia','Malaysia']
    countryNames = JSON.stringify(countryNames);
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
