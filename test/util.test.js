import { Util } from '../src/util.js'

describe('Util', () => {
  describe('trustPositiveInt', () => {
    it('a => 1', () => {
      const hash = '#a'
      const result = 1
      expect(Util.trustPositiveInt(hash)).toBe(result)
    })

    it('-10 => 1', () => {
      const hash = '#-10'
      const result = 1
      expect(Util.trustPositiveInt(hash)).toBe(result)
    })

    it('-1.0 => 1', () => {
      const hash = '#-1.0'
      const result = 1
      expect(Util.trustPositiveInt(hash)).toBe(result)
    })

    it('1.0 => 10', () => {
      const hash = '#1.0'
      const result = 10
      expect(Util.trustPositiveInt(hash)).toBe(result)
    })

    it('2 => 2', () => {
      const hash = '#2'
      const result = 2
      expect(Util.trustPositiveInt(hash)).toBe(result)
    })
  })

  describe('toArray', () => {
    it('string => array', () => {
      const obj = 'string'
      const result = ['string']
      expect(Util.toArray(obj)).toEqual(result)
    })

    it('array => same object', () => {
      const obj = ['string']
      const result = obj
      expect(Util.toArray(obj)).toBe(result)
    })
  })

  describe('numStr', () => {
    it('a * 1 = a', () => {
      const params = ['a', 1]
      const result = 'a'
      expect(Util.numStr(...params)).toBe(result)
    })

    it('a * 2 = aa', () => {
      const params = ['a', 2]
      const result = 'aa'
      expect(Util.numStr(...params)).toBe(result)
    })
  })

  describe('isType', () => {
    it('itumono isType', () => {
      const obj = 'string'
      const result = '[object String]'
      expect(Util.isType(obj)).toBe(result)
    })
  })

  describe('isTypePromise', () => {
    it('itumono isTypePromise', () => {
      const obj = new Promise(() => { })
      expect(Util.isTypePromise(obj)).toBe(true)
    })

    it('itumono isTypePromise', () => {
      const obj = ''
      expect(Util.isTypePromise(obj)).toBe(false)
    })
  })
})
