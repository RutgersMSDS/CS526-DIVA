
var choroplethData; // all years
var choroplethDataIndex;
var currentChoroplethData; // current year
const countryNameDict = {};

function getChoroplethData(choroplethSliderYear)
{
    $.ajax({
        url:"/showChoroplethData",
        success: function(result)
        {
            choroplethData = JSON.parse(result).choroplethData;
            choroplethDataIndex = 0;
            currentChoroplethData = choroplethData[choroplethSliderYear];
            drawMap();
        }
    });
}

function drawMap()
{
    mapDiv = document.getElementById("mapDiv");

    var outerWidth  = mapDiv.clientWidth,
        outerHeight = mapDiv.clientHeight;

    var margin = {top: 50, right: 100, bottom: 50, left: 100};
    var width = outerWidth - margin.left - margin.right,
        height = outerHeight - margin.top - margin.bottom;

    var svg = d3.select("#mapDiv")
        .append("svg")
        .attr("id", "map")
        .attr("border",1)
        .style("background-color", "#0600b8;")
        .attr("width",  width)
        .attr("height", outerHeight-2)
        .attr("transform", "translate(" +  margin.left + "," + 2 + ")");

    var gMap = svg.append("g")
        .attr("id","canvas")
        .attr("width", width)
        .attr("height", height)
        .attr("transform", "translate(" +  0 + "," + margin.top + ")");

    d3.select('#map').call(
        d3.zoom()
            .scaleExtent([1, 8])
            .translateExtent([[-margin.left, -margin.top], [width, height]])
            .extent([[0, 0], [width, height]])
            .on('zoom' , () => {
                gMap.attr("transform",d3.event.transform);
            }));

    var projection = d3.geoNaturalEarth1();
    projection.translate([width / 2, height / 2])
        .scale(160);

    var pathGenerator = d3.geoPath().projection(projection);

    var tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .attr("id", "mapToolTip")
        .style("opacity", 0);

    d3.select(".sphere").remove();
    d3.selectAll(".country").remove();

    gMap.append('path')
        .attr('class', 'sphere')
        .attr('d', pathGenerator({type: 'Sphere'}));

    Promise.all([
        d3.tsv('https://unpkg.com/world-atlas@1.1.4/world/110m.tsv'),
        d3.json('https://unpkg.com/world-atlas@1.1.4/world/50m.json')
    ])
        .then(([tsvData,jsonData]) => {
            tsvData.forEach(d => {
                countryNameDict[d.iso_n3] = d.name;
            });

            var countries = topojson.feature(jsonData, jsonData.objects.countries);
            gMap.selectAll('path')
                .data(countries.features)
                .enter().append('path')
                .attr('class', 'country')
                .attr('d', pathGenerator)
                .style('fill',function(d){
                    selectedCountryName = countryNameDict[d.id];
                    var choroplethCountryName = getDatabaseCountryName(selectedCountryName);
                    d.population = currentChoroplethData[choroplethCountryName];
                    if(d.population==undefined) {d.population=0;}
                    return colorScale(d.population);
                })
                .on('mousedown.log', function (d) {
                    var selectedCountryName = countryNameDict[d.id];
                    var choroplethCountryName = getDatabaseCountryName(selectedCountryName);
                    if(!selectedCountryNamesList.includes(selectedCountryName)
                        && (selectedCountryNamesList.length) < 10) {

                        selectedCountryNamesList.push(selectedCountryName);
                        var newColor = tenCountryColors[(countryColorIndex ++)%10];

                        d3.select(this).style('fill', newColor);
                        plotCountry(selectedCountryName, newColor);

                    } else if(selectedCountryNamesList.includes(selectedCountryName)) {
                        //previously clicked, now deselected
                        removeLine(selectedCountryName);

                        var newColor = colorScale(currentChoroplethData[choroplethCountryName]);
                        d3.select(this).style('fill',newColor);

                    } else if(selectedCountryNamesList.length == 10) {
                        //show toast of max 10
                    }
                })
                .append('title')
                .attr('class','countryName')
                .text(function(d){
                    var countryPopulation = d.population;
                    return(countryNameDict[d.id]+" : "+countryPopulation.toLocaleString())
                })
        });

    initializeChoroplethSlider();
    initializeChoroplethLegend(outerHeight)
}

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
    var sliderDiv = document.getElementById("mapSliderDiv");
    var outerWidth  = sliderDiv.clientWidth,
        outerHeight = sliderDiv.clientHeight;

    var margin = {top: 5, right: 100, bottom: 10, left: 100};
    var width = outerWidth - margin.left - margin.right,
        height = outerHeight - margin.top - margin.bottom;

    var svg = d3.select("#mapSliderDiv")
        .append("svg")
        .attr("id", "slider")
        .attr("border",1)
        .attr("width",  outerWidth)
        .attr("height", outerHeight);

    var gChoroplethSlider = svg.append("g")
        .attr("id","sliderCanvas")
        .attr("width", width)
        .attr("height", height)
        .attr("transform", "translate(" + margin.left + "," + height/2 + ")");

    var choroplethSlider = d3.sliderHorizontal()
        .min(1950)
        .max(2050)
        .step(1)
        .width(width)
        .displayValue(true)
        .on('onchange', val => {
            choroplethSliderYear = parseInt(val);
            choroplethDataIndex = choroplethSliderYear - 1950;
            currentChoroplethData = choroplethData[choroplethSliderYear];
            updateChoroplpeth(choroplethSliderYear);
        });
    gChoroplethSlider.call(choroplethSlider);
    d3.select("path.handle").attr("fill", "#4242e4")
}

