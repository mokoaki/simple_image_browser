export class KeydownWindow {
  constructor (events) {
    this.events = events

    this.NEXT_PAGE_KEYS = [
      'Enter', // [Chrome, Firefox, Safari, Opera, MS-IE11, MS-Edge25]
      'ArrowRight', // [Chrome, Firefox, Safari, Opera]
      'Right' // [MS-IE11, MS-Edge25]
    ]

    this.PREVIOUS_PAGE_KEYS = [
      'ArrowLeft', // [Chrome, Firefox, Safari, Opera]
      'Left' // [MS-IE11, MS-Edge25]
    ]

    events.addEventListener(window, 'keydown', (event) => {
      this.onKeydown(event)
    })
  }

  onKeydown (event) {
    const receivedKey = event.key

    if (this.NEXT_PAGE_KEYS.includes(receivedKey)) {
      this.events.next(event)
    }
    else if (this.PREVIOUS_PAGE_KEYS.includes(receivedKey)) {
      this.events.previous(event)
    }
  }
}
