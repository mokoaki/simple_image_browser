export class MousemoveWindow {
  constructor (events) {
    this.events = events
    this.page = this.events.page

    this.events.addEventListener(window, 'mousemove', (event) => {
      this.onMousemove(event)
    })
  }

  onMousemove (event) {
    document.body.className = this.events.MouseCursorPosition(event) ? 'e_resize' : 'w_resize'
  }
}
