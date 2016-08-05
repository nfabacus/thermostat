'use strict';

function Thermostat () {
  this.MINIMUM_TEMPERATURE = 10;
  this.DEFAULT_TEMPERATURE = 20;
  this.temperature = this.DEFAULT_TEMPERATURE;
  this.MAX_LIMIT_PSM_OFF = 32;
  this.MAX_LIMIT_PSM_ON = 25;
  this.MEDIUM_ENERGY_USAGE_LIMIT = 18;
  this.powerSavingMode = true;
  this.city = "";
}

Thermostat.prototype =  {
  maxTemperature: function() {
    if (this.powerSavingMode === true) {
      return this.MAX_LIMIT_PSM_ON;
    } else {
      return this.MAX_LIMIT_PSM_OFF;
    }
  },
  increaseTemperature: function(value) {
    if (this.temperature + value > this.maxTemperature()) {
      this.temperature = this.maxTemperature();
    }
    else {
      this.temperature += value;
    }
  },
  decreaseTemperature: function(value) {
    if (this.temperature - value < this.MINIMUM_TEMPERATURE) {
      this.temperature = 10;
    }
    else {
      this.temperature -= value;
    }
  },
  setPowerSavingModeOn: function() {
    this.powerSavingMode = true;
    // this.maxTemperature = 25;
  },
  setPowerSavingModeOff: function() {
    this.powerSavingMode = false;
    // this.maxTemperature = 32;
  },
  reset: function() {
    this.temperature = this.DEFAULT_TEMPERATURE;
  },
  energyUsage: function() {
    if (this.temperature <this.MEDIUM_ENERGY_USAGE_LIMIT) {
      return 'low-usage';
    } else if(this.temperature >=this.MEDIUM_ENERGY_USAGE_LIMIT && this.temperature < this.MAX_LIMIT_PSM_ON) {
      return 'medium-usage';
    } else if (this.temperature >= this.MAX_LIMIT_PSM_ON) {
      return 'high-usage';
    } else {
      return 'high-usage';
    }

  }
};
