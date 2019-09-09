importScripts('../vendor/papaparse/papaparse.min.js')
importScripts('../js/freedict.js')

let ready = false

onmessage = function(e) {
  const id = e.data[0]
  const method = e.data[1]
  const args = e.data[2]
  if (method === 'freedictMethods') {
    this.postMessage([id, 'freedictMethods', Object.keys(FreeDict)])
  } else {
    let data = FreeDict[method](...args)
    this.postMessage([id, method, data])
  }
}

FreeDict.load().then(() => {
  ready = true
  this.postMessage([1, 'load', 'ready'])
})
