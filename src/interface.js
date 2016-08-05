'use strict';

var thermostat = new Thermostat();

function displayWeather(city) {
  var url = 'http://api.openweathermap.org/data/2.5/weather?q='+city;
  var token = '&appid=8e081a97ce3ce35b04ff7460e037fc27';
  var units = '&units=metric';
  $.get(url+token+units, function(data) {
  $('#current-temperature').html(city + " " + data.main.temp);
  });
}
$.getJSON('http://localhost:9292/thermoinfo.json', function(data) {
    thermostat.temperature = data.temperature;
    if (data.city !== null) {
      displayWeather(data.city);
    }
    console.log("json temp: ", thermostat.temperature, "json city: ", data.city);
});

$( document ).ready(function() {

  $('#select-city').submit(function(event){
    event.preventDefault();
    var city = $("#current-city").val();
    $.post('http://localhost:9292/cityToServer.json', {city: city}, function(data){
      console.log("post success! call back returned!", data);
    });
    displayWeather(city);
  });

  function updateTemperature(){
    $("#display").html(thermostat.temperature+"°C");
    $("#display").attr('class', thermostat.energyUsage());
    $.post('http://localhost:9292/temperatureToServer.json', {temperature: thermostat.temperature}, function(data){
      console.log("post success! call back returned!", data);
    });
  }

  updateTemperature();

  $("button#upButton").click(function(){
    thermostat.increaseTemperature(1);
    updateTemperature();
  });
  $("button#downButton").click(function(){
    thermostat.decreaseTemperature(1);
    updateTemperature();
  });
  $("button#resetButton").click(function(){
    thermostat.reset();
    updateTemperature();
  });
  $("button#powerSavingOn").click(function(){
    thermostat.setPowerSavingModeOn();
    $("span#powerSavingStatus").html("ON");
    updateTemperature();
  });
  $("button#powerSavingOff").click(function(){
    thermostat.setPowerSavingModeOff();
    $("span#powerSavingStatus").html("OFF");
    updateTemperature();
  });

});
