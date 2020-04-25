
function drawLine(wpSliced,svgId,xAxisId,yAxisId,plotId)
{
    let formatYear = d3.timeFormat("%Y");
    let gPlot = d3.select("#" + plotId),
        gxAxis = d3.select("#" + xAxisId),
        gyAxis = d3.select("#" + yAxisId),

        canvas = d3.select("#container"),
        svg = d3.select("#line_bar_scatter"),

        chartRect = d3.select("#chartRect"),

        yAxisText = d3.select("#yAxisText"),
        xAxisText = d3.select("#xAxisText"),

        endText = d3.select("#rangeEnd"),
        endSlider = d3.select("#End_Slider"),
        startText = d3.select("#rangeStart"),
        startSlider = d3.select("#Start_Slider"),

        lineChartDiv = document.getElementById("lineChartDiv");

    var outerWidth  = lineChartDiv.clientWidth,
        outerHeight = lineChartDiv.clientHeight;
    var margin = {top: 50, right: 40, bottom: 100, left: 90};
    var width = outerWidth - margin.left - margin.right,
        height = outerHeight - margin.top - margin.bottom;

    var xMax=0,xMin=9999999999,yMax=0,yMin=999999999999999999;
    var xAxisValues = new Array(),
        yAxisValues = new Array();

    svg.style("width",  outerWidth)
        .style("height", outerHeight);

    chartRect.style("width",  outerWidth)
        .style("height", outerHeight);

    canvas.attr("width", width)
        .attr("height", height)
        .attr("transform", "translate(" +  margin.left + "," + margin.top + ")");

    let colorDict = {};
    let colorList = ['#e63080','#1232be','#955E42','#fe8420',
        '#e2cd54', '#1E012E','#748E54','#9C914F',
        '#555555','#28502E', "#553739", "#232020",
        '#29080B', '#15353D', "#242430", "#212924",];
    populateColor();

    populateXMaxXMin();
    var xDiff = getXDiff(xMax, xMin);
    var yDiff = getYDiff(yMax);


    for(var i = xMin; i <= xMax + xDiff; i = i + xDiff) { xAxisValues.push(i);}
    for(var j = 0; j <= yMax + yDiff; j = j + yDiff) { yAxisValues.push(j);}


    let xDomain = [xMin, xMax + xDiff]; // domain of x to be used for x axis scale
    let yDomain = [0, yMax + yDiff]; // domain of y to be used for y axis scale

    let xRange = [0, width]; // range of x to be used for x axis scale
    let yRange = [height, 0]; // range of y to be used for y axis scale

    let xScale = d3.scaleLinear().domain(xDomain).range(xRange);
    let yScale = d3.scaleLinear().domain(yDomain).range(yRange);

    let xAxis = d3.axisBottom(xScale).tickValues(xAxisValues);
    let yAxis = d3.axisLeft(yScale).tickValues(yAxisValues);

    valueLine = d3.line()
        .x( (d) => xScale(d.year))
        .y( (d) => yScale(d.population));

    var clip = svg.append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width",width)
        .attr("height",height);

    var zoom = d3.zoom()
        .scaleExtent([0.5,10])
        .on("zoom", showZoomedChart);

    resetCanvas();
    assignAxes();
    plotLine(xScale, yScale, valueLine);
    svg.call(zoom);
    addLegend();

    function resetCanvas() {
        d3.selectAll(".PathLine").remove();
        d3.selectAll(".PathScatter").remove();
    }

    function getXDiff() {
        var xDiff = xMax - xMin /20;

        if (xDiff > 5)
            xDiff = 5;

        return xDiff;
    }

    function getYDiff() {
        var yDiff;

        if(yMax>10000000000) {
            yDiff = 10000000000;
        } else if(yMax>5000000000) {
            yDiff = 5000000000;
        } else if(yMax>1000000000) {
            yDiff = 1000000000;
        } else if(yMax>500000000) {
            yDiff = 500000000;
        } else if(yMax>100000000) {
            yDiff = 100000000;
        } else if(yMax>50000000) {
            yDiff = 50000000;
        } else if(yMax>10000000) {
            yDiff = 10000000;
        } else if(yMax>5000000) {
            yDiff = 5000000;
        } else if(yMax>1000000) {
            yDiff = 1000000;
        } else if(yMax>500000) {
            yDiff = 500000;
        } else {
            yDiff = 100000;
        }

        return yDiff;
    }

    function populateColor() {
        var i = 0;
        for(var key in wpSliced) {colorDict[key] = colorList[i++];}
    }

    function populateXMaxXMin() {
        for(var key in wpSliced)
        {
            data = wpSliced[key];
            var tempxMax, tempyMax;

            // find maximum year
            tempxMax = d3.max(data, function(d){return d.year});
            if (tempxMax > xMax) {xMax = tempxMax}

            // find minimum year
            tempxMin = d3.min(data, function(d){return d.year});
            if (tempxMin < xMin) {xMin = tempxMin}

            // find maximum population
            tempyMax = d3.max(data, function(d){return d.population});
            if (tempyMax > yMax) {yMax = tempyMax}

            // find minimum population
            tempyMin = d3.min(data, function(d){ return d.population});
            if (tempyMin < yMin) {yMin = tempyMin}
        }
    }

    function assignAxes() {
        gxAxis.attr("class", "x-axis").attr("transform", "translate(0," + height + ")").call(xAxis);
        gyAxis.attr("class", "y-axis").call(yAxis);

        xAxisText.attr("transform", "translate(" + (width - margin.right) + ", " + (height + 40) + ")")
            .style("font", "16px Georgia")
            .style("font-color", "#1b4686");
        yAxisText.attr("transform", "translate(" + (-margin.left + 10) + ", " + (-10)+ ")")
            .style("font", "16px Georgia")
            .style("font-color", "#1b4686");

        endSlider.attr("transform", "translate(760, " + (height + margin.bottom / 3) + ")");
        startSlider.attr("transform", "translate(90, " + (height + margin.bottom / 3) + ")");

        endText.attr("transform", "translate(670, " + (height + margin.bottom / 3 + 2) + ")")
            .style("font", "14px Georgia")
            .style("font-color", "#1b4686");
        startText.attr("transform", "translate(10, " + (height + margin.bottom / 3 + 2) + ")")
            .style("font", "14px Georgia")
            .style("font-color", "#1b4686");
    }

    function addClip(key) {
        gPlot.attr('clip-path','url(#clip)');
        data = wpSliced[key];
    }

    function addLine(key, nvalueLine) {
        gPlot.append("path")
            .attr('class','PathLine')
            .attr('stroke',colorDict[key])
            .datum(data)
            .attr('d',nvalueLine)
            .style('fill', 'none')
            .style('stroke', '#fff')
            .transition()
            .delay(200)
            .duration(500)
            .style('stroke', colorDict[key])
            .style('stroke-width',"2");
    }

    function addScatter(key, nxScale, nyScale) {
        // Define the div for the tooltip
        var div = d3.select("#lineChartDiv").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        gPlot.selectAll(".circle")
            .data(data).enter()
            .append('circle')
            .attr('class','PathScatter')
            .attr('cx', (d) => nxScale(d.year))
            .attr('cy', (d) => nyScale(d.population))
            .attr('r',3.5)
            .attr('fill', colorDict[key])
            .on("mouseover", function(d) {
                this.style.r = 7;
                this.style.fill="black";
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html("<b>Year: </b>" + formatYear(d.year) + "<br/><b>Population: </b><br/><b>Population: </b>" + (d.population/1000000).toFixed(2) + "M")
                    .style("left", (d3.event.pageX - margin.left - 67) + "px")
                    .style("top", (d3.event.pageY - margin.top - margin.bottom - 70) + "px");
            })
            .on("mouseout", function(d) {
                this.style.r = 3.5;
                this.style.fill= colorDict[key];
                div.transition()
                    .duration(200)
                    .style("opacity", 0);
            });
    }

    function plotLine(nxScale, nyScale, nvalueLine) {
        resetCanvas();

        for(var key in wpSliced) {
            addClip(key);

            addLine(key, nvalueLine);
            addScatter(key, nxScale, nyScale);
        }
    }

    // A function that updates the chart when the user zoom and thus new boundaries are available
    function showZoomedChart() {

        var newxScale = d3.event.transform.rescaleX(xScale);
        var newyScale = d3.event.transform.rescaleY(yScale);

        // update axes with these new boundaries
        gxAxis.call(d3.axisBottom(newxScale));
        gyAxis.call(d3.axisLeft(newyScale));

        zoomedValueLine = d3.line()
            .x( (d) => newxScale(d.year))
            .y( (d) => newyScale(d.population));

        plotLine(newxScale,newyScale,zoomedValueLine);

    }

    function addLegend() {
        var legend = svg.selectAll('#container')
            .data(wpSliced)
            .enter()
            .append('g')
            .attr('class', 'legend');

        legend.append('rect')
            .attr('x', width - 20)
            .attr('y', function(d, i) {
                return i * 20;
            })
            .attr('width', 10)
            .attr('height', 10)
            .style('fill', function(key) {
                return colorDict[key];
            });

        legend.append('text')
            .attr('x', width - 8)
            .attr('y', function(d, i) {
                return (i * 20) + 9;
            })
            .text(function(key) {
                return key;
            });
    }

    function addLineToolTip() {
        mouseG.append("path") // this is the black vertical line to follow mouse
            .attr("class", "mouse-line")
            .style("stroke", "black")
            .style("stroke-width", "1px")
            .style("opacity", "0");

        var lines = document.getElementsByClassName('line');

        var mousePerLine = mouseG.selectAll('.mouse-per-line')
            .data(cities)
            .enter()
            .append("g")
            .attr("class", "mouse-per-line");

        mousePerLine.append("circle")
            .attr("r", 7)
            .style("stroke", function(d) {
                return color(d.name);
            })
            .style("fill", "none")
            .style("stroke-width", "1px")
            .style("opacity", "0");

        mousePerLine.append("text")
            .attr("transform", "translate(10,3)");

        mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
            .attr('width', width) // can't catch mouse events on a g element
            .attr('height', height)
            .attr('fill', 'none')
            .attr('pointer-events', 'all')
            .on('mouseout', function() { // on mouse out hide line, circles and text
                d3.select(".mouse-line")
                    .style("opacity", "0");
                d3.selectAll(".mouse-per-line circle")
                    .style("opacity", "0");
                d3.selectAll(".mouse-per-line text")
                    .style("opacity", "0");
            })
            .on('mouseover', function() { // on mouse in show line, circles and text
                d3.select(".mouse-line")
                    .style("opacity", "1");
                d3.selectAll(".mouse-per-line circle")
                    .style("opacity", "1");
                d3.selectAll(".mouse-per-line text")
                    .style("opacity", "1");
            })
            .on('mousemove', function() { // mouse moving over canvas
                var mouse = d3.mouse(this);
                d3.select(".mouse-line")
                    .attr("d", function() {
                        var d = "M" + mouse[0] + "," + height;
                        d += " " + mouse[0] + "," + 0;
                        return d;
                    });

                d3.selectAll(".mouse-per-line")
                    .attr("transform", function(d, i) {
                        console.log(width/mouse[0])
                        var xDate = x.invert(mouse[0]),
                            bisect = d3.bisector(function(d) { return d.date; }).right;
                        idx = bisect(d.values, xDate);

                        var beginning = 0,
                            end = lines[i].getTotalLength(),
                            target = null;

                        while (true){
                            target = Math.floor((beginning + end) / 2);
                            pos = lines[i].getPointAtLength(target);
                            if ((target === end || target === beginning) && pos.x !== mouse[0]) {
                                break;
                            }
                            if (pos.x > mouse[0])      end = target;
                            else if (pos.x < mouse[0]) beginning = target;
                            else break; //position found
                        }

                        d3.select(this).select('text')
                            .text(y.invert(pos.y).toFixed(2));

                        return "translate(" + mouse[0] + "," + pos.y +")";
                    });
            });
    }
}