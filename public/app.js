'use strict';
let learnjs = {};

learnjs.showView = (hash) => {
  const $problemView = $('<div class="problem-view">').text('Coming Soon!');
  $('.view-container').empty().append($problemView);
};