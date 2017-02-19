import {AR} from 'js-aruco'
// import mqt from './comms.js'

const _capture = () => {

  var canvas = document.createElement("canvas")

  navigator.mediaDevices.enumerateDevices()
  .then(devices =>
    devices.filter(device => device.kind == 'videoinput')
  )
  .then(cameras => {
    console.log("cameras: ", cameras)
    // Hack: the back one seems to be last
    return cameras[cameras.length-1]
  })
  .then( camera =>
    navigator.mediaDevices
      .getUserMedia({
        video: {deviceId: {exact: camera.deviceId} },
        audio: false
      })
  )
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

    const canvas = document.createElement('canvas')
    canvas.width = videoWidth
    canvas.height = videoHeight
    document.body.appendChild(canvas)

    const try_full = () => {
      canvas.removeEventListener('touchstart', try_full)
      if(canvas.webkitRequestFullscreen) {
        canvas.webkitRequestFullscreen()
      }
    }
    canvas.addEventListener('touchstart', try_full)

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

}

export default _capture
