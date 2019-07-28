import { Util } from './util.js'

export class Loader {
  static parse (paths) {
    const arrayPaths = Util.toArray(paths)

    const results = arrayPaths.flatMap((path) => {
      return this.braceExpansion(path)
    })

    return results
  }

  static braceExpansion (path) {
    const matchObject = path.match(/{(\d+)\.\.(\d+)}/)

    if (matchObject === null) {
      return [path]
    }

    const matchString = matchObject[0]
    const paddingSize = matchObject[1].length
    const paddingZero = Util.numStr('0', paddingSize)
    const startPage = Number.parseInt(matchObject[1], 10)
    const endPage = Number.parseInt(matchObject[2], 10)
    const results = []

    for (let page = startPage; page <= endPage; page++) {
      const strPage = page.toString()
      const strPageLength = strPage.length

      let paddingPage

      if (strPageLength < paddingSize) {
        paddingPage = (paddingZero + page).slice(-paddingSize)
      }
      else {
        paddingPage = strPage
      }

      const resultPath = path.replace(matchString, paddingPage)
      results.push(resultPath)
    }

    return results
  }
}
