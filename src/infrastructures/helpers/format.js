export default {
  formatTimeDhm (number) {
    let t = ''
    let d = Math.trunc(number / 1440)
    number = number - d * 1440
    if (d > 0) {
      t += d + 'd '
    }
    let h = Math.trunc(number / 60)
    if (h === 0) {
      t += number + 'm'
    } else {
      let p = number - h * 60
      if (p === 0) {
        t += h + 'h'
      } else {
        t += h + 'h ' + p + 'm'
      }
    }
    return t
  },

  formatMoney (value, seperate = ',', postfix = '', prefix = '') {
    if (value) {
      value = value + ''
      return postfix + value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, seperate) + prefix
    } else return ''
  }
}
