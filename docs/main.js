var w = false;
var b = true;

var rows =[
  [b, w, b, b, b, b, b],
  [b, w, b, w, w, w, b],
  [b, b, w, b, b, w, b],
  [b, b, w, w, w, b, b],

  [b, b, b, b, b, b, b] // border
];

var generate = function (i) { return [
		rows[4],
		rows[i >> 8 & 3],
		rows[i >> 6 & 3],
		rows[i >> 4 & 3],
		rows[i >> 2 & 3],
		rows[i & 3],
		rows[4]
	]; };


var createDom = function () {
  var root = document.createElement('div');
  root.className = 'marker';

  for (var x = 0; x < 7; x++) {
    for (var y = 0; y < 7; y++) {
      var el = document.createElement('div');
      el.style.left = (x * 100/7) + "%";
      el.style.top = (y * 100/7) + "%";
      root.appendChild(el);
    }
  }

  return root
};

var updateDom = function (element, n) {

  // flatten
  var data = generate(n)
    .reduce(function (a, b) { return a.concat(b); });

  for (var i = 0; i < element.childNodes.length; i++) {
    element.childNodes[i].className = data[i] ? 'on' : 'off';
  }

};


var Marker = function Marker () {
  this.dom = createDom(document);
};

Marker.prototype.update = function update (n) {
  updateDom(this.dom, n);
};

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var index = createCommonjsModule(function (module, exports) {
/*jshint -W054 */
(function (exports) {
  'use strict';

  // http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  function shuffle(array) {
    var currentIndex = array.length
      , temporaryValue
      , randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  exports.knuthShuffle = shuffle;
}('undefined' !== 'object' && exports || 'undefined' !== typeof window && window || commonjsGlobal));
});

var marker = new Marker();
document.body.appendChild(marker.dom);


// generate a code potentially to identify observers
var code = index.knuthShuffle(
    Array.from({length: 1024}, function (_,i) { return i; })
  ).slice(0, 5);

console.log(("code: " + (code.join(', '))));

// show the first one
marker.update(code[0]);

// cycle through the rest (might be nice if this was on the marker)
var i = 0;
setInterval(function () {
  var n = code[++i % code.length];
  console.log(("display marker " + n));
  marker.update(n);
}, 5000);
