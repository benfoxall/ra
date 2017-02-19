const w = false, b = true

const rows =[
  [b, w, b, b, b, b, b],
  [b, w, b, w, w, w, b],
  [b, b, w, b, b, w, b],
  [b, b, w, w, w, b, b],

  [b, b, b, b, b, b, b] // border
]

const generate = (i) =>
	[
		rows[4],
		rows[i >> 8 & 3],
		rows[i >> 6 & 3],
		rows[i >> 4 & 3],
		rows[i >> 2 & 3],
		rows[i & 3],
		rows[4]
	]


export const createDom = () => {
  const root = document.createElement('div')
  root.className = 'marker'

  for (let x = 0; x < 7; x++) {
    for (let y = 0; y < 7; y++) {
      const el = document.createElement('div')
      el.style.left = `${x * 100/7}%`
      el.style.top = `${y * 100/7}%`
      root.appendChild(el)
    }
  }

  return root
}

export const updateDom = (element, n) => {

  // flatten
  const data = generate(n)
    .reduce((a, b) => a.concat(b))

  for (var i = 0; i < element.childNodes.length; i++) {
    element.childNodes[i].className = data[i] ? 'on' : 'off'
  }

}


export default generate


export class Marker {
  constructor () {
    this.dom = createDom(document)
  }

  update (n) {
    updateDom(this.dom, n)
  }
}
