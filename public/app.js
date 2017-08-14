'use strict';

class LearnJS {
  problemView(problemNumber) {
    const title = `Problem #${problemNumber} Coming soon!`;
    return $('<div class="problem-view">').text(title);
  }

  showView(hash) {
    const routes = {
      '#problem': this.problemView
    };

    let hashParts = hash.split('-');
    const viewFn = routes[hashParts[0]];

    if (viewFn) {
      $('.view-container').empty().append(viewFn(hashParts[1]));
    }
  }

  appOnReady() {
    window.onhashchange = () =>  {
      this.showView(window.location.hash);
    }
    this.showView(window.location.hash);
  }
}

const learnjs = new LearnJS();

$(() => {
  learnjs.appOnReady();
});
