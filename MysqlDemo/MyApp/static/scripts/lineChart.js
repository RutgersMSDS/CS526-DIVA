function showLineChartForQuestion1(popData){

    let formatYear = d3.timeFormat("%Y");
    let lineChartDiv = document.getElementById("lineChartDiv");

    var outerWidth  = lineChartDiv.clientWidth,
        outerHeight = lineChartDiv.clientHeight;

    var margin = {top: 100, right: 40, bottom: 10, left: 40};
    var width = outerWidth - margin.left - margin.right,
        height = outerHeight - margin.top - margin.bottom;

    var margin = ({top: 20, right: 30, bottom: 30, left: 40});

    var minPopulation = d3.min(popData, function(d){ d['population'] = Math.floor(d['population']/1000000); return d['population']; });
    var maxPopulation = d3.max(popData, function(d){ return d['population']; });

    // Note: ok to leave this without units, implied "px"
    var svg = d3.select("#lineChartDiv")
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

    var g = svg.append("g")
        .attr("id","canvas")
        .attr("width", width)
        .attr("height", height)
        .attr("transform", "translate(" +  margin.left + "," + margin.top + ")");

    var clip = g.append("clipPath")
        .attr("id","clip")
        .append("rect")
        .attr("width", width)
        .attr("height", height);

    // interpolator for X axis -- inner plot region
    var x = d3.scaleLinear()
        .domain([1950,1980])
        .range([0, width]);

    // interpolator for Y axis -- inner plot region
    var y = d3.scaleLinear()
        .domain([minPopulation - 100, maxPopulation + 1000])
        .range([height, 0]);

    // SVG line generator
    var line = d3.line()
        .x(function(d) { return x(d.year); } )
        .y(function(d) { return y(d.population); } );

    // request 5 ticks on the x axis
    var xAxis = d3.axisBottom(x)
        .ticks(20);

    // y Axis
    var yAxis = d3.axisLeft(y)
        .ticks(10);

    var yAxisGroup = g.append("g")
        .attr("class", "y-axis")
        .call(yAxis);

    var xAxisGroup = g.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    var line = d3.line()
        .x(function(d) { return x(d.year); })
        .y(function(d) { return y(d.population); });

    var zoom = d3.zoom()
        .scaleExtent([0,2])
        .on("zoom",zoomed);

    // Define the div for the tooltip
    var div = d3.select("#lineChartDiv").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    var linePlot = g.append("path")
        .attr("height", height)
        .attr("width", width)
        .attr("class", "linePath")
        .attr("clip-path", "url(#clip)")
        .attr("d", line(popData))
        .style('fill', 'none')
        .style('stroke', '#fff')
        .transition()
        .delay(500)
        .duration(1000)
        .style('stroke', '#159db3')
        .style('stroke-width',"2");

    var scatterPlot = g.selectAll(".dot")
        .data(popData)
        .enter().append("circle")
        .attr("class", "dotScatter")
        .style('stroke', '#306c75')
        .attr("clip-path", "url(#clip)")
        .attr("cx", function(d) { return x(d.year); } )
        .attr("cy", function(d) { return y(d.population); } )
        .attr("r", 2.25)
        .on("mouseover", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div	.html("<b>Year: </b>" + formatYear(d.year) + "<br/><b>Population: </b>"  + d.population + "M")
                .style("left", (d3.event.pageX - margin.left - 57) + "px")
                .style("top", (d3.event.pageY - margin.top - margin.bottom - 100) + "px");
        })
        .on("mouseout", function(d) {
            div.transition()
                .duration(500)
                .style("opacity", 0);
        });

    function zoomed() {
        xAxisGroup.call(xAxis.scale(d3.event.transform.rescaleX(x)));
        var new_x = d3.event.transform.rescaleX(x);

        d3.selectAll(".dotScatter")
            .data(popData)
            .attr("cx", function(d) { return new_x(d.year); } );

        line.x(function(d) { return  new_x(d.year); });

        d3.select(".linePath")
            .attr("d", line(popData))
            .style('stroke', '#159db3');

    }

    svg.call(zoom);
}