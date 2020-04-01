
function drawBar(sequence,xDiff,svgId)
{
    //let xDiff = 10; // no of values on x axis
    //let yDiff = 10; // no of values on y axis
    let svg = d3.select("#"+svgId); // selects svg element
    let margin = 50; // sets margin
    let width = svg.attr("width") - margin; // width of x axis
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
    console.log(yMax);
    console.log(yMin);
    count = (xMax - xMin)/xDiff + 1;
    console.log(count)
    yDiff = parseInt((yMax - yMin)/count);
    console.log(yDiff);
    //let xDiff = parseInt(xMax/10);
    //let yDiff = parseInt(yMax/10);

    let xAxisValues = []; // values of x to be shown on x axis
    let yAxisValues = []; // values of y to be shown on y axis
    
    nov = sequence.length;
    let j = yMin;
    for(i=0;i<nov;i=i+xDiff)
    {
        xAxisValues.push(parseInt(sequence[i].x));
        yAxisValues.push(parseInt(j));
        j = j + yDiff;
    }
    console.log(yAxisValues);
    /*for(i=1950;i<=2050;i=i+xDiff)
    {
        xAxisValues.push(parseInt(i));
    }
    for(i=yMin;i<=yMax+yDiff;i=i+yDiff)
    {
        yAxisValues.push(parseInt(i));
    }*/


    let xDomain = [xMin,xMax+xDiff]; // domain of x to be used for x axis scale
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
        .attr('transform','translate('+margin/2+','+margin/2+')');

    let xAxis = d3.axisBottom(xScale).tickValues(xAxisValues);
    let yAxis = d3.axisLeft(yScale).tickValues(yAxisValues);

    g.append("g")
        .attr('transform','translate('+0+','+height+')')
        .call(xAxis);

    g.append("g")
        .call(yAxis);

    g.selectAll(".bar")
        .data(sequence)
        .enter()
        .append('rect')
        .on("click", (d) => d3.select("#stat").text(d.y))
        .attr('class','bar')
        .attr('x', (d) => xScale(d.x))
        .attr('y', (d) => yScale(d.y))
        .attr('width', 5)
        .attr('height', (d) => (height-yScale(d.y)))
}

function drawBar2(sequence,xType,yType,svgId)
{
    let xDiff = 5; // no of values on x axis
    let yDiff = 5; // no of values on y axis
    let svg = d3.select("#"+svgId); // selects svg element
    let margin = 50; // sets margin
    let width = svg.attr("width") - margin; // width of x axis
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

    //let xDiff = parseInt(xMax/10);
    //let yDiff = parseInt(yMax/10);

    let xAxisValues = []; // values of x to be shown on x axis
    let yAxisValues = []; // values of y to be shown on y axis

    for(i=xMin;i<=xMax+xDiff;i=i+xDiff)
    {
        xAxisValues.push(parseInt(i));
    }
    for(i=yMin;i<=yMax+yDiff;i=i+yDiff)
    {
        yAxisValues.push(parseInt(i));
    }


    let xDomain = [xMin,xMax+xDiff]; // domain of x to be used for x axis scale
    let yDomain = [yMin,yMax+yDiff]; // domain of y to be used for y axis scale

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
        .attr('transform','translate('+margin/2+','+margin/2+')');

    let xAxis = d3.axisBottom(xScale).tickValues(xAxisValues);
    let yAxis = d3.axisLeft(yScale).tickValues(yAxisValues);

    g.append("g")
        .attr('transform','translate('+0+','+height+')')
        .call(xAxis);

    g.append("g")
        .call(yAxis);

    g.selectAll(".bar")
        .data(sequence)
        .enter()
        .append('rect')
        .on("click", (d) => d3.select("#stat").text(d.y))
        .attr('class','bar')
        .attr('x', (d) => xScale(d.x))
        .attr('y', (d) => yScale(d.y))
        .attr('width', 5)
        .attr('height', (d) => (height-yScale(d.y)))
}