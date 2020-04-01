
function drawLine(wpSliced,svgId,xAxisId,yAxisId,plotId)
{
    //console.log(sequence)
    //let colorList = ['rgb(245,135,66)','rgb(66,170,245)','rgb(66,245,158)','rgb(197,66,245)','rgb(245,66,66)','','','','','']
    let colorList = ['#e63080','#1232be','#492056','#fe8420','#e2cd54','rgb(102,255,0)','#f12929','red','grey','yellow']
    //let colorList = ['olive','','','','','']
    let colorDict = {}
    let svg = d3.select("svg")
    let gxAxis = d3.select("#"+xAxisId);
    let gyAxis = d3.select("#"+yAxisId);
    let gPlot = d3.select("#"+plotId); // selects svg element
    let margin = 200; // sets margin
    let marginTop = 200;
    let width = svg.attr("width") - margin; // width of x axis
    //console.log(svg.attr("width"))
    let height = svg.attr("height") - marginTop; // height of y axis

    var xMax=0,xMin=9999999999,yMax=0,yMin=999999999999999999;
    console.log(wpSliced)
    var i = 0
    // make color dictionary
    for(var key in wpSliced)
    {
        colorDict[key] = colorList[i];
        i = i+1;
    }
    console.log(colorDict)
    for(var key in wpSliced)
    {
        data = wpSliced[key]
        console.log(data)
        // find maximum year
        tempxMax = d3.max(data, function(d){  // calculates maximum value of x for finding domain of x
            return d.year});
        //console.log(tempxMax);
        if (tempxMax>xMax) {xMax = tempxMax}

        // find minimum year
        tempxMin = d3.min(data, function(d){  // calculates maximum value of x for finding domain of x
            return d.year});
        //console.log(tempxMin);
        if (tempxMin<xMin) {xMin = tempxMin}

        // find maximum population
        tempyMax = d3.max(data, function(d){  // calculates maximum value of x for finding domain of x
            return d.population});
        //console.log(tempyMax);
        if (tempyMax>yMax) {yMax = tempyMax}

        // find minimum population
        tempyMin = d3.min(data, function(d){  // calculates maximum value of x for finding domain of x
            return d.population});
        //console.log(tempyMin);
        if (tempyMin<yMin) {yMin = tempyMin}
    }

    //console.log("xMin is "+xMin);
    //console.log("xMax is "+xMax);
    //console.log("yMin is "+yMin);
    //console.log("yMax is "+yMax);
    
    /*var xMax = d3.max(wpSliced, function(d){  // calculates maximum value of x for finding domain of x
        return d.year;
    });

    yMax = d3.max(wpSliced, function(d){ // calculates maximum value of y for finding domain of y
        return d.population;
    });
    
    xMin = d3.min(wpSliced, function(d){  // calculates maximum value of x for finding domain of x
        return d.year;
    });
    

    yMin = d3.min(wpSliced, function(d){ // calculates maximum value of y for finding domain of y
        return d.population;
    });
    console.log(yMin);
    console.log(yMax);*/
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

    nov = wpSliced.length;
    
    for(i=xMin;i<=xMax+xDiff;i=i+xDiff)
    {
        //console.log(i)
        xAxisValues.push(i);
    }
    
    console.log(yMax - yMin)
    /*if(yMin<25000000)
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
    }*/

    if(yMax>10000000000)
    {
        yDiff = 10000000000;
    }
    else if(yMax>5000000000)
    {
        yDiff = 5000000000;
    }
    else if(yMax>1000000000)
    {
        yDiff = 1000000000;
    }
    else if(yMax>500000000)
    {
        yDiff = 500000000;
    }
    else if(yMax>100000000)
    {
        yDiff = 100000000;
    }
    else if(yMax>50000000)
    {
        yDiff = 50000000;
    }
    else if(yMax>10000000)
    {
        yDiff = 10000000;
    }
    else if(yMax>5000000)
    {
        yDiff = 5000000;
    }
    else if(yMax>1000000)
    {
        yDiff = 1000000;
    }
    else if(yMax>500000)
    {
        yDiff = 500000;
    }
    else
    {
        yDiff = 100000;
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

    //d3.select("path.line").remove()
    d3.selectAll(".PathLine").remove()
    gPlot.selectAll(".PathScatter").remove()
    plotLine(xScale,yScale,valueLine);

    function plotLine(nxScale,nyScale,nvalueLine)
    {
        d3.selectAll(".PathLine").remove();
        d3.selectAll(".PathScatter").remove();
        for(var key in wpSliced)
        {
            gPlot.attr('clip-path','url(#clip)');
            data = wpSliced[key]
            gPlot.append("path")
            //.attr('id','lineChart')
            .attr('stroke',colorDict[key])
            .attr('stroke-width',3)
            .datum(data)
            .attr('d',nvalueLine)
            .attr('class','PathLine')

            gPlot.selectAll(".circle")
            .data(data)
            .enter()
            .append('circle')
            .attr('class','PathScatter')
            .attr('cx', (d) => nxScale(d.year))
            .attr('cy', (d) => nyScale(d.population))
            .attr('r',2)
            .attr('fill','black')
            .on("mouseover",function(d){
                //console.log(d)
                this.style.r = 10;
                this.style.fill="black";
                d3.select("#hoveredYear").text("Year: "+d.year);
                d3.select("#hoveredPopulation").text("Population: "+d.population);
            })
            .on("mouseout",function(d) {
                this.style.r = 2;
                this.style.fill="black";
                d3.select("#hoveredYear").text("");
                d3.select("#hoveredPopulation").text("");
            })

        }

    /*gPlot.append("path")
        .attr('id','lineChart')
        .attr('stroke','orange')
        .datum(wpSliced)
        //.attr('class','bar')
        .attr('d',valueLine)
        .attr('class','line')*/

    /*gPlot.selectAll(".cir")
        .remove()

       gPlot.selectAll(".circle")
        .data(wpSliced)
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
        })*/
    }

    var clip = svg.append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("x", 0)
      .attr("y", 110)
      .attr("width",890)
      .attr("height",370);

        var zoom = d3.zoom()
                        .scaleExtent([0.5,15])
                        .on("zoom",showZoomedChart);

        //d3.select("#zoomRect").style("pointer-events", "all")
            svg.call(zoom);

        // A function that updates the chart when the user zoom and thus new boundaries are available
        function showZoomedChart() {
            console.log("updateChart called")
            // recover the new scale
            var newxScale = d3.event.transform.rescaleX(xScale);
            var newyScale = d3.event.transform.rescaleY(yScale);

            // update axes with these new boundaries
            gxAxis.call(d3.axisBottom(newxScale));
            gyAxis.call(d3.axisLeft(newyScale));
            zoomedValueLine = d3.line()
            .x( (d) => newxScale(d.year))
            .y( (d) => newyScale(d.population))
            //gyAxis.call(d3.axisLeft(newY))
            plotLine(newxScale,newyScale,zoomedValueLine);

        }

    }