import _display from './lib/_display.js'
import _capture from './lib/_capture.js'

const qs = document.querySelector.bind(document)

qs('#show').addEventListener('click', () => {
  _display()
  qs('#actions').remove()
}, true)

qs('#capture').addEventListener('click', () => {
  _capture()
  qs('#actions').remove()
}, true)
