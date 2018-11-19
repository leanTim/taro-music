/**
 * 
 * @param {String} t  (ms)
 */
export function formateDuration (t) {
  return (function (t) {
    // s
    const durationS = Math.round(parseInt(t) / 1000)
    const m = Math.floor(durationS / 60)
    const s = durationS % 60
    return fill(m) + ':' + fill(s)
  })(t)

  function fill (data) {
    if (data.toString().length < 2) data = '0' + data
    return data
  }
}
