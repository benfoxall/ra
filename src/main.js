import {createDom, updateDom} from './lib/markers.js'

const marker = createDom(document)
document.body.appendChild(marker)


updateDom(marker, 42)


setInterval(() => {
  updateDom(marker, Math.floor(Math.random() * 1024))
}, 1000)
