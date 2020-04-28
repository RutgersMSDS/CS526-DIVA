
var selectedCountryNamesList = []; // List will either be empty or have single country
var choroplethSlider;
var choroplethSliderYear = 2000;
var choroplethSliderAge = 0;
var colorScale = d3.scaleThreshold()
    .domain([80,99.5,100.5,120])
    .range('white','magenta','chartreuse','blue','white');
var geoMapSliderYear = 1950;
var choroplethData; // all years
var choroplethDataIndex;
var currentChoroplethData;
var gMap = d3.select("#gMap");
var selectedCountryRatio = 100;

function getColor(ratio)
{
    if(ratio === -1) return 'rgb(126, 3, 168)';
    else if (ratio<80) return 'rgb(253,231,37)';
    else if (ratio<99.5) return 'rgb(255,0,255)';
    else if (ratio<100.5) return 'rgb(254,153,41)';
    else if (ratio<120) return 'rgb(0, 0, 255)';
    else return 'rgb(44,162,95)';
}

function getPyramidChoroplethData()
{

    $.ajax(
        {
            type: "POST",
            data: { csrfmiddlewaretoken: "{{ csrf_token }}",   // < here 
                'year':2020,
                'age':23
            },
            url:"/getPyramidChoroplethData",
            success: function(result)
            {
                pyramidChoroplethData = JSON.parse(result).pyramidChoroplethData;
                //console.log(pyramidChoroplethData['India']);
                /*choroplethDataIndex = 0;
                currentChoroplethData = choroplethData[choroplethSliderYear];
                //console.log(currentChoroplethData);*/
                drawPyramidMap();
            }
        }
    );
}

function drawPyramidMap()
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
                d.ratio = pyramidChoroplethData[choroplethCountryName];
                if(d.ratio==undefined) {d.ratio=100;}
                return getColor(d.ratio)
            })
            .on('mousedown.log', function (d) {
                selectedCountryName = countryNameDict[d.id];
                choroplethCountryName = getDatabaseCountryName(selectedCountryName);
                //console.log(choroplethCountryName)
                currentColor = this.style.fill;
                if(currentColor=='red')
                {
                    d3.select(this).style('fill',getColor(d.ratio))
                    selectedCountryNamesList = []
                    emptyPyramid();
                }
                else
                {
                    d3.select(this).style('fill','red');
                    oldThis = selectedCountryNamesList[0]
                    oldRatio = selectedCountryRatio
                    d3.select(oldThis).style('fill',getColor(oldRatio))
                    selectedCountryNamesList[0]=this
                    selectedCountryRatio = d.ratio
                    console.log(choroplethCountryName)
                    drawPyramidChart2(choroplethCountryName)
                }
            })
            .append('title')
            .attr('class','countryName')
            .text(function(d){
                //var countryPopulation = d.population;
                //console.log(countryNameDict[d.id])
                return(countryNameDict[d.id]+"\n"+d.ratio)
            })
    });
    initializePyramidChoroplethYearSlider();
    initializePyramidChoroplethAgeSlider();
    initializePyramidLegend();
} // end of drawMap

