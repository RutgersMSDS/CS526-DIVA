
function drawScatter(sequence,svgId,xAxisId,yAxisId,plotId)
{
    //console.log(sequence)
    let svg = d3.select("svg")
    let rectElement = d3.select("#chartRect");
    let gxAxis = d3.select("#"+xAxisId);
    let gyAxis = d3.select("#"+yAxisId);
    let gPlot = d3.select("#"+plotId); // selects svg element
    let margin = 200; // sets margin
    let marginTop = 200;
    let width = svg.attr("width") - margin; // width of x axis
    //console.log(svg.attr("width"))
    let height = svg.attr("height") - marginTop; // height of y axis
    
    let xMax = d3.max(sequence, function(d){  // calculates maximum value of x for finding domain of x
        return d.year;
    });

    let yMax = d3.max(sequence, function(d){ // calculates maximum value of y for finding domain of y
        return d.population;
    });
    
    let xMin = d3.min(sequence, function(d){  // calculates maximum value of x for finding domain of x
        return d.year;
    });
    

    let yMin = d3.min(sequence, function(d){ // calculates maximum value of y for finding domain of y
        return d.population;
    });

    /*let YAxisValuesDivider = 1;
    let yAxisUnit = '';
    if(yMin>999999999)
    {
        yAxisUnit = 'Billions';
        YAxisValuesDivider = 1000000000;
    }
    else if(yMin>999999)
    {
        yAxisUnit = 'Millions';
        YAxisValuesDivider = 1000000;
    }
    else if(yMin>999)
    {
        yAxisUnit = 'Thousands';
        YAxisValuesDivider = 1000;
    }
    */

    //let count = (xMax - xMin)/xDiff + 1;


    /*// This allows to find the closest X index of the mouse:
    var bisect = d3.bisector(function(d) { console.log(d)}).left;//return d.year; });

    // Create the circle that travels along the curve of chart
    var focus = gPlot
    .append('circle')
      .style("fill", "none")
      .attr("stroke", "black")
      .attr('r', 8.5)
      .style("opacity", 0)

    // Create a rect on top of the svg area: this rectangle recovers mouse position
    rectElement
    .style("pointer-events", "all")
    //.attr('width', width)
    //.attr('height', height)
    .on('mouseover', mouseover)
    .on('mousemove', mousemove)
    .on('mouseout', mouseout);

    // What happens when the mouse move -> show the annotations at the right positions.
    function mouseover() {
        focus.style("opacity", 1)
        //focusText.style("opacity",1)
    }

    function mousemove() {
        // recover coordinate we need
        var x0 = xScale.invert(d3.mouse(this)[0]);
        //console.log(parseInt(x0));
        
        var i = bisect(sequence, x0, 1);

        selectedData = sequence[i]
        console.log(selectedData);
        /*focus
        .attr("cx", xScale(selectedData.year))
        .attr("cy", yScale(selectedData.population))*/

        /*focusText
        .html("x:" + selectedData.x + "  -  " + "y:" + selectedData.y)
        .attr("x", x(selectedData.x)+15)
        .attr("y", y(selectedData.y))
        }*/
    /*function mouseout() {
        focus.style("opacity", 0)
        //focusText.style("opacity", 0)
    }*/
        

    if((xMax-xMin)>80)
    {
        xDiff = 5
    }
    else if((xMax-xMin)>60)
    {
        xDiff = 4
    }
    else if((xMax-xMin)>40)
    {
        xDiff = 3
    }
    else if((xMax-xMin)>20)
    {
        xDiff = 2
    }
    else{
        xDiff = 1
    }
    //let xDiff = parseInt((xMax - xMin)/10);

    xAxisValues = new Array(); // values of x to be shown on x axis
    yAxisValues = new Array(); // values of y to be shown on y axis

    nov = sequence.length;
    
    for(i=xMin;i<=xMax+xDiff;i=i+xDiff)
    {
        //console.log(i)
        xAxisValues.push(i);
    }
    for(j=0;j<=yMax+1000000000;j=j+1000000000)
    {
        yAxisValues.push(j);
    }
    //console.log(yMin)
    //console.log(yMax)
    //console.log(yAxisValues)

    let xDomain = [xMin,xMax+xDiff]; // domain of x to be used for x axis scale
    let yDomain = [0,yMax+1000000000]; // domain of y to be used for y axis scale

    let xRange = [0,width]; // range of x to be used for x axis scale
    let yRange = [height-30,100]; // range of y to be used for y axis scale

    let xScale = d3.scaleLinear()
        .domain(xDomain)
        .range(xRange)

    let yScale = d3.scaleLinear()
        .domain(yDomain)
        .range(yRange)
    //console.log(xRange)
    let xAxis = d3.axisBottom(xScale)
                    .tickValues(xAxisValues);

    let yAxis = d3.axisLeft(yScale).tickValues(yAxisValues);
    //let g = svg.append("g")  .attr('transform','translate('+margin/2+','+margin/2+')');
    //let gChart = d3.select("#chart").attr('transform','translate(100,0)').attr('stroke','black')
    //.attr('fill','none')
    //gChart.append("g").attr('transform','translate(0,300)').call(xAxis)
    gxAxis.call(xAxis)

    gyAxis.call(yAxis);
    

    valueLine = d3.line()
                    .x( (d) => xScale(d.year))
                    .y( (d) => yScale(d.population))

    /*d3.select("path.line").remove()
    gPlot.append("path")
        .attr('id','lineChart')
        .attr('stroke','orange')
        .datum(sequence)
        //.attr('class','bar')
        .attr('d',valueLine)
        .attr('class','line')*/

    d3.select("path.line").remove()

    gPlot.selectAll(".cir")
        .remove()

       gPlot.selectAll(".circle")
        .data(sequence)
        .enter()
        .append('circle')
        .attr('class','cir')
        .attr('cx', (d) => xScale(d.year))
        .attr('cy', (d) => yScale(d.population))
        .attr('r',2)
        .attr('fill','blue')
        .on("mouseover",function(d){
            //console.log(d)
            this.style.r = 10;
            this.style.fill="blue";
            d3.select("#hoveredYear").text("Year: "+d.year);
            d3.select("#hoveredPopulation").text("Population: "+d.population);
        })
        .on("mouseout",function(d) {
            this.style.r = 2;
            this.style.fill="white";
            d3.select("#hoveredYear").text("");
            d3.select("#hoveredPopulation").text("");
        })

    }