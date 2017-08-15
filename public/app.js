'use strict';

class LearnJS {
  problemView(problemNumber) {
    const view = $('.templates .problem-view').clone();
    const title = `Problem #${problemNumber} Coming soon!`;
    view.find('.title').text(title);
    return view;
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
