$(document).ready(function(){
// APIkey 
  var APIkey = "401527215f995265731bc0cc2e824f7a"

$("#searchButton").on("click", function(){
  var userSearch = $("#searchBar").val()
// console.log(userSearch)

// function using api to retrieve current weather data
getCurrentWeather(userSearch)
})
  function getCurrentWeather(userSearch){
//  console.log("user search in getCurrentWeather", userSearch)
    var currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${userSearch}&appid=${APIkey}&units=imperial`
//  console.log("currentWEatherURL", currentWeatherURL)

    $.ajax({
      url: currentWeatherURL,
      method: "GET"
    }).then(function(response){
//  console.log(response);
    
// creating variables based on location in DOM
    var cityName = response.name;
    console.log()
    var temperature = response.main.temp;
    console.log()
    var humidity = response.main.humidity;
    console.log()
    var wind = response.wind.speed;
    console.log()
    var coords = {
      lat: response.coord.lat,
      lon: response.coord.lon}
    var uvi = response.uvi   
    console.log("UVI") 
// creating dynamic HTML content to display city, temp, humidity, wind and UV index data
    var cityNameEl = $("<h2> class='card-title align-left'>").text(cityName);
    var tempElement = $("<p>").addClass("card-text").text("Temperature: " + temperature + "F")
    var humidityElement = $("<p>").addClass("card-text").text("Humidity: " + humidity + "%")
    var windElement = $("<p>").addClass("card-text").text("Wind: " + wind + " MPH")
    var coordsElement = $("<p>").addClass("card-text").text("Lat: " + coords.lat + ", Lon: " + coords.lon)
    var uvIndexElement = $("<p>").addClass("card-text").text("UV Index: " + uvi)
// console.log ("UV INDEX")
    $("#currentWeather").append(cityNameEl)
    $("#currentWeather").append(tempElement)
    $("#currentWeather").append(humidityElement)
    $("#currentWeather").append(windElement)
    $("#currentWeather").append(coordsElement)
    $("#currentWeather").append(uvIndexElement)
    getFiveDay(coords)
})
}
// function using API to retrieve five day weather forecast
  function getFiveDay(coords){
// console.log("coords in five day", coords)
    var fiveDayURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${APIkey}`
// console.log ("five days")
    $.ajax({
        url: fiveDayURL,
        method: "GET"
    }).then(function(response){
// console.log("FIVE DAY RESPONSE",response);
})
}
})
