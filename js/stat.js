'use strict';

(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 150;
  var CLOUD_Y = 10;
  var GAP = 10;
  var FONT_GAP = 20;

  var BAR_HEIGHT = 150;
  var BAR_WIDTH = 40;
  var BAR_GAP = 50;

  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var getMaxElement = function (array) {
    if (array.length > 0) {
      var maxElement = array[0];
      for (var i = 1; i < array.length; i++) {
        if (array[i] > maxElement) {
          maxElement = array[i];
        }
      }
    }
    return maxElement;
  };

  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

    ctx.fillStyle = '#000000';
    ctx.font = '16px PT Mono';

    var maxTime = getMaxElement(times);

    if (!maxTime || names.length === 0) {
      ctx.fillText('Ошибка! Данных нет(', CLOUD_X + GAP * 2, CLOUD_Y + GAP + FONT_GAP);
    } else {
      ctx.fillText('Ура вы победили!', CLOUD_X + GAP * 2, CLOUD_Y + GAP + FONT_GAP);
      ctx.fillText('Список результатов:', CLOUD_X + GAP * 2, CLOUD_Y + GAP + FONT_GAP * 2);
    }

    // Проверка на одинаковое количество элементов в массивах
    if (names.length > times.length) {
      names.splice(times.length, names.length - times.length);
    }

    for (var i = 0; i < names.length; i++) {
      ctx.fillStyle = '#000000';
      ctx.fillText(names[i], CLOUD_X + BAR_GAP * (i + 1) + BAR_WIDTH * i, CLOUD_Y + CLOUD_HEIGHT - FONT_GAP);

      var currentBarHeight = BAR_HEIGHT * times[i] / maxTime;
      ctx.fillText(String(Math.round(times[i])), CLOUD_X + BAR_GAP * (i + 1) + BAR_WIDTH * i, CLOUD_Y + CLOUD_HEIGHT - FONT_GAP * 2 - GAP - currentBarHeight);

      ctx.fillStyle = '#ff0000';

      if (names[i] !== 'Вы') {
        var randNumber = Math.random() * 100;
        var color = 'hsl(240, ' + randNumber + '%, 50%)';
        ctx.fillStyle = color;
      }

      ctx.fillRect(CLOUD_X + BAR_GAP * (i + 1) + BAR_WIDTH * i, CLOUD_Y + CLOUD_HEIGHT - FONT_GAP - GAP * 2 - currentBarHeight, BAR_WIDTH, currentBarHeight);
    }
  };
})();
