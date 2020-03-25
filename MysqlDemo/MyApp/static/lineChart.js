
function drawLine(sequence,xDiff,yDiff,svgId)
{
    let svg = d3.select("#"+svgId); // selects svg element
    let margin = 100; // sets margin
    let width = svg.attr("width") - margin; // width of x axis
    console.log(svg.attr("width"))
    let height = svg.attr("height") - margin; // height of y axis
    
    let xMax = d3.max(sequence, function(d){  // calculates maximum value of x for finding domain of x
        return d.x;
    });

    let yMax = d3.max(sequence, function(d){ // calculates maximum value of y for finding domain of y
        return d.y;
    });

    let xMin = d3.min(sequence, function(d){  // calculates maximum value of x for finding domain of x
        return d.x;
    });

    let yMin = d3.min(sequence, function(d){ // calculates maximum value of y for finding domain of y
        return d.y;
    });

    let YAxisValuesDivider = 1;
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

    let count = (xMax - xMin)/xDiff + 1;

    xAxisValues = new Array(); // values of x to be shown on x axis
    yAxisValues = new Array(); // values of y to be shown on y axis

    nov = sequence.length;
    
    for(i=xMin;i<xMax+xDiff;i=i+xDiff)
    {
        xAxisValues.push(i);
    }
    for(j=0;j<=(yMax/YAxisValuesDivider);j++)
    {
        yAxisValues.push(j);
    }
    console.log(yAxisValues)

    let xDomain = [xMin,xMax+xDiff]; // domain of x to be used for x axis scale
    let yDomain = [0,(yMax+yDiff)/YAxisValuesDivider]; // domain of y to be used for y axis scale

    let xRange = [0,width]; // range of x to be used for x axis scale
    let yRange = [height,0]; // range of y to be used for y axis scale

    let xScale = d3.scaleLinear()
        .domain(xDomain)
        .range(xRange)

    let yScale = d3.scaleLinear()
        .domain(yDomain)
        .range(yRange)

    let g = svg.append("g")
        .attr('transform','translate('+margin/2+','+margin/2+')');

    let xAxis = d3.axisBottom(xScale).tickValues(xAxisValues);
    let yAxis = d3.axisLeft(yScale).tickValues(yAxisValues);

    g.append("g")
        .attr('transform','translate('+0+','+height+')')
        .attr('stroke','white')
        .call(xAxis);

    g.append("g")
        .attr('stroke','white')
        .call(yAxis);

    valueLine = d3.line()
                    .x( (d) => xScale(d.x))
                    .y( (d) => yScale(d.y/YAxisValuesDivider))

    g.append("path")
        .datum(sequence)
        //.attr('class','bar')
        .attr('d',valueLine)
        .attr('class','line')

        g.selectAll(".circle")
        .data(sequence)
        .enter()
        .append('circle')
        .attr('class','cir')
        .attr('cx', (d) => xScale(d.x)+margin)
        .attr('cy', (d) => yScale(d.y))
        .attr('r',15)
        .attr('fill','white')

    }