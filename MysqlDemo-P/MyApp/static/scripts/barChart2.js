
function drawBar()
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
                        .attr('transform','translate(50,50)')

    gPyramidPlotWidth = width - 100
    gPyramidPlotHeight = height - 100
    gPyramidPlot.append('rect')
        .attr('width',gPyramidPlotWidth)
        .attr('height',gPyramidPlotHeight)
        .attr('fill','white') 
        .attr('stroke','black')
        .attr('stroke-width','1')  
    
    gmPyramidPlotWidth = gfPyramidPlotWidth = (gPyramidPlotWidth-200)/2
    gmPyramidPlotHeight = gfPyramidPlotHeight = (gPyramidPlotHeight-100)
    gmPyramidPlot = gPyramidPlot.append('g')
                                .attr('id','maleBarChart')
                                .attr('width',gmPyramidPlotWidth)
                                .attr('height',gmPyramidPlotHeight)
                                .attr('transform','translate(50,50)')

    gmPyramidPlot.append('rect')
                    .attr('width',550)
                    .attr('height',400)
                    .attr('fill','white')

    gfPyramidPlot = gPyramidPlot.append('g')
                                .attr('id','femaleBarChart')
                                .attr('width',gfPyramidPlotWidth)
                                .attr('height',gfPyramidPlotHeight)
                                .attr('transform','translate(700,50)')

    gfPyramidPlot.append('rect')
                    .attr('width',550)
                    .attr('height',400)
                    .attr('fill','white')

    // Male Bar Chart

        let gmxAxis = gmPyramidPlot.append('g')
                    .attr('id','gmxAxis')

        let gmyAxis = gmPyramidPlot.append('g')
                    .attr('id','gmyAxis')
        
        var maleData = [{"age": 0, "population": 11393195}, {"age": 1, "population": 11391401}, {"age": 2, "population": 11411128}, {"age": 3, "population": 11434673}, {"age": 4, "population": 11458221}, {"age": 5, "population": 11497405}, {"age": 6, "population": 11550961}, {"age": 7, "population": 11601542}, {"age": 8, "population": 11648524}, {"age": 9, "population": 11691089}, {"age": 10, "population": 11734158}, {"age": 11, "population": 11777430}, {"age": 12, "population": 11814875}, {"age": 13, "population": 11846052}, {"age": 14, "population": 11869500}, {"age": 15, "population": 11905080}, {"age": 16, "population": 11952340}, {"age": 17, "population": 11989613}, {"age": 18, "population": 12016843}, {"age": 19, "population": 12034150}, {"age": 20, "population": 12053393}, {"age": 21, "population": 12075317}, {"age": 22, "population": 12088820}, {"age": 23, "population": 12093817}, {"age": 24, "population": 12090897}, {"age": 25, "population": 12097019}, {"age": 26, "population": 12113590}, {"age": 27, "population": 12126250}, {"age": 28, "population": 12136077}, {"age": 29, "population": 12142138}, {"age": 30, "population": 12139501}, {"age": 31, "population": 12125561}, {"age": 32, "population": 12101806}, {"age": 33, "population": 12068852}, {"age": 34, "population": 12068019}, {"age": 35, "population": 12095341}, {"age": 36, "population": 12103523}, {"age": 37, "population": 12090726}, {"age": 38, "population": 12060324}, {"age": 39, "population": 12021417}, {"age": 40, "population": 11974515}, {"age": 41, "population": 11911274}, {"age": 42, "population": 11832576}, {"age": 43, "population": 11735251}, {"age": 44, "population": 11600582}, {"age": 45, "population": 11428321}, {"age": 46, "population": 11237547}, {"age": 47, "population": 11029124}, {"age": 48, "population": 10804293}, {"age": 49, "population": 10541991}, {"age": 50, "population": 10313599}, {"age": 51, "population": 10148651}, {"age": 52, "population": 9984939}, {"age": 53, "population": 9812046}, {"age": 54, "population": 9625321}, {"age": 55, "population": 9426602}, {"age": 56, "population": 9220310}, {"age": 57, "population": 9006340}, {"age": 58, "population": 8784855}, {"age": 59, "population": 8556340}, {"age": 60, "population": 8321039}, {"age": 61, "population": 8079125}, {"age": 62, "population": 7831005}, {"age": 63, "population": 7577131}, {"age": 64, "population": 7318008}, {"age": 65, "population": 7054212}, {"age": 66, "population": 6786203}, {"age": 67, "population": 6513923}, {"age": 68, "population": 6239078}, {"age": 69, "population": 5914475}, {"age": 70, "population": 5545949}, {"age": 71, "population": 5183065}, {"age": 72, "population": 4824858}, {"age": 73, "population": 4472457}, {"age": 74, "population": 4126956}, {"age": 75, "population": 3789459}, {"age": 76, "population": 3460834}, {"age": 77, "population": 3141772}, {"age": 78, "population": 2832965}, {"age": 79, "population": 2534845}, {"age": 80, "population": 2247372}, {"age": 81, "population": 1972775}, {"age": 82, "population": 1714203}, {"age": 83, "population": 1473037}, {"age": 84, "population": 1250556}, {"age": 85, "population": 1047849}, {"age": 86, "population": 865626}, {"age": 87, "population": 704229}, {"age": 88, "population": 563522}, {"age": 89, "population": 443512}, {"age": 90, "population": 342308}, {"age": 91, "population": 260051}, {"age": 92, "population": 193387}, {"age": 93, "population": 140700}, {"age": 94, "population": 100041}, {"age": 95, "population": 69430}, {"age": 96, "population": 46980}, {"age": 97, "population": 30959}, {"age": 98, "population": 19844}, {"age": 99, "population": 12360}, {"age": 100, "population": 16807}]

        var mxScale = d3.scaleLinear()
            //.range([margin.left, maleChartWidth])
            .range([0,gmPyramidPlotWidth])
            .domain([0, d3.max(maleData, function (d) {
                return d.population;
            })]);
        var mxScaleInverted = d3.scaleLinear()
            .range([gmPyramidPlotWidth,0])
            .domain([0, d3.max(maleData, function(d) {
                return d.population
            })])

        var myScale = d3.scaleLinear()
            .range([gmPyramidPlotHeight,0])
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
                return gmPyramidPlotWidth-mxScale(d.population)
            })
            .attr("width", function (d) {
                return mxScale(d.population);
            });
        
        gmxAxis.call(mxAxis).attr('transform','translate('+0+','+gmPyramidPlotHeight+')')
        gmyAxis.call(myAxis).attr('transform','translate('+(gmPyramidPlotWidth)+',0)')

