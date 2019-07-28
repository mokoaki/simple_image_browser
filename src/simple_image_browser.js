import { ImageList } from './image_list.js'

class SimpleImageBrowser {
  constructor () {
    this.imageList = new ImageList()
  }

  images (paths, params) {
    return this.imageList.images(paths, params)
  }

  page (page, params) {
    return this.imageList.page(page, params)
  }
}

window.SimpleImageBrowser = new SimpleImageBrowser()
