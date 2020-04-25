var lineChart = null, lineDateAxis, lineValueAxis;
function plotWorld()
{
    selectedCountryNamesList.push("World");
    $.ajax({
        url:"/showWorldData",
        success: function(result)
        {
            data = JSON.parse(result).wp;
            drawLine(data['populationList'], "World", worldContinentColors.World);
        }
    });
}

function drawLine(inputData, place, color) {

    function initializeLineChartTheme() {
        am4core.useTheme(am4themes_animated);
        lineChart = am4core.create("lineChartDiv", am4charts.XYChart);
        lineChart.dateFormatter.inputDateFormat = "YYYY";

        lineDateAxis = lineChart.xAxes.push(new am4charts.CategoryAxis());
        lineDateAxis.dataFields.category = "year";
        lineDateAxis.title.text = "Years";

        lineValueAxis = lineChart.yAxes.push(new am4charts.ValueAxis());
        lineValueAxis.title.text = "Population";

        lineDateAxis.start = 0.5;
        lineDateAxis.keepSelection = true;

        lineChart.cursor = new am4charts.XYCursor();
        lineChart.cursor.behavior = "panXY";
        lineChart.cursor.xAxis = lineDateAxis;
        //chart.cursor.snapToSeries = series;

        lineChart.legend = new am4charts.Legend();

        lineChart.scrollbarY = new am4core.Scrollbar();
        lineChart.scrollbarY.parent = lineChart.leftAxesContainer;
        lineChart.scrollbarY.toBack();

        lineChart.scrollbarX = new am4charts.XYChartScrollbar();
        lineChart.scrollbarX.parent = lineChart.bottomAxesContainer;
    }

    function addSeries(key) {

        var series = lineChart.series.push(new am4charts.LineSeries());

        series.name = key;
        series.stroke = am4core.color(color);
        series.dataFields.valueY = key;
        series.dataFields.categoryX = "year";
        series.tooltipText = "[bold]" + key + "[/]: {" + key + "}";
        series.strokeWidth = 2;
        series.minBulletDistance = 15;

        series.tooltip.background.cornerRadius = 20;
        series.tooltip.background.strokeOpacity = 0;
        series.tooltip.getFillFromObject = false;
        series.tooltip.background.fill = am4core.color(color);
        series.tooltip.background.stroke = am4core.color(color);
        series.tooltip.background.strokeWidth = 2;
        series.tooltip.pointerOrientation = "vertical";
        series.tooltip.label.minWidth = 40;
        series.tooltip.label.minHeight = 35;
        series.tooltip.label.textAlign = "middle";
        series.tooltip.label.textValign = "middle";

        var bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.strokeWidth = 2;
        bullet.circle.radius = 4;
        bullet.circle.fill = am4core.color("#fff");

        var bullethover = bullet.states.create("hover");
        bullethover.properties.scale = 1.3;
        lineChart.scrollbarX.series.push(series);
    }

    if(selectedCountryNamesList.length < 10) {
        if(lineChart === null){
            initializeLineChartTheme();
        }
        if(lineChart.data.length === 0) {
            lineChart.data = inputData;
            selectedData = lineChart.data;
        } else {
            mergeNewDataToChartData(inputData)
        }
        addSeries(place);
    } else {
        $('.toast').toast('show')
    }
}

function removeLine(key) {
    if (lineChart.series.length > 0) {
        var index = selectedCountryNamesList.indexOf(key);
        lineChart.series.removeIndex(index).dispose();
        selectedCountryNamesList.splice(index, 1);
    } else if (lineChart.series.length === 0) {
        countryColorIndex = 0;
    }
}

function mergeNewDataToChartData(newData) {
    var map = new Map();
    lineChart.data.forEach(item => map.set(item.year, item));
    newData.forEach(item => map.set(item.year, {...map.get(item.year), ...item}));
    lineChart.data = Array.from(map.values());
}