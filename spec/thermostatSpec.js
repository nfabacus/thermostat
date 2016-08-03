describe('Thermostat',function() {
  var thermostat;
  beforeEach(function() {
    thermostat = new Thermostat();
  });
  describe("temperature",function() {
    it("is set to 20 degrees as initial value",function() {
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
  });
  describe('power saving mode',function() {
    it("when it's set 'on' max temperature can be 25 degrees",function() {
      thermostat.setPowerSavingModeOn();
      thermostat.increaseTemperature(6);
      expect(thermostat.temperature).toEqual(25);
    });
    it("when it's set 'off' max temperature can be 32 degrees",function() {
      thermostat.setPowerSavingModeOff();
      thermostat.increaseTemperature(15);
      expect(thermostat.temperature).toEqual(32);
    });
  });
});
