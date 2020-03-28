store = {};
function showChart()
{
    let type_of_plot = document.getElementById("type_of_plot").value;
    let level_of_depth = document.getElementById("level_of_depth").value;
    console.log(level_of_depth)
    $.ajax(
        {
            url:"/showData",
            success: function(result)
            {
                wp = JSON.parse(result).wp
                console.log(wp.length)
                drawChart(wp,type_of_plot)
            }
        });

}

function drawChart(data,type_of_plot)
{
    //drawLine(data,20,0.5,"container");
    switch(type_of_plot)
    {
        case "Scatter":
            drawScatter(data,20,0.5,"container");
            break;
        case "Line":
            drawLine(data,20,0.5,"container");
            break;
        case "Bar":
            drawBar(data,20,0.5,"container");
            break;
    }
}