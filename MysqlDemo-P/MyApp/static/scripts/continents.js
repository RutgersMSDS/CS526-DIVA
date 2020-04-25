$(document).ready(function(){
    $(".form-check .button_continent").click(function(){

         var idOfSelectedItem = (this.id);
        if(!selectedCountryNamesList.includes(idOfSelectedItem) && (selectedCountryNamesList.length)<10) {

            //newly selected and total number of places selected is less than 10
            selectedCountryNamesList.push(idOfSelectedItem);

            getContinentData(idOfSelectedItem);
        } else if(selectedCountryNamesList.includes(idOfSelectedItem)) {
            //previously clicked, now delesected
            removeLine(idOfSelectedItem);
        } else if(selectedCountryNamesList.length == 10) {
            //show toast of max 10
        }
    });
});

function getContinentData(continentName) {
    $.ajax(
        {
            type: "POST",
            data: { csrfmiddlewaretoken: "{{ csrf_token }}",   // < here
                'continents':continentName
            },
            url:"/showContinentsData",
            success: function(result) {
                var data = JSON.parse(result).cp.populationList;
                drawLine(data, continentName, worldContinentColors[continentName]);
            },
            failure: function (error) {
                //TODO: error toast
            }
        });
}
