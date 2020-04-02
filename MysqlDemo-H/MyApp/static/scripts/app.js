var chartName = 'Line Chart';
var selectedCountryNamesList = [];
var currentPlotDepth = "World";
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

    function getChoroplethData()
    {
        
        $.ajax(
        {
           /* type: "POST",
            data: { csrfmiddlewaretoken: "{{ csrf_token }}",   // < here 
            'year':choroplethSliderYear
            },*/
            url:"/showChoroplethData",
            success: function(result)
            {
                choroplethData = JSON.parse(result).choroplethData;
                //console.log(choroplethData);
                choroplethDataIndex = 0;
                currentChoroplethData = choroplethData[choroplethSliderYear];
                //console.log(currentChoroplethData);
                drawMap();
            }
        }    
        );
    }

    function drawMap()
    {
        const gMap = d3.select('#gMap');

        const projection = d3.geoNaturalEarth1();
        projection.scale(100);
        const pathGenerator = d3.geoPath().projection(projection);
        d3.select(".sphere").remove();
        d3.selectAll(".country").remove();
        gMap.append('path')
            .attr('class', 'sphere')
            .attr('d', pathGenerator({type: 'Sphere'}));
        console.log("drawmap called");
        d3.select('#map').call(d3.zoom().on('zoom' , () => {
            gMap.attr("transform",d3.event.transform);
        }))

        Promise.all([
            d3.tsv('https://unpkg.com/world-atlas@1.1.4/world/110m.tsv'),
            //d3.tsv('static/110m.tsv'),
            d3.json('https://unpkg.com/world-atlas@1.1.4/world/50m.json')
        ]).then(([tsvData,jsonData]) => {

            //const countryNameDict = {};
            tsvData.forEach(d => {
                countryNameDict[d.iso_n3] = d.name;
            })
            console.log("choropleth")
            //console.log(countryNameDict.length);
            const countries = topojson.feature(jsonData, jsonData.objects.countries);
            //console.log(countries)
            //console.log(countries.features)
            gMap.selectAll('path').data(countries.features)
            .enter().append('path')
                .attr('class', 'country')
                .attr('d', pathGenerator)
                //.style('fill','white')
                .style('fill',function(d){
                    //console.log(d.id);
                    selectedCountryName = countryNameDict[d.id];
                    //console.log(selectedCountryName)
                    choroplethCountryName = getDatabaseCountryName(selectedCountryName);
                    d.population = currentChoroplethData[choroplethCountryName];
                    if(d.population==undefined) {d.population=0;}
                    return colorScale(d.population);
                })
                .on('mouseover',d=>{
                    //console.log(countryNameDict[d.id]);
                    //d3.select("#"+d.id);
                    //console.log(d)
                    //d3.select(d.id).attr('fill','red')
                })
                /*.on('mousedown.log', function (d) {
                    //console.log(d);  // outputs data of country
                    //console.log(this); // outputs path of country
                    
                    selectedCountryName = countryNameDict[d.id];
                    choroplethCountryName = getDatabaseCountryName(selectedCountryName);
                    currentColor = this.style.fill;
                    (currentColor!='red')?(addCountry(selectedCountryName)):(removeCountry(selectedCountryName));
                    newColor = (currentColor!='red')?'red':colorScale(currentChoroplethData[choroplethCountryName]);
                    d3.select(this).style('fill',newColor);
                    plotCountries();
                    //console.log(selectedCountryNamesList);
                })*/
                .on('mousedown.log', function (d) {
                    //console.log(d);  // outputs data of country
                    //console.log(this); // outputs path of country
                    selectedCountryName = countryNameDict[d.id];
                    if(selectedCountryNamesList.includes(selectedCountryName) || (selectedCountryNamesList.length)<10)
                    {
                        choroplethCountryName = getDatabaseCountryName(selectedCountryName);
                        currentColor = this.style.fill;
                        (currentColor!='red')?(addCountry(selectedCountryName)):(removeCountry(selectedCountryName));
                        newColor = (currentColor!='red')?'red':colorScale(currentChoroplethData[choroplethCountryName]);
                        d3.select(this).style('fill',newColor);
                        plotCountries();
                    }
                })
                    //console.log(selectedCountryNamesList);
                .append('title')
                    .attr('class','countryName')
                    .text(function(d){
                        var countryPopulation = d.population;
                        //console.log(pop)
                        return(countryNameDict[d.id]+" : "+countryPopulation.toLocaleString())
                    })
        });
        initializeChoroplethSlider();
    } // end of drawMap

    function updateChoroplpeth()
    {
        d3.selectAll(".country")
            .style("fill" , function(d){
                //console.log(d.id);
                currentColor = this.style.fill;
                selectedCountryName = countryNameDict[d.id];
                console.log(selectedCountryName)
                choroplethCountryName = getDatabaseCountryName(selectedCountryName);
                d.population = currentChoroplethData[choroplethCountryName];
                if(d.population==undefined) {d.population=0;}
                newColor = (currentColor=='red')?'red':colorScale(d.population);
                return newColor;
            })
            .select(".countryName")
            .text(function(d){
                var countryPopulation = d.population;
                //console.log(pop)
                return(countryNameDict[d.id]+" : "+countryPopulation.toLocaleString())
            })
            //.text(d=>countryNameDict[d.id]+" : "+d.population)
    }

    function getDatabaseCountryName(choroplethCountryName)
    {
        switch(choroplethCountryName)
                    {
                        case 'Myanmar':
                            choroplethCountryName = 'Burma';
                            break;
                        case 'Dem. Rep. Congo':
                            choroplethCountryName = 'Congo (Kinshasa)';
                            break;
                        case 'Congo':
                            choroplethCountryName = 'Congo (Brazzaville)';
                            break;
                        case 'Czech Rep.':
                            choroplethCountryName = 'Czechia';
                            break;
                        case 'Bosnia and Herz.':
                            choroplethCountryName = 'Bosnia and Herzegovina'
                            break;
                        case 'N. Cyprus':
                            choroplethCountryName = 'Turkey';
                            break;
                        case 'Palestine':
                            choroplethCountryName = 'Gaza Strip';
                            break;
                        case 'Dem. Rep. Korea':
                            choroplethCountryName = 'Korea North';
                            break;
                        case 'Korea':
                            choroplethCountryName = 'Korea South';
                            break;
                        case 'Lao PDR':
                            choroplethCountryName = 'Laos';
                            break;
                        case 'Central African Rep.':
                            choroplethCountryName = 'Central African Republic';
                            break;
                        case 'S. Sudan':
                            choroplethCountryName = 'South Sudan';
                            break;
                        case 'Eq. Guinea':
                            choroplethCountryName = 'Equatorial Guinea';
                            break;
                        case "Côte d'Ivoire":
                            choroplethCountryName = "Cote d'Ivoire";
                            break;
                        case 'Dominican Rep.':
                            choroplethCountryName = "Dominican Republic";
                            break;
                        case 'Bahamas':
                            choroplethCountryName = 'Bahamas The';
                            break; 
                        case 'W. Sahara':
                            choroplethCountryName = 'Western Sahara';
                            break;
                        case 'Gambia':
                            choroplethCountryName = 'Gambia The';
                            break;
                        case 'Solomon Is.':
                            choroplethCountryName = 'Solomon Islands';
                            break;    
                    }
            return choroplethCountryName
    }

    function initializeChoroplethSlider()
    {
        gChoroplethSlider = d3.select("#Choropleth_Slider")
        choroplethSlider = d3
        .sliderHorizontal()
        .min(1950)
        .max(2050)
        .step(1)
        .width(400)
        .displayValue(true)
        .on('onchange', val => {
        choroplethSliderYear = parseInt(val);
        console.log(choroplethSliderYear)
        //startIndex = startYear - 1950;
        //getChoroplethData();
        choroplethDataIndex = choroplethSliderYear - 1950;
        currentChoroplethData = choroplethData[choroplethSliderYear];
        updateChoroplpeth();
        });
        gChoroplethSlider.call(choroplethSlider);
    }

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

function plotContinents(selectedContinentNames)
{
    blankSlate();
    wp = {};
    wpSliced = {};
    $.ajax(
        {
            type: "POST",
            data: { csrfmiddlewaretoken: "{{ csrf_token }}",   // < here
                'continents':selectedContinentNames
            },
            url:"/showContinentsData",
            success: function(result)
            {
                data = JSON.parse(result).cp;

                contintents = data['populationList'];
                for(var continent in selectedContinentNames) {
                    wpSliced[continent] = contintents[continent].slice(startIndex,endIndex+1)
                }
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