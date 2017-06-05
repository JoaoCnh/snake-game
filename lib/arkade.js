var Arkade = (function () {
  var _isOn = false,

  turnOn = function () {
    if (_isOn) { return; }

    if (typeof Snake !== "undefined") {
      Snake.setup();
    }

    _isOn = true;
  };

  return {
    turnOn: turnOn,
  };
}());

window.onload = Arkade.turnOn;
