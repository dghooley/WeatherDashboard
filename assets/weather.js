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
    $("#currentWeather").empty();
// creating variables based on location in DOM
    var mainDate = moment().format('L');
    var cityName = response.name;
//  console.log()
    var temperature = response.main.temp;
//  console.log()
    var humidity = response.main.humidity;
//  console.log()
    var wind = response.wind.speed;
//  console.log()
    var coords = {
      lat: response.coord.lat,
      lon: response.coord.lon}
    var uvi = response.uvi   
//  console.log("UVI") 

// creating dynamic HTML content to display city, temp, humidity, wind and UV index data
    var cityNameEl = $("<h2> class='card-title align-left'>").text(cityName);
    var tempElement = $("<p>").addClass("card-text").text("Temperature: " + temperature + "F")
    var humidityElement = $("<p>").addClass("card-text").text("Humidity: " + humidity + "%")
    var windElement = $("<p>").addClass("card-text").text("Wind: " + wind + " MPH")
    var coordsElement = $("<p>").addClass("card-text").text("Lat: " + coords.lat + ", Lon: " + coords.lon)
    var uvIndexElement = $("<p>").addClass("card-text").text("UV Index: " + uvi)
    var currentWeather = response.weather[0].main;
// console.log ("UV INDEX")
    if (currentWeather === "Rain") {
      var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/10d@2x.png");
      icon.attr("style", "height: 40px; width: 40px");
      console.log(rain)
    } else if (currentWeather === "Clouds") {
      var icon =$('<img>').attr("src", "http://openweathermap.org/img/wn/03d@2x.png");
      icon.attr("style", "height: 40px; width: 40px");
    } else if (currentWeather === "Clear") {
    var icon =$('<img>').attr("src", "http://openweathermap.org/img/wn/01d@2x.png");
    icon.attr("style", "height: 40px; width: 40px");
    } else if (currentWeather === "Drizzle") {
    var icon =$('<img>').attr("src",  "http://openweathermap.org/img/wn/09d@2x.png");
    icon.attr("style", "height: 40px; width: 40px");
    } else if (currentWeather === "Snow") {
      var icon =$('<img>').attr("src", "http://openweathermap.org/img/wn/13d@2x.png");
      icon.attr("style", "height: 40px; width: 40px");
    }

    var nDiv= $('<div>');
    nDiv.append(mainDate, icon, tempElement, humidityElement, windElement);
    $("#currentWeather").html(nDiv)
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
    var results = response.list;
    $("$#fiveDayForecast").empty();
    for (var i = 0; i < results.length; i += 8) {
      var fiveDayDiv = $("<div class='card shadow-lg text-white bg-primary mx-auto mb-10 p-2' style='width: 8.5rem; height: 11rem;'>");
      var date= results[i].dt_txt;
      var setD= date.substr(0,10)
      var temp= results[i].main.temp;
      var humidity= results[i].main.humidity;
      var h5date = $("<h5 class='card-title'>").text(setD);
      var pTemp= $("<p class='card-text'>").text("Temp: " + temp);
      var pHum= $("<p class='card-text'>").text("Humidity: " + humidity);
      var weather = results[i].weather[0].main

      fiveDayDiv.append(h5date);
      fiveDayDiv.append(icon);
      fiveDayDiv.append(pTemp);
      fiveDayDiv.append(pHum);
      $("#fiveDayForecast").append(fiveDayDiv);
    }
});
}
})
