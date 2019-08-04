import { Loader } from '../src/loader.js'

describe('Loader', () => {
  describe('parse', () => {
    it('string => array', () => {
      const path = 'path1'
      const result = ['path1']
      expect(Loader.parse(path)).toEqual(result)
    })

    it('array => array', () => {
      const path = ['path1']
      const result = ['path1']
      expect(Loader.parse(path)).toEqual(result)
    })

    it('array(2) => array(2)', () => {
      const path = ['path1', 'path2']
      const result = ['path1', 'path2']
      expect(Loader.parse(path)).toEqual(result)
    })

    it('brace expansion => array(1)', () => {
      const path = 'path{1..1}'
      const result = ['path1']
      expect(Loader.parse(path)).toEqual(result)
    })

    it('brace expansion => array(2)', () => {
      const path = 'path{1..2}'
      const result = ['path1', 'path2']
      expect(Loader.parse(path)).toEqual(result)
    })

    it('brace expansion => zero padding', () => {
      const path = 'path{01..1}'
      const result = ['path01']
      expect(Loader.parse(path)).toEqual(result)
    })

    it('brace expansion => zero padding (look first brace)', () => {
      const path = 'path{1..01}'
      const result = ['path1']
      expect(Loader.parse(path)).toEqual(result)
    })

    it('brace expansion => zero padding (ok overflow)', () => {
      const path = 'path{9..11}'
      const result = ['path9', 'path10', 'path11']
      expect(Loader.parse(path)).toEqual(result)
    })

    it('brace expansion => array(2) => array(4)', () => {
      const path = ['path{03..04}', 'hage', 'path{01..02}']
      const result = ['path03', 'path04', 'hage', 'path01', 'path02']
      expect(Loader.parse(path)).toEqual(result)
    })
  })
})
