
function drawBarChartForQuestion1()
{
    var barChartDiv = document.getElementById("barChartDiv");
    var outerWidth  = barChartDiv.clientWidth,
        outerHeight = barChartDiv.clientHeight;

    var margin = {top: 100, right: 40, bottom: 10, left: 40};
    var width = outerWidth - margin.left - margin.right,
        height = outerHeight - margin.top - margin.bottom;

    var margin = ({top: 20, right: 30, bottom: 30, left: 40});

    var svg = d3.select("#barChartDiv")
        .append("svg")
        .attr("border",1)
        .attr("width",  outerWidth)
        .attr("height", outerHeight);

    var borderPath = svg.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("height", outerHeight)
        .attr("width", outerWidth)
        .style("stroke", "#000")
        .style("fill", "none")
        .style("stroke-width", 1);
}