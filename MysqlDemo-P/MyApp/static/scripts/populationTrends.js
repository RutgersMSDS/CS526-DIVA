var populationTrend = {
    worldContinentColors: {
        'World': '#67b7dc',
        'Asia': '#845EC2',
        'Africa': '#D65DB1',
        'North America': '#F26430',
        'South America': '#007f01',
        'Europe': '#FFC73F',
        'Oceania': '#473198'},
    tenCountryColors: [
        'rgb(106, 126, 107)', 'rgb(18, 104, 255)', 'rgb(244, 93, 1)', 'rgb(84, 56, 220)',
        'rgb(181, 107, 69)', 'rgb(255, 159, 178)', 'rgb(143, 57, 133)', 'rgb(231, 29, 54)',
        'rgb(33, 41, 92)', 'rgb(106, 1, 54)'],
    lineChartXAxis: {
        category: 'year',
        title: 'Year'},
    lineChartYAxis: {
        title: 'Population'
    },
    lineChartDiv: "lineChartDiv",
    countryColorIndex: 0,
    selectedData: {},
    selectedCountryNamesList: [],
    choroplethData: {},
    choroplethDataIndex: 0,
    choroplethSliderYear: 1950,
    currentChoroplethData: {},
    lineChart: null,
    lineDateAxis: null,
    lineValueAxis: null,
    showChoroplethLegend: true,
    showChoroplethSlider: true,
    deletePlace: "",
    currentColor: "",
    addPlace: "",
    fillKey: "population",
    mapDivName: 'mapDiv',
    mapSliderName:'mapSliderDiv',
    mapColors: d3.schemeYlGn[9],
    mapDomain: [10000, 100000, 1000000, 5000000, 10000000, 50000000, 100000000, 500000000, 1000000000],
    mapLegendTicks: ["Population range:", 10000, 100000, 1000000, 5000000, 10000000, 50000000, 100000000, 500000000, 1000000000],
    updateLegendTicks: false,
    updateLegend: null
};
populationTrend.colorScale =  function (key) {
    var scale = d3.scaleThreshold()
        .domain(populationTrend.mapDomain)
        .range(populationTrend.mapColors);

    var fillValue = populationTrend.currentChoroplethData[key];

    if(fillValue === undefined) {
        fillValue = 0;
    }
    return scale(fillValue);
};

function setContinentButtonFunctionalityForPopulation() {
    $(".form-check .button_continent").click(function(){

        var idOfSelectedItem = (this.id);
        if(!populationTrend.selectedCountryNamesList.includes(idOfSelectedItem)
            && (populationTrend.selectedCountryNamesList.length)<10) {

            //newly selected and total number of places selected is less than 10
            if(idOfSelectedItem === "World") {
                plotWorld()
            } else {
                getContinentData(idOfSelectedItem);
            }
        } else if(populationTrend.selectedCountryNamesList.includes(idOfSelectedItem)) {

            populationTrend.deletePlace = idOfSelectedItem;
            removeLine(populationTrend);

        } else if(populationTrend.selectedCountryNamesList.length === 10) {
            alert("Max selection 10 exceeded.");
        }
    });
}

function plotWorld() {
    $.ajax({
        url:"/showWorldData",
        success: function(result) {
            data = JSON.parse(result).wp.populationList;

            populationTrend.fillKey = "World";
            populationTrend.currentColor = populationTrend.worldContinentColors.World;
            populationTrend.addPlace = "World";

            drawLine(populationTrend, data);
            populationTrend.selectedCountryNamesList.push("World");
        },
        failure: function (error) {
            alert("Unable to retrieve data. Kindly check your network connection.");
        }
    });
}

function getContinentData(continentName) {
    $.ajax(
        {
            type: "POST",
            data: { csrfmiddlewaretoken: "{{ csrf_token }}",   // < here
                'continents':continentName
            },
            url:"/showContinentsData",
            success: function(result) {
                var data = JSON.parse(result).cp.populationList;

                populationTrend.fillKey = continentName;
                populationTrend.currentColor = populationTrend.worldContinentColors[continentName];
                populationTrend.addPlace = continentName;

                drawLine(populationTrend, data);
                populationTrend.selectedCountryNamesList.push(continentName);
            },
            failure: function (error) {
                alert("Unable to retrieve data. Kindly check your network connection.");
            }
        });
}

function plotCountry(countryName, color) {
    $.ajax({
        type: "POST",
        data: { csrfmiddlewaretoken: "{{ csrf_token }}",   // < here
            'country':countryName
        },
        url:"/showCountryData",
        success: function(result) {
            var data = JSON.parse(result).cp.populationList;

            populationTrend.fillKey = countryName;
            populationTrend.currentColor = color;
            populationTrend.addPlace = countryName;

            drawLine(populationTrend, data);
            populationTrend.selectedCountryNamesList.push(countryName);
        },
        failure: function (error) {
            alert("Unable to retrieve data. Kindly check your network connection.");
        }
    });
}

function getChoroplethData() {
    $.ajax({
        url:"/showChoroplethData",
        success: function(result) {
            populationTrend.choroplethData = JSON.parse(result).choroplethData;
            populationTrend.choroplethDataIndex = 0;
            populationTrend.currentChoroplethData = populationTrend.choroplethData[populationTrend.choroplethSliderYear];
            drawMap(populationTrend, plotCountry, removeLine);
        },
        failure: function (error) {
            alert("Unable to retrieve data. Kindly check your network connection.");
        }
    });
}