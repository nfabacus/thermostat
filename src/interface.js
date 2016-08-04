'use strict';

$( document ).ready(function() {

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
