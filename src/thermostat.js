function Thermostat () {
this.temperature = 20;
this.powerSavingMode = true;
// this.maxTemperature = 32;
};

Thermostat.prototype =  {
  maxTemperature: function() {
    if (this.powerSavingMode === true) {
      return 25;
    } else {
      return 32;
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
    if (this.temperature - value < 10) {
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
  }
};
