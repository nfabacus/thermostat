'use strict';

var thermostat = new Thermostat();

$.getJSON('http://localhost:9292/thermoinfo.json', function(data) {
    console.log (data);
    thermostat.temperature = data.temperature;
    thermostat.city = data.city;
    console.log("json temp: ", thermostat.temperature, "json city: ", data.city);
});

$( document ).ready(function() {
  function displayWeather(city) {
    var url = 'http://api.openweathermap.org/data/2.5/weather?q='+city;
    var token = '&appid=8e081a97ce3ce35b04ff7460e037fc27';
    var units = '&units=metric';
    $.get(url+token+units, function(data) {
    $('#current-temperature').text(city + " " + data.main.temp);
    });
  }

  function displayTemperature() {
    $("#display").html(thermostat.temperature+"°C");
    $("#display").attr('class', thermostat.energyUsage());
  }
  displayTemperature();
  displayWeather(thermostat.city);


  function sendCity(city) {
    $.post('http://localhost:9292/cityToServer.json', {city: city }, function(data){
      console.log("post success! call back returned!", data);
    });
  }

  $('#select-city').submit(function(event){
    event.preventDefault();
    var city = $("#current-city").val();
    sendCity(city);
    displayWeather(city);
  });

  function updateTemperature(){
    $.post("http://localhost:9292/temperatureToServer.json", {temperature: thermostat.temperature}, function(data){
      console.log("post success! call back returned!", data);
    });
  }

  $("button#upButton").click(function(){
    thermostat.increaseTemperature(1);
    updateTemperature();
    displayTemperature();
  });
  $("button#downButton").click(function(){
    thermostat.decreaseTemperature(1);
    updateTemperature();
    displayTemperature();
  });
  $("button#resetButton").click(function(){
    thermostat.reset();
    updateTemperature();
    displayTemperature();
  });
  $("button#powerSavingOn").click(function(){
    thermostat.setPowerSavingModeOn();
    $("span#powerSavingStatus").html("ON");
    updateTemperature();
    displayTemperature();
  });
  $("button#powerSavingOff").click(function(){
    thermostat.setPowerSavingModeOff();
    $("span#powerSavingStatus").html("OFF");
    updateTemperature();
    displayTemperature();
  });

});