function updatePyramidChoroplpeth()
{
    d3.selectAll(".country")
        .style("fill" , function(d){
            //console.log(d.id);
            currentColor = this.style.fill;
            selectedCountryName = countryNameDict[d.id];
            console.log(selectedCountryName)
            choroplethCountryName = getDatabaseCountryName(selectedCountryName);
            // d.population = currentChoroplethData[choroplethCountryName];
            //if(d.population==undefined) {d.population=0;}
            d.ratio = pyramidChoroplethData[choroplethCountryName];
            if(d.ratio==undefined) {
                d.ratio=-1;
            }
            newColor = (currentColor=='red')?'red':getColor(d.ratio);
            return newColor;
        })
        .select(".countryName")
        .text(function(d){

            return(countryNameDict[d.id]+"\n"+d.ratio)
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

function initializePyramidChoroplethYearSlider()
{
    gChoroplethSlider = d3.select("#Choropleth_Year_Slider")
    choroplethSlider = d3
        .sliderHorizontal()
        .min(2000)
        .max(2050)
        .step(1)
        .width(400)
        .displayValue(true)
        .on('end', val => {
            choroplethSliderYear = parseInt(val);
            console.log(choroplethSliderYear)

            $.ajax(
                {
                    type: "POST",
                    data: { csrfmiddlewaretoken: "{{ csrf_token }}",   // < here
                        'year':choroplethSliderYear,
                        'age':choroplethSliderAge
                    },
                    url:"/getPyramidChoroplethData",
                    success: function(result)
                    {
                        pyramidChoroplethData = JSON.parse(result).pyramidChoroplethData;
                        //console.log(pyramidChoroplethData['India']);
                        /*choroplethDataIndex = 0;
                        currentChoroplethData = choroplethData[choroplethSliderYear];
                        //console.log(currentChoroplethData);*/
                        updatePyramidChoroplpeth();
                    }
                }
            );

            //startIndex = startYear - 1950;
            //getChoroplethData();
            //updateChoroplpeth();
        });
    gChoroplethSlider.call(choroplethSlider);
}

function initializePyramidLegend(){
    var colorDomain = ['Sex ratio:','No Data', '< 80', '80 - 99.5', '99.5 - 100.5', '100.5 - 120', '> 120'];
    var legendFullHeight = 500, mapDivName="choroplethDiv";
    var legendFullWidth = 150;

    var legendMargin = {top: 0, bottom: 20, left: 50, right: 20};

    // use same margins as main plot
    var legendWidth = legendFullWidth - legendMargin.left - legendMargin.right - 30;

    var legendSvg = d3.select("#" + mapDivName)
        .append('svg')
        .attr("id", "chroplethLegendSVG" + mapDivName)
        .attr('width', legendFullWidth)
        .attr('height', legendFullHeight)
        .attr('transform', 'translate(0,' + legendMargin.top + ')')
        .append('g')
        .attr('transform', 'translate(' + 0 + ',' + legendMargin.top + ')');


    legendSvg.append("g")
        .attr('class', 'scale-log-color')
        .attr('transform', 'translate(0, 0)')
        .selectAll('text').data([-1, 79, 99, 100, 101, 120]).enter()
        .append('rect')
        .attr('y', (d, i) => (i * 0.8)* legendWidth + 30)
        .attr('x', (d, i) => legendWidth - 50)
        .attr('width', 50)
        .attr('height', 30)
        .attr('fill', (d, i) => getColor(d));

    legendSvg.append("g")
        .attr('id', mapDivName + 'scale-log-text')
        .attr('transform', 'translate(0, 0)')
        .selectAll('bars').data(colorDomain).enter()
        .append('text')
        .text(d => d)
        .attr('font-family', 'sans-serif')
        .attr('font-size', '12px')
        .attr('y', (d, i) => (i * 0.8) * legendWidth + 12)
        .attr('x', (d, i) => legendWidth )
        .attr('width', 100)
        .attr('height', 20)
        .attr('fill', "white");
}

function initializePyramidChoroplethAgeSlider()
{
    gChoroplethSlider = d3.select("#Choropleth_Age_Slider")
    choroplethSlider = d3
        .sliderHorizontal()
        .min(0)
        .max(100)
        .step(1)
        .width(400)
        .displayValue(true)
        .on('end', val => {
            choroplethSliderAge = parseInt(val);
            console.log(choroplethSliderAge)

            $.ajax(
                {
                    type: "POST",
                    data: { csrfmiddlewaretoken: "{{ csrf_token }}",   // < here
                        'year':choroplethSliderYear,
                        'age':choroplethSliderAge
                    },
                    url:"/getPyramidChoroplethData",
                    success: function(result)
                    {
                        pyramidChoroplethData = JSON.parse(result).pyramidChoroplethData;
                        //console.log(pyramidChoroplethData['India']);
                        /*choroplethDataIndex = 0;
                        currentChoroplethData = choroplethData[choroplethSliderYear];
                        //console.log(currentChoroplethData);*/
                        updatePyramidChoroplpeth();
                    }
                }
            );

            //startIndex = startYear - 1950;
            //getChoroplethData();
            //updateChoroplpeth();
        });
    gChoroplethSlider.call(choroplethSlider);
}


function addPyramidCountry(countryName)
{
    //sliderEnd.value(2000);
    selectedCountryNamesList.push(countryName);
}

function removePyramidCountry(countryName) // removes country from selected list
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
