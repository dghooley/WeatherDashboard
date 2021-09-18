$(document).ready(function(){
var APIkey = "401527215f995265731bc0cc2e824f7a"



$("#searchButton").on("click", function(){
var userSearch = $("#searchBar").val()
console.log(userSearch)

getCurrentWeather(userSearch)

})

function getCurrentWeather(userSearch){
    console.log("user search in getCurrentWeather", userSearch)
var currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${userSearch}&appid=${APIkey}&units=imperial`
console.log("currentWEatherURL", currentWeatherURL)

$.ajax({
    url: currentWeatherURL,
    method: "GET"
}).then(function(response){
    console.log(response);

var cityName = response.name;

var temperature = response.main.temp;
//console.log()

var humidity = response.main.humidity;
//console.log()

var wind = response.wind.speed;

var cityNameEl = $("<h2 class='card-title text-center'>").text(cityName);
var tempElement = $("<p>").addClass("card-text").text("Temperature: " + temperature + "F")

$("#currentWeather").append(cityNameEl, tempElement)

var coords = {
    lat: response.coord.lat,
    lon: response.coord.lon
}

getFiveDay(coords)


})

}

function getFiveDay(coords){
    console.log("coords in five day", coords)
    var fiveDayURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${APIkey}`

    $.ajax({
        url: fiveDayURL,
        method: "GET"
    }).then(function(response){
        console.log("FIVE DAY RESPONSE",response);
}
    )}







})