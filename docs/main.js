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


var createDom = function (document) {
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

var marker = createDom(document);
document.body.appendChild(marker);


updateDom(marker, 42);


setInterval(function () {
  updateDom(marker, Math.floor(Math.random() * 1024));
}, 1000);
