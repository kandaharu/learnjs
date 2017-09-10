'use strict';

const learnjs = {};

/**
 * 問題を配列で保持
 * @memberof learnjs
 */
learnjs.problem = [
  {
    description: 'What is truth?',
    code: 'function problem() { return __; }'
  },
  {
    description: 'Simple Math',
    code: 'function problem() { return 42 === 6 * __; }'
  }
];

/**
 * アプリがonReadyステートメントになった時に実行されるメソッド。
 * onHashChangeイベントをフックして動的にViewを入れ替えるRouterの役割を担う。
 * @memberof learnjs
 */
learnjs.appOnReady = function () {
  window.onhashchange = () =>  {
    learnjs.showView(window.location.hash);
  }
  learnjs.showView(window.location.hash);
};

learnjs.showView = function (hash) {
  const routes = {
    '#problem': learnjs.problemView
  };

  let hashParts = hash.split('-');
  const viewFn = routes[hashParts[0]];

  if (viewFn) {
    $('.view-container').empty().append(viewFn(hashParts[1]));
  }
};

/**
 * 問題Viewを作成する
 * @param {number} num - 問題番号
 * @return {jQueryObject} 問題View
 * @memberof learnjs
 */
learnjs.problemView = function (num) {
  const problemNumber = parseInt(num, 10);
  const $view = $('.templates .problem-view').clone();
  const title = `Problem #${problemNumber}`;
  const problem = learnjs.problem[problemNumber - 1];
  const $resultFlash = $view.find('.result');

  function checkAnswer() {
    const answer = $view.find('.answer').val();
    const test = `${problem.code.replace('__', answer)}; problem();`;
    return eval(test);
  }

  function checkAnswerClick() {
    if (checkAnswer()) {
      learnjs.flashElement($resultFlash, 'Correct!');
    } else {
      learnjs.flashElement($resultFlash, 'Incorrect!');
    }
    return false;
  }

  $view.find('.check-btn').click(checkAnswerClick);
  $view.find('.title').text(title);
  learnjs.applyObject(problem, $view);
  return $view;
};

learnjs.applyObject = function (obj, $elem) {
  for (let key in obj) {
    $elem.find(`[data-name="${key}"]`).text(obj[key])
  }
};

/**
 * 与えられた要素をfadeOut→fadeInをすることでflashしているように見せる
 * @param {jQueryObject} flash対象のDOM要素
 * @param {String} flashした後に表示する文字
 * @memberof learnjs
 */
learnjs.flashElement = function ($elem, content) {
  $elem.fadeOut('fast', function () {
    $elem.html(content);
    $elem.fadeIn();
  });
}

$(() => {
  learnjs.appOnReady();
});