// Female Bar Chart
        
        
        let gfxAxis = gfPyramidPlot.append('g')
                    .attr('id','gfxAxis')

        let gfyAxis = gfPyramidPlot.append('g')
                    .attr('id','gfyAxis')
        
        var femaleData = [{"age": 0, "population": 11104381}, {"age": 1, "population": 11000105}, {"age": 2, "population": 10948230}, {"age": 3, "population": 10913165}, {"age": 4, "population": 10878591}, {"age": 5, "population": 10867842}, {"age": 6, "population": 10882102}, {"age": 7, "population": 10895631}, {"age": 8, "population": 10907970}, {"age": 9, "population": 10917881}, {"age": 10, "population": 10922282}, {"age": 11, "population": 10918602}, {"age": 12, "population": 10906537}, {"age": 13, "population": 10886329}, {"age": 14, "population": 10894924}, {"age": 15, "population": 10931121}, {"age": 16, "population": 10952566}, {"age": 17, "population": 10955671}, {"age": 18, "population": 10942839}, {"age": 19, "population": 10922740}, {"age": 20, "population": 10898971}, {"age": 21, "population": 10864522}, {"age": 22, "population": 10822487}, {"age": 23, "population": 10767379}, {"age": 24, "population": 10681484}, {"age": 25, "population": 10564810}, {"age": 26, "population": 10434375}, {"age": 27, "population": 10290323}, {"age": 28, "population": 10131337}, {"age": 29, "population": 10008922}, {"age": 30, "population": 9933289}, {"age": 31, "population": 9878066}, {"age": 32, "population": 9801583}, {"age": 33, "population": 9711547}, {"age": 34, "population": 9614728}, {"age": 35, "population": 9514757}, {"age": 36, "population": 9409648}, {"age": 37, "population": 9300073}, {"age": 38, "population": 9186745}, {"age": 39, "population": 9070343}, {"age": 40, "population": 8951441}, {"age": 41, "population": 8830744}, {"age": 42, "population": 8708782}, {"age": 43, "population": 8585974}, {"age": 44, "population": 8462992}, {"age": 45, "population": 8340183}, {"age": 46, "population": 8217098}, {"age": 47, "population": 8093032}, {"age": 48, "population": 7970325}, {"age": 49, "population": 7775934}, {"age": 50, "population": 7513236}, {"age": 51, "population": 7257595}, {"age": 52, "population": 7006606}, {"age": 53, "population": 6760137}, {"age": 54, "population": 6517694}, {"age": 55, "population": 6278664}, {"age": 56, "population": 6042298}, {"age": 57, "population": 5808140}, {"age": 58, "population": 5576342}, {"age": 59, "population": 5347206}, {"age": 60, "population": 5120994}, {"age": 61, "population": 4897535}, {"age": 62, "population": 4676594}, {"age": 63, "population": 4457934}, {"age": 64, "population": 4241331}, {"age": 65, "population": 4026838}, {"age": 66, "population": 3814607}, {"age": 67, "population": 3604735}, {"age": 68, "population": 3396838}, {"age": 69, "population": 3194702}, {"age": 70, "population": 2993109}, {"age": 71, "population": 2806956}, {"age": 72, "population": 2620898}, {"age": 73, "population": 2436689}, {"age": 74, "population": 2254555}, {"age": 75, "population": 2074819}, {"age": 76, "population": 1898074}, {"age": 77, "population": 1724995}, {"age": 78, "population": 1556254}, {"age": 79, "population": 1392528}, {"age": 80, "population": 1233635}, {"age": 81, "population": 1080779}, {"age": 82, "population": 936173}, {"age": 83, "population": 800883}, {"age": 84, "population": 675878}, {"age": 85, "population": 561984}, {"age": 86, "population": 459796}, {"age": 87, "population": 369649}, {"age": 88, "population": 291597}, {"age": 89, "population": 225395}, {"age": 90, "population": 170504}, {"age": 91, "population": 126057}, {"age": 92, "population": 90960}, {"age": 93, "population": 63973}, {"age": 94, "population": 43800}, {"age": 95, "population": 29160}, {"age": 96, "population": 18857}, {"age": 97, "population": 11829}, {"age": 98, "population": 7195}, {"age": 99, "population": 4237}, {"age": 100, "population": 5037}]
        
        var fxScale = d3.scaleLinear()
            .range([0,gfPyramidPlotWidth])
            //.range([width, 0])
            .domain([0, d3.max(femaleData, function (d) {
                return d.population;
            })])

        var fyScale = d3.scaleLinear()
            .range([gfPyramidPlotHeight,0])
            .domain([0, d3.max(femaleData, function (d) {
                return d.age;
            })]);

        let fxAxis = d3.axisBottom(fxScale);
        let fyAxis = d3.axisLeft(fyScale);

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
            .attr("width", function (d) {
                return fxScale(d.population);
            });
        
        gfxAxis.call(fxAxis).attr('transform','translate('+0+','+gfPyramidPlotHeight+')')
        gfyAxis.call(fyAxis).attr('transform','translate('+(0)+',0)')

}