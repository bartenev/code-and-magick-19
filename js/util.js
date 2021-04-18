'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  var getRandomNumber = function (maxNum) {
    return Math.floor(Math.random() * maxNum);
  };

  var isEsc = function (evt) {
    var isEscKey = false;
    if (evt.key === ESC_KEY) {
      isEscKey = true;
    }
    return isEscKey;
  };

  var isEscEvent = function (evt, action) {
    if (evt.key === ESC_KEY) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.key === ENTER_KEY) {
      action();
    }
  };

  window.util = {
    getRandomNumber: getRandomNumber,
    isEsc: isEsc,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent
  };

})();
