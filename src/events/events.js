import { ResizeWindow } from './resize_window.js'
import { HashChangeWindow } from './hash_change_window.js'
import { KeydownWindow } from './keydown_window.js'
import { ClickWindow } from './click_window.js'
import { MousemoveWindow } from './mousemove_window.js'

export class Events {
  constructor (imageList) {
    this.imageList = imageList
    this.resizeWindow = new ResizeWindow(this)
    this.hashChangeWindow = new HashChangeWindow(this)
    this.keydownWindow = new KeydownWindow(this)
    this.clickWindow = new ClickWindow(this)
    this.mousemoveWindow = new MousemoveWindow(this)
  }

  addEventListener (target, type, listener, options = {}) {
    const defaultOptions = {
      capture: true,
      passive: true,
      ...options
    }

    target.addEventListener(type, listener, defaultOptions)
  }

  movePageDistance (event) {
    return (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) ? 10 : 1
  }

  MouseCursorPosition (event) {
    return event.clientX > (window.innerWidth / 2)
  }

  pageMoveTo (movePageDistance, params) {
    const nextPageNum = this.imageList.page() + movePageDistance
    this.imageList.page(nextPageNum, params)
  }

  next (event) {
    const movePageDistance = this.movePageDistance(event)
    this.pageMoveTo(movePageDistance, { block: 'start' })
  }

  previous (event) {
    const movePageDistance = this.movePageDistance(event)
    this.pageMoveTo(-movePageDistance, { block: 'end' })
  }
}
