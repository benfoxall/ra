import {Marker} from './markers.js'
import shuffles from 'knuth-shuffle'
// import mqt from './comms.js'

// import {AR, POS1} from 'js-aruco'
const display = () => {
  const marker = new Marker()
  document.body.appendChild(marker.dom)


  // generate a code potentially to identify observers
  const code = shuffles.knuthShuffle(
      Array.from({length: 1024}, (_,i) => i)
    ).slice(0, 5)

  console.log(`code: ${code.join(', ')}`)

  // show the first one
  marker.update(code[0])

  // cycle through the rest (might be nice if this was on the marker)
  let i = 0
  setInterval(() => {
    const n = code[++i % code.length]
    // console.log(`🔛 ${n}`)
    marker.update(n)
  }, 1500)

}

export default display
