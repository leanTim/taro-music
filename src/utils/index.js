/**
 * 毫秒时间转换成分(03:20)
 * @param {String} t  (ms)
 */
export function transformMsToMin (t) {
  return (function (t) {
    // s
    const durationS = Math.round(parseFloat(t) / 1000)
    const m = Math.floor(durationS / 60)
    const s = durationS % 60
    return fill(m) + ':' + fill(s)
  })(t)

  function fill (data) {
    if (data.toString().length < 2) data = '0' + data
    return data
  }
}

//转换歌词字符串为数组
export function parseLrc(lrc_content) {
  let now_lrc = [];
  let lrc_row = lrc_content.split("\n");
  let scroll = true;
  for (let i in lrc_row) {
    if ((lrc_row[i].indexOf(']') == -1) && lrc_row[i]) {
      now_lrc.push({ lrc: lrc_row[i] });
    } else if (lrc_row[i] != "") {
      var tmp = lrc_row[i].split("]");
      for (let j in tmp) {
        scroll = false
        let tmp2 = tmp[j].substr(1, 8);
        tmp2 = tmp2.split(":");
        let lrc_sec = parseInt(tmp2[0] * 60 + tmp2[1] * 1);
        if (lrc_sec && (lrc_sec > 0)) {
          let lrc = (tmp[tmp.length - 1]).replace(/(^\s*)|(\s*$)/g, "");
          lrc && now_lrc.push({ lrc_sec: lrc_sec, lrc: lrc });
        }
      }
    }
  }
  if (!scroll) {
    now_lrc.sort(function (a, b) {
      return a.lrc_sec - b.lrc_sec;
    });
  }
  return {
    now_lrc: now_lrc,
    scroll: scroll
  };
}

export function formatCmtCount (count) {
  let num = parseInt(count)
  if (num <= 999) {
    return num + ''
  } else {
    return '999+'
  }
}
