import _display from './lib/_display.js'

// _display()

import {AR} from 'js-aruco'


// do capture
navigator.mediaDevices.getUserMedia({
  video: true,
  audio: false
})
.then(stream =>
  new Promise((resolve, reject) => {
    const video = document.createElement('video')

    video.srcObject = stream
    video.play()

    video.addEventListener('loadedmetadata',
      e => resolve(video))
    video.addEventListener('error', reject)
  })
)
.then(video => {
  const {videoWidth, videoHeight} = video

  var canvas = document.createElement("canvas")
  canvas.width = videoWidth
  canvas.height = videoHeight
  document.body.appendChild(canvas)

  var context = canvas.getContext("2d")
  const detector = new AR.Detector()

  const loop = () => {
    requestAnimationFrame(loop)

    context.drawImage(video, 0, 0, canvas.width, canvas.height)
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height)

    var markers = detector.detect(imageData)

    drawCorners(markers, context)
    drawId(markers, context)
  }

  requestAnimationFrame(loop)

})



// Draw functions from the js-aruco example folder
function drawCorners(markers, context){
  var corners, corner, i, j;

  context.lineWidth = 3;
  for (i = 0; i !== markers.length; ++ i){
    corners = markers[i].corners;

    context.strokeStyle = "red";
    context.beginPath();

    for (j = 0; j !== corners.length; ++ j){
      corner = corners[j];
      context.moveTo(corner.x, corner.y);
      corner = corners[(j + 1) % corners.length];
      context.lineTo(corner.x, corner.y);
    }
    context.stroke();
    context.closePath();

    context.strokeStyle = "green";
    context.strokeRect(corners[0].x - 2, corners[0].y - 2, 4, 4);
  }
}
function drawId(markers, context){
  var corners, corner, x, y, i, j;

  context.strokeStyle = "blue";
  context.lineWidth = 1;

  for (i = 0; i !== markers.length; ++ i){
    corners = markers[i].corners;

    x = Infinity;
    y = Infinity;

    for (j = 0; j !== corners.length; ++ j){
      corner = corners[j];

      x = Math.min(x, corner.x);
      y = Math.min(y, corner.y);
    }
    context.strokeText(markers[i].id, x, y)
  }
}



// import MQT from 'mqt'
// const mqt = new MQT('test.mosquitto.org:8080')
//
// mqt.subscribe('/connect', (m) =>
//   console.log(`👋: ${m}`)
// )
//
// mqt.publish('/connect', code.join(', '))
