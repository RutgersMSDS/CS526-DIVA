function showQuestion1()
{
    // $.ajax(
    //     {
    //         url:"/",
    //         success: function(result)
    //         {
    //             wp = JSON.parse(result).wp
    //             console.log(wp.length)
    //             drawChart(wp,type_of_plot)
    //         }
    //     });

    d3.json("/static/data/worldData.json")
        .then(function(data) {

            popData = data.population;
            areaData = data.area;

            showLineChartForQuestion1(popData);
            showBubbleChartForQuestion1(areaData);
            showChoroplethForQuestion1(popData, areaData);
        });


}