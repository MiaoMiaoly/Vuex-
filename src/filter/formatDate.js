const week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']

function getTodayUnix () {
  const date = new Date()
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)
  return date.getTime()
}

export const formatDate = function (string) {
  let date = new Date(string)
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  const min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  let today = getTodayUnix()
  let timestamp = date.getTime()

  let content = ''
  if (timestamp > today) {
    content = hour + ':' + min
  } else if ((today - timestamp) / 86400000 <= 1) {
    content = '昨天' + '  ' + hour + ':' + min
  } else if ((today - timestamp) / 86400000 <= 7) {
    content = week[Math.floor((today - timestamp) / 86400000)] + '  ' + hour + ':' + min
  } else {
    content = date.getFullYear() + '年' + month + '月' + day + '日' + '  ' + hour + ':' + min
  }
  return content
}
