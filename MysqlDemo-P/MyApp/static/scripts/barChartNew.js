
function drawBarOld()
{

    divElement = document.getElementById('pyramidDiv')
    width = divElement.clientWidth
    height = divElement.clientHeight
    console.log(width)
    console.log(height)
    divElement = d3.select('#pyramidDiv')
    svg = divElement.append('svg')
                    .attr('id','svgPyramid')
                    .attr('width',width)
                    .attr('height',height)
                    .attr('border','1')

    gPyramidPlot = svg.append('g')
                        .attr('id','pyramidPlot')
                        .attr('width',width-50)
                        .attr('height',height-50)

    gPyramidPlot.append('rect')
        .attr('width',width-50)
        .attr('height',height-50)
        .attr('fill','none') 
        .attr('stroke','black')
        .attr('stroke-width','1')  

    gmPyramidPlot = gPyramidPlot.append('g')
                                .attr('id','maleBarChart')

    gfPyramidPlot = gPyramidPlot.append('g')
                                .attr('id','femaleBarChart')

    var margin = {left:50, top:50, right:50, bottom:50};

    chartWidth = width-margin.left-margin.right
    chartHeight = height-margin.top-margin.bottom

    // Male Bar Chart

    maleChartWidth = chartWidth/2-100
    maleChartDim = {lx:margin.left , ly:margin.top , rx:maleChartWidth , ry:chartHeight}

        let gmxAxis = gmPyramidPlot.append('g')
                    .attr('id','gmxAxis')

        let gmyAxis = gmPyramidPlot.append('g')
                    .attr('id','gmyAxis')
        
        var maleData = [{"age": 0, "population": 11393195}, {"age": 1, "population": 11391401}, {"age": 2, "population": 11411128}, {"age": 3, "population": 11434673}, {"age": 4, "population": 11458221}, {"age": 5, "population": 11497405}, {"age": 6, "population": 11550961}, {"age": 7, "population": 11601542}, {"age": 8, "population": 11648524}, {"age": 9, "population": 11691089}, {"age": 10, "population": 11734158}, {"age": 11, "population": 11777430}, {"age": 12, "population": 11814875}, {"age": 13, "population": 11846052}, {"age": 14, "population": 11869500}, {"age": 15, "population": 11905080}, {"age": 16, "population": 11952340}, {"age": 17, "population": 11989613}, {"age": 18, "population": 12016843}, {"age": 19, "population": 12034150}, {"age": 20, "population": 12053393}, {"age": 21, "population": 12075317}, {"age": 22, "population": 12088820}, {"age": 23, "population": 12093817}, {"age": 24, "population": 12090897}, {"age": 25, "population": 12097019}, {"age": 26, "population": 12113590}, {"age": 27, "population": 12126250}, {"age": 28, "population": 12136077}, {"age": 29, "population": 12142138}, {"age": 30, "population": 12139501}, {"age": 31, "population": 12125561}, {"age": 32, "population": 12101806}, {"age": 33, "population": 12068852}, {"age": 34, "population": 12068019}, {"age": 35, "population": 12095341}, {"age": 36, "population": 12103523}, {"age": 37, "population": 12090726}, {"age": 38, "population": 12060324}, {"age": 39, "population": 12021417}, {"age": 40, "population": 11974515}, {"age": 41, "population": 11911274}, {"age": 42, "population": 11832576}, {"age": 43, "population": 11735251}, {"age": 44, "population": 11600582}, {"age": 45, "population": 11428321}, {"age": 46, "population": 11237547}, {"age": 47, "population": 11029124}, {"age": 48, "population": 10804293}, {"age": 49, "population": 10541991}, {"age": 50, "population": 10313599}, {"age": 51, "population": 10148651}, {"age": 52, "population": 9984939}, {"age": 53, "population": 9812046}, {"age": 54, "population": 9625321}, {"age": 55, "population": 9426602}, {"age": 56, "population": 9220310}, {"age": 57, "population": 9006340}, {"age": 58, "population": 8784855}, {"age": 59, "population": 8556340}, {"age": 60, "population": 8321039}, {"age": 61, "population": 8079125}, {"age": 62, "population": 7831005}, {"age": 63, "population": 7577131}, {"age": 64, "population": 7318008}, {"age": 65, "population": 7054212}, {"age": 66, "population": 6786203}, {"age": 67, "population": 6513923}, {"age": 68, "population": 6239078}, {"age": 69, "population": 5914475}, {"age": 70, "population": 5545949}, {"age": 71, "population": 5183065}, {"age": 72, "population": 4824858}, {"age": 73, "population": 4472457}, {"age": 74, "population": 4126956}, {"age": 75, "population": 3789459}, {"age": 76, "population": 3460834}, {"age": 77, "population": 3141772}, {"age": 78, "population": 2832965}, {"age": 79, "population": 2534845}, {"age": 80, "population": 2247372}, {"age": 81, "population": 1972775}, {"age": 82, "population": 1714203}, {"age": 83, "population": 1473037}, {"age": 84, "population": 1250556}, {"age": 85, "population": 1047849}, {"age": 86, "population": 865626}, {"age": 87, "population": 704229}, {"age": 88, "population": 563522}, {"age": 89, "population": 443512}, {"age": 90, "population": 342308}, {"age": 91, "population": 260051}, {"age": 92, "population": 193387}, {"age": 93, "population": 140700}, {"age": 94, "population": 100041}, {"age": 95, "population": 69430}, {"age": 96, "population": 46980}, {"age": 97, "population": 30959}, {"age": 98, "population": 19844}, {"age": 99, "population": 12360}, {"age": 100, "population": 16807}]

        var mxScale = d3.scaleLinear()
            //.range([margin.left, maleChartWidth])
            .range([maleChartDim.lx,maleChartDim.rx])
            .domain([0, d3.max(maleData, function (d) {
                return d.population;
            })]);
        var mxScaleInverted = d3.scaleLinear()
            .range([maleChartDim.rx,maleChartDim.lx])
            .domain([0, d3.max(maleData, function(d) {
                return d.population
            })])

        var myScale = d3.scaleLinear()
            .range([maleChartDim.ry,maleChartDim.ly])
            .domain([0, d3.max(maleData, function (d) {
                return d.age;
            })]);

        let mxAxis = d3.axisBottom(mxScaleInverted);
        let myAxis = d3.axisRight(myScale);

        var bars = gmPyramidPlot.selectAll(".bar")
            .data(maleData)
            .enter()
            .append("g")

        //append rects
        bars.append("rect")
            .attr("class", "bar")
            .attr('fill','blue')
            .attr("y", function (d) {
                return myScale(d.age);
            })
            .attr("height", 3)
            .attr("x", function(d) {
                return maleChartWidth-mxScale(d.population)+margin.left
            })
            .attr("width", function (d) {
                return mxScale(d.population);
            });
        
        gmxAxis.call(mxAxis).attr('transform','translate('+margin.left+','+chartHeight+')')
        gmyAxis.call(myAxis).attr('transform','translate('+(maleChartWidth+margin.left)+',0)')

        console.log(maleChartDim)

// Female Bar Chart
        
        femaleChartWidth = chartWidth/2-100
        femaleChartDim = {lx:maleChartDim.ry+150, ly:margin.top , rx:900, ry:chartHeight}
        console.log(femaleChartDim)
        let gfxAxis = gfPyramidPlot.append('g')
                    .attr('id','gfxAxis')

        let gfyAxis = gfPyramidPlot.append('g')
                    .attr('id','gfyAxis')
        
        var femaleData = [{"age": 0, "population": 11393195}, {"age": 1, "population": 11391401}, {"age": 2, "population": 11411128}, {"age": 3, "population": 11434673}, {"age": 4, "population": 11458221}, {"age": 5, "population": 11497405}, {"age": 6, "population": 11550961}, {"age": 7, "population": 11601542}, {"age": 8, "population": 11648524}, {"age": 9, "population": 11691089}, {"age": 10, "population": 11734158}, {"age": 11, "population": 11777430}, {"age": 12, "population": 11814875}, {"age": 13, "population": 11846052}, {"age": 14, "population": 11869500}, {"age": 15, "population": 11905080}, {"age": 16, "population": 11952340}, {"age": 17, "population": 11989613}, {"age": 18, "population": 12016843}, {"age": 19, "population": 12034150}, {"age": 20, "population": 12053393}, {"age": 21, "population": 12075317}, {"age": 22, "population": 12088820}, {"age": 23, "population": 12093817}, {"age": 24, "population": 12090897}, {"age": 25, "population": 12097019}, {"age": 26, "population": 12113590}, {"age": 27, "population": 12126250}, {"age": 28, "population": 12136077}, {"age": 29, "population": 12142138}, {"age": 30, "population": 12139501}, {"age": 31, "population": 12125561}, {"age": 32, "population": 12101806}, {"age": 33, "population": 12068852}, {"age": 34, "population": 12068019}, {"age": 35, "population": 12095341}, {"age": 36, "population": 12103523}, {"age": 37, "population": 12090726}, {"age": 38, "population": 12060324}, {"age": 39, "population": 12021417}, {"age": 40, "population": 11974515}, {"age": 41, "population": 11911274}, {"age": 42, "population": 11832576}, {"age": 43, "population": 11735251}, {"age": 44, "population": 11600582}, {"age": 45, "population": 11428321}, {"age": 46, "population": 11237547}, {"age": 47, "population": 11029124}, {"age": 48, "population": 10804293}, {"age": 49, "population": 10541991}, {"age": 50, "population": 10313599}, {"age": 51, "population": 10148651}, {"age": 52, "population": 9984939}, {"age": 53, "population": 9812046}, {"age": 54, "population": 9625321}, {"age": 55, "population": 9426602}, {"age": 56, "population": 9220310}, {"age": 57, "population": 9006340}, {"age": 58, "population": 8784855}, {"age": 59, "population": 8556340}, {"age": 60, "population": 8321039}, {"age": 61, "population": 8079125}, {"age": 62, "population": 7831005}, {"age": 63, "population": 7577131}, {"age": 64, "population": 7318008}, {"age": 65, "population": 7054212}, {"age": 66, "population": 6786203}, {"age": 67, "population": 6513923}, {"age": 68, "population": 6239078}, {"age": 69, "population": 5914475}, {"age": 70, "population": 5545949}, {"age": 71, "population": 5183065}, {"age": 72, "population": 4824858}, {"age": 73, "population": 4472457}, {"age": 74, "population": 4126956}, {"age": 75, "population": 3789459}, {"age": 76, "population": 3460834}, {"age": 77, "population": 3141772}, {"age": 78, "population": 2832965}, {"age": 79, "population": 2534845}, {"age": 80, "population": 2247372}, {"age": 81, "population": 1972775}, {"age": 82, "population": 1714203}, {"age": 83, "population": 1473037}, {"age": 84, "population": 1250556}, {"age": 85, "population": 1047849}, {"age": 86, "population": 865626}, {"age": 87, "population": 704229}, {"age": 88, "population": 563522}, {"age": 89, "population": 443512}, {"age": 90, "population": 342308}, {"age": 91, "population": 260051}, {"age": 92, "population": 193387}, {"age": 93, "population": 140700}, {"age": 94, "population": 100041}, {"age": 95, "population": 69430}, {"age": 96, "population": 46980}, {"age": 97, "population": 30959}, {"age": 98, "population": 19844}, {"age": 99, "population": 12360}, {"age": 100, "population": 16807}]

        var fxScale = d3.scaleLinear()
            .range([50,550])
            //.range([width, 0])
            .domain([0, d3.max(femaleData, function (d) {
                return d.population;
            })]);

        var fyScale = d3.scaleLinear()
            .range([femaleChartDim.ry,femaleChartDim.ly])
            .domain([0, d3.max(femaleData, function (d) {
                return d.age;
            })]);

        let fxAxis = d3.axisBottom(fxScale);
        let fyAxis = d3.axisRight(fyScale);

        var bars = gfPyramidPlot.selectAll(".bar")
            .data(femaleData)
            .enter()
            .append("g")

        //append rects
        bars.append("rect")
            .attr("class", "bar")
            .attr('fill','pink')
            .attr("y", function (d) {
                return fyScale(d.age);
            })
            .attr("height", 3)
            .attr("x", femaleChartDim.lx)
            .attr("width", function (d) {
                return fxScale(d.population);
            });
        
        //gfxAxis.call(fxAxis).attr('transform','translate('+margin.left+','+chartHeight+')')
        //gfyAxis.call(fyAxis).attr('transform','translate('+(femaleChartWidth+margin.left)+',0)')

}