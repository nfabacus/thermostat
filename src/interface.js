'use strict';

$( document ).ready(function() {
  $('#select-city').submit(function(event){
    event.preventDefault();
    var city = $("#current-city").val();
    displayWeather(city);
  });

function displayWeather(city) {
  var url = 'http://api.openweathermap.org/data/2.5/weather?q='+city;
  var token = '&appid=8e081a97ce3ce35b04ff7460e037fc27';
  var units = '&units=metric';
  $.get(url+token+units, function(data) {
  $('#current-temperature').text(data.main.temp);
  });
}

  var thermostat = new Thermostat();

  function updateTemperature(){
      $("h2#display").html(thermostat.temperature);
      $("h2#display").attr('class', thermostat.energyUsage());
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
