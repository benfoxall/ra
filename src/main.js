import {Marker} from './lib/markers.js'
import shuffles from 'knuth-shuffle'

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
  console.log(`display marker ${n}`)
  marker.update(n)
}, 5000)
