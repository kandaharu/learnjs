'use strict';

/**
 * @classdesc LearnJS を実行するためのクラス
 */
class LearnJS {

  /**
   * アプリがonReadyステートメントになった時に実行されるメソッド。
   * onHashChangeイベントをフックして動的にViewを入れ替えるRouterの役割を担う。
   * @memberof LearnJS
   */
  appOnReady() {
    window.onhashchange = () =>  {
      this.showView(window.location.hash);
    }
    this.showView(window.location.hash);
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

  /**
   * 問題Viewを作成する
   * @param {number} problemNumber - 問題番号
   * @return {jQueryObject} 問題View
   * @memberof LearnJS
   */
  problemView(problemNumber) {
    const $view = $('.templates .problem-view').clone();
    const title = `Problem #${problemNumber} Coming soon!`;
    $view.find('.title').text(title);
    return $view;
  }

}

const learnjs = new LearnJS();

$(() => {
  learnjs.appOnReady();
});
