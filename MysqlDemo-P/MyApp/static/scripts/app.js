var countryColorIndex = 0;

var worldContinentColors = {'World': '#67b7dc', 'Asia': '#845EC2', 'Africa': '#D65DB1', 'North America': '#F26430',
'South America': '#009B72', 'Europe': '#FFC73F', 'Oceania': '#473198'};

var tenCountryColors = ['#C4A69D', '#C6E0FF', '#F45D01', '#5438DC',
    '#B56B45', '#FF9FB2', '#8F3985', '#E71D36',
    '#21295C', '#6A0136'];

var selectedData={};
var selectedCountryNamesList = [];

var colorScale = d3.scaleThreshold()
    .domain([10000, 100000, 1000000, 5000000, 10000000, 50000000, 100000000, 500000000, 1000000000])
    .range(d3.schemeYlGn[9]);

showPage('populationTrend', initializePopulationTrends);

function initializePopulationTrends() {
    plotWorld();
    getChoroplethData(1950);
}

function showPage(pageName, successCallback) {
    $("#divSelect").load(pageName, successCallback)
}
