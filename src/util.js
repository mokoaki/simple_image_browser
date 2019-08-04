export class Util {
  static trustPositiveInt (num) {
    const replacedNum = num.toString().replace(/[^\d-]/g, '')
    const parsedNum = Number.parseInt(replacedNum, 10)

    if (Number.isFinite(parsedNum) && parsedNum > 0) {
      return parsedNum
    }
    else {
      return 1
    }
  }

  static toArray (obj) {
    if (this.isTypeArray(obj)) {
      return obj
    }

    return [obj]
  }

  static numStr (str, num) {
    return (new Array(num)).fill(str).join('')
  }

  static isType (obj) {
    return Object.prototype.toString.call(obj)
  }

  static isTypePromise (obj) {
    return this.isType(obj) === '[object Promise]'
  }

  // static isTypeString (obj) {
  //   return this.isType(obj) === '[object String]'
  // }

  // static isTypeNumber (obj) {
  //   if (this.isType(obj) !== '[object Number]') {
  //     return false
  //   }

  //   if (window.isFinite(obj)) {
  //     return false
  //   }

  //   // Number.isFinite(new Number(1)) => false
  //   // if (Number.isFinite(obj)) {
  //   //   return false
  //   // }

  //   return true
  // }

  // static isTypeBoolean (obj) {
  //   return this.isType(obj) === '[object Boolean]'
  // }

  // static isTypeFunction (obj) {
  //   return this.isType(obj) === '[object Function]'
  // }

  // static isTypeObject (obj) {
  //   return this.isType(obj) === '[object Object]'
  // }

  static isTypeArray (obj) {
    return Array.isArray(obj)

    // if (this.isType(obj) === '[object Array]') {
    //   return true
    // }
  }

  // static isTypeUndefined (obj) {
  //   return obj === undefined
  // }

  // static isTypeNull (obj) {
  //   return obj === null
  // }

  // static isTypeNaN (obj) {
  //   if (this.isType(obj) !== '[object Number]') {
  //     return false
  //   }

  //   if (!window.isNaN(obj)) {
  //     return false
  //   }

  //   // Number.isNaN(new Number(NaN)) => false
  //   // if (Number.isNaN(obj)) {
  //   //   return false
  //   // }

  //   return true
  // }
}