function plotCountry(countryName, color)
{
    $.ajax({
        type: "POST",
        data: { csrfmiddlewaretoken: "{{ csrf_token }}",   // < here
            'country':countryName
        },
        url:"/showCountryData",
        success: function(result)
        {
            var data = JSON.parse(result).cp.populationList;
            drawLine(data, countryName, color);
        }
    });
}

function linspace(start, end, n) {
    var out = [];
    var delta = (end - start) / (n - 1);

    var i = 0;
    while(i < (n - 1)) {
        out.push(start + (i * delta));
        i++;
    }

    out.push(end);
    return out;
}

function initializeChoroplethLegend(height) {
    // add the legend now
    var legendFullHeight = height;
    var legendFullWidth = 150;

    var legendMargin = { top: 0, bottom: 20, left: 50, right: 20 };

    // use same margins as main plot
    var legendWidth = legendFullWidth - legendMargin.left - legendMargin.right -50;
    var legendHeight = legendFullHeight;

    var legendSvg = d3.select("#mapDiv")
        .append('svg')
        .attr("id", "chroplethLegendSVG")
        .attr('width', legendFullWidth)
        .attr('height', legendFullHeight)
        .attr('transform', 'translate(0,' + legendMargin.top + ')')
        .append('g')
        .attr('transform', 'translate(' + 0 + ',' + legendMargin.top + ')');

    // create a scale and axis for the legend
    const logScale = d3.scaleLog()
        .domain([10000, 1000000000]);
    const colorScaleLog = d3.scaleSequential(
        (d) => d3.interpolateYlGn(logScale(d))
    );

    // create a scale and axis for the legend
    var legendAxis = d3.axisRight(colorScaleLog)
        .ticks(9, "d")
        .tickValues([10000, 100000, 1000000, 5000000, 10000000, 50000000, 100000000, 500000000, 1000000000]);

    legendSvg.append("g")
        .attr('class', 'scale-log')
        .attr('transform', 'translate(0, 0)')
        .selectAll('bars').data([10000, 100000, 1000000, 5000000, 10000000, 50000000, 100000000, 500000000, 1000000000]).enter()
        .append('rect')
        .attr('y', (d, i) => i * 1.15 * legendWidth + 10)
        .attr('x', legendWidth)
        .attr('width', 50)
        .attr('height', 30)
        .attr('fill', colorScaleLog);
    legendSvg.append("g")
        .attr('class', 'scale-log')
        .attr('transform', 'translate(0, 0)')
        .selectAll('bars').data([10000, 100000, 1000000, 5000000, 10000000, 50000000, 100000000, 500000000, 1000000000]).enter()
        .append('text')
        .text(d => d)
        .attr('font-family', 'sans-serif')
        .attr('font-size', '12px')
        .attr('y', (d, i) => i* 1.15 * legendWidth + 35)
        .attr('x', legendWidth + 50)
        .attr('width', 100)
        .attr('height', 35)
        .attr('fill', "white")
}