function Node() {

}

function Document() {
  var events = [];
  var postChangeEvent = function (k, v) {
    events.push([k, v]);
    console.log({k: k, v: v});
  };

  var location = {};
  this.location = {};
  //Object.defineProperty(this.location, {
  //  set: function (k, v) {
  //    location[k] = v;
  //    postChangeEvent('location.' + k, v);
  //  },
  //  get: function (k) {
  //    return location[k];
  //  }
  //});

  this.getElementsByClassName = function (a) {
    return [{nodeType: 11}];
  }
}

window.document = new Document();