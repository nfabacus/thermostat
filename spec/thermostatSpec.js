'use strict';

describe('Thermostat',function() {
  var thermostat;
  beforeEach(function() {
    thermostat = new Thermostat();
  });
  describe("temperature",function() {
    it("is set to be 20 degrees as initial value",function() {
      expect(thermostat.temperature).toEqual(20);
    });
    it("can be increased with 'up button'",function() {
      thermostat.increaseTemperature(1);
      expect(thermostat.temperature).toEqual(21);
    });
    it("can be decreased with 'down button'",function() {
      thermostat.decreaseTemperature(1);
      expect(thermostat.temperature).toEqual(19);
    });
    it("can't be lower then 10 degrees",function () {
      thermostat.decreaseTemperature(11);
      expect(thermostat.temperature).toEqual(10);
    });
    it('can be reset to 20 degrees with the reset button', function() {
      thermostat.increaseTemperature(3);
      thermostat.reset();
      expect(thermostat.temperature).toEqual(20);
    });
  });
  describe('power saving mode',function() {
    it("when it's set 'on' max temperature is 25 degrees",function() {
      thermostat.setPowerSavingModeOn();
      thermostat.increaseTemperature(6);
      expect(thermostat.temperature).toEqual(25);
    });
    it("when it's set 'off' max temperature is 32 degrees",function() {
      thermostat.setPowerSavingModeOff();
      thermostat.increaseTemperature(15);
      expect(thermostat.temperature).toEqual(32);
    });
    it("is set on by default",function() {
      expect(thermostat.powerSavingMode).toBe(true);
    });
    it("can be switched off and on",function() {
      thermostat.setPowerSavingModeOff();
      expect(thermostat.powerSavingMode).toBe(false);
      thermostat.setPowerSavingModeOn();
      expect(thermostat.powerSavingMode).toBe(true);
    });
  });
  describe('displaying usage levels', function() {
    it('changes its color based on energy usage', function(){
      expect(thermostat.energyUsage()).toEqual("medium-usage");
      thermostat.decreaseTemperature(3);
      expect(thermostat.energyUsage()).toEqual("low-usage");
      thermostat.reset();
      thermostat.increaseTemperature(5);
      expect(thermostat.energyUsage()).toEqual("high-usage");

    });
  });
});
