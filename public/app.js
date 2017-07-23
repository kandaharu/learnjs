'use strict';

class LearnJS {
  problemView() {
    return $('<div class="problem-view">').text('Coming Soon!');
  }

  showView(hash) {
    const routes = {
      '#problem-1': this.problemView()
    };
    const viewFn = routes[hash];

    if (viewFn) {
      $('.view-container').empty().append(viewFn);
    }
  }
}

$(() => {
  const learnjs = new LearnJS();
  learnjs.showView(window.location.hash);
});
