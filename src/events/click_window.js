export class ClickWindow {
  constructor (events) {
    this.events = events
    this.page = this.events.page

    events.addEventListener(window, 'click', (event) => {
      this.onClick(event)
    })
  }

  onClick (event) {
    const MouseCursorPosition = this.events.MouseCursorPosition(event)

    if (MouseCursorPosition) {
      this.events.next(event)
    }
    else {
      this.events.previous(event)
    }
  }
}
