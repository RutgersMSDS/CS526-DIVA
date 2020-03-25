function drawScatter(sequence,xType,yType,svgId,xAxisName,yAxisName)
{
    //let xDiff = 1; // no of values on x axis
    //let yDiff = 2; // no of values on y axis
    let svg = d3.select("#"+svgId); // selects svg element
    margin = 50; // sets margin
    let width = svg.attr("width") - 3*margin; // width of x axis
    let height = svg.attr("height") - 3*margin; // height of y axis

    xMax = d3.max(sequence, function(d){  // calculates maximum value of x for finding domain of x
        return d.x;
    });

    yMax = d3.max(sequence, function(d){ // calculates maximum value of y for finding domain of y
        return d.y;
    })

    let xDiff = parseInt(xMax/10);
    let yDiff = parseInt(yMax/10);

    xAxisValues = new Array(); // values of x to be shown on x axis
    yAxisValues = new Array(); // values of y to be shown on y axis
    for(let i=0;i<=xMax+xDiff;i=i+xDiff)
    {
        xAxisValues.push(parseInt(i));
    }
    for(let i=0;i<=yMax+yDiff;i=i+yDiff)
    {
        yAxisValues.push(parseInt(i));
    }


    let xDomain = [0,xMax+xDiff]; // domain of x to be used for x axis scale
    let yDomain = [0,yMax+yDiff]; // domain of y to be used for y axis scale

    let xRange = [0,width]; // range of x to be used for x axis scale
    let yRange = [height,0]; // range of y to be used for y axis scale

    let xScale = d3.scaleLinear()
        .domain(xDomain)
        .range(xRange)
    // .domain([0,xMax+1])
    // .range([0,width])
    //.padding(0.4)

    let yScale = d3.scaleLinear()
        .domain(yDomain)
        .range(yRange)

    // .domain([0,yMax+1])
    // .range([height,0])

    let g = svg.append("g")
        .attr('transform','translate('+margin+','+margin+')');

    let xAxis = d3.axisBottom(xScale).tickValues(xAxisValues);
    let yAxis = d3.axisLeft(yScale).tickValues(yAxisValues);

    g.append("g")
        .attr('transform','translate('+margin+','+height+')')
        .call(xAxis);

    g.append("g")
        .attr('transform','translate('+margin+','+0+')')
        .call(yAxis);

    g.append("text")
        .attr("transform","translate("+(width/2)+","+(margin+height)+")")
        .text(xAxisName)

    g.append("text")
        .attr("transform","translate("+(0)+","+(height/2)+")")
        .text(yAxisName)

    g.selectAll(".circle")
        .data(sequence)
        .enter()
        .append('circle')
        .attr('class','bar')
        .attr('cx', (d) => xScale(d.x)+margin)
        .attr('cy', (d) => yScale(d.y))
        .attr('r',2)
}