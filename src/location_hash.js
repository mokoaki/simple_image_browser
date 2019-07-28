import { Util } from './util.js'

export class LocationHash {
  get hash () {
    const hash = window.location.hash
    const trustHash = Util.trustPositiveInt(hash)
    this.hash = trustHash

    return trustHash
  }

  set hash (hash) {
    const trustHash = Util.trustPositiveInt(hash)
    try {
      window.history.replaceState(null, null, `#${trustHash}`)
    }
    catch (e) {
      console.error(e.name)
      console.error(e.message)
    }
  }
}
