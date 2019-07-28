import { Loader } from './loader.js'
import { Image } from './image.js'
import { Events } from './events/events.js'
import { LocationHash } from './location_hash.js'
import { Util } from './util.js'

export class ImageList {
  constructor () {
    this.locationHash = new LocationHash()
    this.events = new Events(this)

    // page()を設定すると読み込み開始しようとするので直接書き換える
    this._pageNum = this.locationHash.hash

    this.createImageTag()
  }

  createImageTag () {
    const imageElement = window.document.createElement('img')
    document.body.appendChild(imageElement)
    this.currentImageElement = imageElement
  }

  // images (paths, startOrEnd = 'start') {
  images (paths, params) {
    if (paths === undefined) {
      return this.imagePromises
    }

    this.imagePromises = Loader.parse(paths)
    this.updateImage(params)

    return true
  }

  page (page, params) {
    if (page === undefined) {
      return this._pageNum
    }

    const trustHash = Util.trustPositiveInt(page)

    this.locationHash.hash = trustHash
    this._pageNum = trustHash

    this.updateImage(params)

    return true
  }

  updateImage ({ behavior = 'auto', block = 'start' } = {}) {
    const imagePromise = this.getImagePromise(this.page())

    imagePromise
      .then((imageElement) => {
        // TODO
        // use? replaceChild
        // use? this.currentImageElement
        document.body.replaceChild(imageElement, this.currentImageElement)
        this.currentImageElement = imageElement
        return imageElement
      })
      .then((imageElement) => {
        imageElement.scrollIntoView({ behavior: behavior, block: block })
      })
      .catch((imageElement) => {
        console.error(imageElement)
      })
  }

  getImagePromise (page) {
    const index = page - 1
    const imagePromise = this.imagePromises[index]

    if (Util.isTypePromise(imagePromise)) {
      return imagePromise
    }

    const imageUrl = imagePromise || 'OUT_OF_IMAGE_PATHS_RANGE'
    const newImagePromise = new Image(imageUrl).promise
    this.imagePromises[index] = newImagePromise

    return newImagePromise
  }
}
