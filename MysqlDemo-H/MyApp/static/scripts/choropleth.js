function showChoroplethForQuestion1(popData, areaData) {
    let choroplethDiv = document.getElementById("choroplethDiv");
    var outerWidth  = choroplethDiv.clientWidth,
        outerHeight = choroplethDiv.clientHeight;

    var margin = {top: 100, right: 40, bottom: 10, left: 40};
    var width = outerWidth - margin.left - margin.right,
        height = outerHeight - margin.top - margin.bottom;

    var svg = d3.select("#choroplethDiv")
        .append("svg")
        .attr("border",1)
        .attr("width",  outerWidth)
        .attr("height", outerHeight);

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



}

function myChoropleth()
{

    function drawMap()
    {
        const gMap = d3.select('#gMap');

        const projection = d3.geoNaturalEarth1();
        const pathGenerator = d3.geoPath().projection(projection);
        d3.select(".sphere").remove();
        d3.selectAll(".country").remove();
        gMap.append('path')
            .attr('class', 'sphere')
            .attr('d', pathGenerator({type: 'Sphere'}));

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
                    console.log(selectedCountryName)
                    choroplethCountryName = getDatabaseCountryName(selectedCountryName);
                    d.population = currentChoroplethData[choroplethCountryName];
                    if(d.population==undefined) {d.population=0;}
                    return colorScale(d.population);
                })
                .on('mouseover',d=>{
                    console.log(countryNameDict[d.id]);
                    //d3.select("#"+d.id);
                    //console.log(d)
                    //d3.select(d.id).attr('fill','red')
                })
                .on('mousedown.log', function (d) {
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
                })
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
}