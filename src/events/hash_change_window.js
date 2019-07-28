export class HashChangeWindow {
  constructor (events) {
    this.imageList = events.imageList
    this.locationHash = this.imageList.locationHash

    events.addEventListener(window, 'hashchange', (_event) => {
      this.onHashchange()
    })
  }

  // 手動でアドレスバーのhashを変更した時のみの処理であり
  // この時のみアドレスバーのhashが優先して使われ
  // 瞬時に（同期的に）変換される
  onHashchange () {
    console.log('HashChangeWindow', 'onHashchange')

    const hash = this.locationHash.hash

    // locationHash.hashは読み込んだ時点でもう書き換わっているので不要
    // this.locationHash.hash = hash
    this.imageList.page(hash, { block: 'start' })
  }
}
