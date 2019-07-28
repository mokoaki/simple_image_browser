export class Image {
  constructor (imageUrl) {
    this.promise = new Promise((resolve, reject) => {
      const imageElement = document.createElement('img')

      imageElement.addEventListener('load', () => {
        resolve(imageElement)
      }, {
        once: true,
        passive: true
      })

      imageElement.addEventListener('error', (event) => {
        reject(new Error(`Image load error ${imageUrl}`))
      }, {
        once: true,
        passive: true
      })

      imageElement.src = imageUrl
    })
  }
}
