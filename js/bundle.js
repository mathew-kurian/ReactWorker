var window = self || {};

function evaluate(context, a) {
  function _eval() {
    return eval(a);
  }

  return _eval.call(context);
}

function require(modules, then, args) {
  if (!Array.isArray(args)) {
    args = [];
  }
  if (!modules || !modules.length) {
    return then.apply(window, args);
  }
  var module = modules.shift();
  if (typeof module === 'function') {
    console.info('Loading', module);
    args.push(module.apply(window, args));
    require(modules, then, args);
  } else {
    window.fetch(module, {
      method: 'get'
    }).then(function (response) {
      return response.text()
    }).then(function (body) {
      console.info('Loading', module);
      args.push(evaluate(window, body));
      require(modules, then, args);
    });
  }
}


var storage = {};
window.localStorage = {};
window.localStorage.setItem = function (a, k) {
  storage[a] = k;
};
window.localStorage.getItem = function (a) {
  return storage[a];
};

window.onmessage = function (e) {
  var data = JSON.parse(e.data);
  if (data.action) {
    Actions[data.action].call(null, data);
  }
};

var Actions = {};
Actions.start = function (data) {
  require([
    'simple-html-tokenizer.js',
    'simple-dom.js',
    function () {
      window.document = new Document();
      document.getElementsByTagName('body')[0].innerHTML = data.startBodyContext;

      window.document.proxy = function (data) {
        postMessage(JSON.stringify(data));
      };
    },
    'react-with-addons.js',
    '../node_modules/todomvc-common/base.js',
    '../node_modules/classnames/index.js',
    '../node_modules/director/build/director.js',
    'utils.js',
    'todoModel.js',
    'todoItem.js',
    'footer.js',
    'app.js'], function () {

  });
};