'use strict';

(function () {
  // var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  // var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var numberOfSimilarWizards = 4;
  var wizards = [];

  var coatColor;
  var eyesColor;

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarListElement = document.querySelector('.setup-similar-list');

  var userDialog = document.querySelector('.setup');

  // var createWizard = function () {
  //   var indexOfName = window.util.getRandomNumber(WIZARD_NAMES.length);
  //   var indexOfLastName = window.util.getRandomNumber(WIZARD_LAST_NAMES.length);
  //   var indexOfCoatColor = window.util.getRandomNumber(window.constants.COAT_COLORS.length);
  //   var indexOfEyesColor = window.util.getRandomNumber(window.constants.EYES_COLORS.length);
  //
  //   var wizard = {
  //     name: WIZARD_NAMES[indexOfName] + ' ' + WIZARD_LAST_NAMES[indexOfLastName],
  //     coatColor: window.constants.COAT_COLORS[indexOfCoatColor],
  //     eyesColor: window.constants.EYES_COLORS[indexOfEyesColor]
  //   };
  //
  //   return wizard;
  // };

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var renderWizards = function (wizardsArray) {
    similarListElement.innerHTML = '';
    var takeNumber = wizardsArray.length > numberOfSimilarWizards ? numberOfSimilarWizards : wizardsArray.length;

    var fragment = document.createDocumentFragment();
    for (var j = 0; j < takeNumber; j++) {
      fragment.appendChild(renderWizard(wizardsArray[j]));
    }

    similarListElement.appendChild(fragment);
    userDialog.querySelector('.setup-similar').classList.remove('hidden');
  };

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }

    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    renderWizards(wizards.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  var onEyesChange = window.debounce(function (color) {
    eyesColor = color;
    updateWizards();
  });

  var onCoatChange = window.debounce(function (color) {
    coatColor = color;
    updateWizards();
  });

  var onSuccessLoad = function (uploadWizards) {
    wizards = uploadWizards;
    coatColor = document.querySelector('#coat-color').value;
    eyesColor = document.querySelector('#eyes-color').value;
    updateWizards();
  };

  var onErrorLoad = function (errorMessage) {
    window.backend.createErrorBlock(errorMessage);
  };

  window.backend.load(onSuccessLoad, onErrorLoad);

  window.similarWizards = {
    updateWizards: updateWizards,
    onCoatChange: onCoatChange,
    onEyesChange: onEyesChange
  };
})();
