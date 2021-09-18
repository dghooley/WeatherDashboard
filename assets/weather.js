$(document).ready(function(){
// APIkey 
var APIkey = "401527215f995265731bc0cc2e824f7a"

// search button activation
$("#searchButton").on("click", function(){
var userSearch = $("#searchBar").val()
// console.log(userSearch)

// function using api to retrieve current weather data
getCurrentWeather(userSearch)
})
function getCurrentWeather(userSearch){
  console.log("user search in getCurrentWeather", userSearch)
var currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${userSearch}&appid=${APIkey}&units=imperial`
  console.log("currentWEatherURL", currentWeatherURL)

// updating webpage with current weather without a page reload
$.ajax({
    url: currentWeatherURL,
    method: "GET"
}).then(function(response){
  console.log(response);

// creating variables based on location in DOM
var cityName = response.name;
  console.log()
var temperature = response.main.temp;
  console.log()
var humidity = response.main.humidity;
  console.log()
var wind = response.wind.speed;
  console.log()

// creating dynamic HTML content to display city, temp, humidity, wind and UV index data
var cityNameEl = $("<h1 class='card-title align-left'>").text(cityName);
var tempElement = $("<p>").addClass("card-text").text("Temperature: " + temperature + "F")
var humidityElement = $("<p>").addClass("card-text").text("Humidity: " + humidity + "%")
var windElement = $("<p>").addClass("card-text").text("Wind: " + wind + " MPH")

$("#currentWeather").append(cityNameEl, tempElement)
$("#currentWeather").append(cityNameEl, humidityElement)
$("#currentWeather").append(cityNameEl, windElement)

// creating variables based on location in DOM
var coords = {
    lat: response.coord.lat,
    lon: response.coord.lon
}

getFiveDay(coords)
})
}
// function using API to retrieve five day weather forecast
function getFiveDay(coords){
// console.log("coords in five day", coords)
    var fiveDayURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${APIkey}`
// updating webpage with coordinates without a reload
    $.ajax({
        url: fiveDayURL,
        method: "GET"
    }).then(function(response){
// console.log("FIVE DAY RESPONSE",response);
}
    )}







})