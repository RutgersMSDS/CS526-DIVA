function showBubbleChartForQuestion1(areaData) {
    let bubbleChartDiv = document.getElementById("bubbleChartDiv");
    var outerWidth  = bubbleChartDiv.clientWidth,
        outerHeight = bubbleChartDiv.clientHeight;

    var margin = {top: 100, right: 40, bottom: 10, left: 40};
    var width = outerWidth - margin.left - margin.right,
        height = outerHeight - margin.top - margin.bottom;

    var centre = { x: width/2, y: height/2 };
    var forceStrength = 0.199;

    var svg = null;
    var bubbles = null;
    var labels, labelArea = null;
    var nodes = [];

    svg = d3.select("#bubbleChartDiv")
        .append("svg")
        .attr("border",1)
        .attr("width",  outerWidth)
        .attr("height", outerHeight);

    // charge is dependent on size of the bubble, so bigger towards the middle
    function charge(d) {return Math.pow(d.radius, 2.0) * 0.05; }

    var simulation = d3.forceSimulation()
        .force('charge', d3.forceManyBody().strength(charge))
        .force('center', d3.forceCenter(centre.x, centre.y))
        .force('x', d3.forceX().strength(forceStrength).x(centre.x))
        .force('y', d3.forceY().strength(forceStrength).y(centre.y))
        .force('collision', d3.forceCollide().radius( d => d.radius ));

    simulation.stop();

    var fillColour = d3.scaleOrdinal()
        .domain([148429000, 44579000, 30065000, 24256000, 17819000, 13209000, 9938000, 7687000])
        .range(["#E55934",  "#3AB795", "#6162f3", "#70161E",
            "#6F257F", "#2C5634", "#3891A6", "#E6D246"]);

    function createNodes(rawData) {
        var maxSize = d3.max(rawData, d => +d.area/1000000000);

        // size bubbles based on area
        var radiusScale = d3.scaleSqrt()
            .domain([0, maxSize])
            .range([0, height/4]);

        // use map() to convert raw data into node data
        var nodeIndex = 0;
        var myNodes = rawData.map(d => ({
            ...d,
            radius: radiusScale(+d.area/500000000),
            size: +d.area/1000000000,
            x: (nodeIndex > 0) ? centre.x - maxSize - Math.sin((+d.area/500000000) * Math.PI * 2) : centre.x,
            y: (nodeIndex++ > 0) ? centre.y - maxSize - Math.cos((+d.area/500000000) * Math.PI * 2) : centre.y,
            eval: +d.area,
            classed: d.name
        }));

        return myNodes;
    }

    var chart = function chart(selector, rawData) {
        // convert raw data into nodes data
        nodes = createNodes(rawData);

        // bind nodes data to circle elements
        var elements = svg.selectAll('.bubble')
            .data(nodes, d => d.name)
            .enter()
            .append('g');

        bubbles = elements
            .append('circle')
            .classed('bubble', true)
            .attr('r', d => Math.round(d.radius))
            .attr('fill', d => fillColour(d.area));

        // labels
        labels = elements
            .append('text')
            .attr('dy', '.3em')
            .style('text-anchor', 'middle')
            .style('font-size', 16)
            .text(d => d.name);

        labelArea = elements
            .append('text')
            .attr('dy', '1.5em')
            .style('text-anchor', 'middle')
            .style('font-size', 13)
            .text(d => "Area: "+ (d.area/ 1000000).toFixed(2));

        // set simulation's nodes to our newly created nodes array
        // simulation starts running automatically once nodes are set
        simulation.nodes(nodes)
            .on('tick', ticked)
            .restart();
    };

    // callback function called after every tick of the force simulation
    // here we do the actual repositioning of the circles based on current x and y value of their bound node data
    // x and y values are modified by the force simulation
    function ticked() {
        bubbles
            .attr('cx', d => d.x)
            .attr('cy', d => d.y);

        labels
            .attr('x', d => d.x)
            .attr('y', d => d.y);

        labelArea
            .attr('x', d => d.x)
            .attr('y', d => d.y);
    }

    // return chart function from closure
    chart("#bubbleChartDiv", areaData);
}