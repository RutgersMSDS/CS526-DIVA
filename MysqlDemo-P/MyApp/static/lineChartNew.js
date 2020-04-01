
function drawLine(sequence,svgId,xAxisId,yAxisId,plotId)
{
    //console.log(sequence)
    let svg = d3.select("svg")
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
    console.log(yMin);
    console.log(yMax);
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
    
    let yDiff;

    if(yMin<25000000)
    {
        yDiff = 25000000;
    }
    else if(yMin<50000000)
    {
        yDiff = 50000000;
    }
    else if(yMin<1000000000)
    {
        yDiff = 100000000;
    }
    else
    {
        yDiff = 1000000000;
    }
    for(j=0;j<=yMax+yDiff;j=j+yDiff)
    {
        yAxisValues.push(j);
    }
    //console.log(yMin)
    //console.log(yMax)
    //console.log(yAxisValues)

    let xDomain = [xMin,xMax+xDiff]; // domain of x to be used for x axis scale
    let yDomain = [0,yMax+yDiff]; // domain of y to be used for y axis scale

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

    d3.select("path.line").remove()
    gPlot.append("path")
        .attr('id','lineChart')
        .attr('stroke','orange')
        .datum(sequence)
        //.attr('class','bar')
        .attr('d',valueLine)
        .attr('class','line')

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
            this.style.fill="red";
            d3.select("#hoveredYear").text("Year: "+d.year);
            d3.select("#hoveredPopulation").text("Population: "+d.population);
        })
        .on("mouseout",function(d) {
            this.style.r = 2;
            this.style.fill="blue";
            d3.select("#hoveredYear").text("");
            d3.select("#hoveredPopulation").text("");
        })

    }