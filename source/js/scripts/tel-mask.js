'use strict';

// добавялет маску к номеру телефона
(function () {
  var telInputs = Array.prototype.slice.call(document.querySelectorAll('input[type=tel]'));
  var maskOptions = {
    mask: '+{7}(000)000-00-00'
  };


  telInputs.forEach(function (it) {
    if (it) {
      var mask = IMask(it, maskOptions);
    }
  });
})();
