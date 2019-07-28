export class ResizeWindow {
  constructor (events) {
    events.addEventListener(window, 'resize', (_event) => {
      this.resetWindowPadding()
    })

    // 速攻実行しておく
    this.resetWindowPadding()
  }

  resetWindowPadding () {
    const innerHeight = window.innerHeight
    document.body.style.paddingTop = innerHeight + 'px'
    document.body.style.paddingBottom = innerHeight + 'px'
  }
}
