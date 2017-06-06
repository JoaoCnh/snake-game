var Arkade = (function () {
  const STORAGE_USER_KEY = "arkade_user";

  var _isOn = false,
  _arkadeUser = null,

  _promptUser = function () {
    var user = localStorage.getItem(STORAGE_USER_KEY);

    if (!user) {
      return swal({
        title: "Hello!",
        text: "Who are you fellow player? (You must type an username to save scores)",
        type: "input",
        showCancelButton: false,
        closeOnConfirm: false,
        animation: "slide-from-top",
        inputPlaceholder: "Write your username",
      }, function (value) {
        if (value === false) { return false };

        if (value === "") {
          swal.showInputError("You must have a username to save the score!");
          return false;
        }

        localStorage.setItem(STORAGE_USER_KEY, value);

        return value;
      });
    } else {
      swal({
        title: "Hello!", 
        text: "Welcome back, " + user,
        timer: 1000,
        showConfirmButton: false
      });

      return user;
    }
  },

  turnOn = function () {
    if (_isOn) { return; }

    if (typeof Storage !== "undefined") {
      _arkadeUser = _promptUser();
    }

    if (typeof Snake !== "undefined") {
      Snake.setup(_arkadeUser);
    }

    _isOn = true;
  };

  return {
    turnOn: turnOn,
  };
}());

window.onload = Arkade.turnOn;
