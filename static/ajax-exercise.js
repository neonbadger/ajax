"use strict";


// PART 1: SHOW A FORTUNE

function addFortune(result) {
    $("#fortune-text").html(result);
}


function showFortune(evt) {

    // TODO: get the fortune and show it in the #fortune-text div

    $.get("/fortune", addFortune);
}

$('#get-fortune-button').on('click', showFortune);




function addWeather(results) {
    var forecast = results.forecast;
    $('#weather-info').html(forecast);
}
// PART 2: SHOW WEATHER

function showWeather(evt) {
    evt.preventDefault();

    var url = "/weather.json?zipcode=" + $("#zipcode-field").val();
    $.get(url, addWeather);

    // TODO: request weather with that URL and show the forecast in #weather-info
}

$("#weather-form").on('submit', showWeather);




// PART 3: ORDER MELONS

// route /order-melons.json returns 
// JSON 'code': result_code and 'msg': result_text

function showOrderStatus(result) {
    if (result.code === 'ERROR') {
        $("#order-status").addClass("order-error");
        $("#order-status").html('<p><b>'+result.msg+'</b></p>');
    }
    else {
        $("#order-status").html('<p>'+result.msg+'</p>');
    }

    console.log(result.msg);
    console.log(result.code);
}

function orderMelons(evt) {
    evt.preventDefault();

    // formInput: data for the .post method
    // note no "action = '/...' " in html b/c that would submit 
    // form data to a new url
    // here, ajax collects the form data, sends to server
    // server uses the form data and process them, generate 'code' and 'msg',
    // sends back to AJAX as result, so AJAX can access result.code
    // and result.msg.
    // AJAX handles the page chanage, rather than HTML or Jinja, so page does not reload

    var formInput = {
        "melon_type": $("#melon-type-field").val(),
        "qty": $("#qty-field").val()
    };

    $.post("/order-melons.json", formInput, showOrderStatus);
}

$("#order-form").on('submit', orderMelons);


