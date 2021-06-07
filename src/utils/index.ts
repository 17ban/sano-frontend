/**
 * 对象转 url 参数
 * @author https://segmentfault.com/a/1190000016416023
 * @author 17ban
 */
export function queryStr(query: Record<string, any>, isPrefix = true) {
  const result = []
  for (const key of Object.keys(query)) {
    let value = query[key]
    // 去掉为空的参数
    if (['', undefined, null].includes(value))
      continue
    if (value instanceof Object)
      value = JSON.stringify(value)
    result.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
  }
  if (result.length)
    return (isPrefix ? '?' : '') + result.join('&')
  else
    return ''
}

/**
 * 时间戳格式化为字符串
 * @author https://www.jianshu.com/p/49fb78bca621
 * @author 17ban
 */
export function timeString(timeStamp: number, fmt = 'YYYY/mm/dd HH:MM:SS') {
  const date = new Date(timeStamp)
  type optKey = 'Y+' | 'm+' | 'd+' | 'H+' | 'M+' | 'S+'
  const opt: Record<optKey, string> = {
    'Y+': date.getFullYear().toString(), // 年
    'm+': (date.getMonth() + 1).toString(), // 月
    'd+': date.getDate().toString(), // 日
    'H+': date.getHours().toString(), // 时
    'M+': date.getMinutes().toString(), // 分
    'S+': date.getSeconds().toString(), // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  }
  for (const k of Object.keys(opt)) {
    const ret = new RegExp(`(${k})`).exec(fmt)
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length === 1)
        ? (opt[<optKey>k])
        : opt[<optKey>k].padStart(ret[1].length, '0'))
    }
  }
  return fmt
}

/**
 * 滚动到目标位置。
 * @param x 目标位置的横坐标
 * @param y 目标位置的纵坐标
 * @param duration 滚动动画的持续时长
 */
export function goto(x: number, y: number, duration: number) {
  function _f(x: number, e = 3) {
    if (x >= 0 && x <= 1) return Math.pow(x, e)
    else if (x > 1 && x <= 2) return 2 - Math.pow((2 - x), e)
    else throw new Error('x is out of range: [0, 2]')
  }
  function f(x: number, x_max: number, y_max: number, e = 3) {
    const x_rate = 2 / x_max
    const y_rate = y_max / 2
    return _f(x * x_rate, e) * y_rate
  }

  const [start_x, start_y] = [window.pageXOffset, window.pageYOffset]
  const [dx, dy] = [x - start_x, y - start_y]
  let start_time: number | null = null

  return new Promise<void>((resolve) => {
    function step(timestamp: number) {
      start_time = start_time || timestamp
      const progress = timestamp - start_time
      if (progress < duration && (window.pageXOffset !== x || window.pageYOffset !== y)) {
        window.scrollTo(
          start_x + f(progress, duration, dx),
          start_y + f(progress, duration, dy),
        )
        window.requestAnimationFrame(step)
      }
      else {
        window.scrollTo(x, y)
        resolve()
      }
    }
    window.requestAnimationFrame(step)
  })
}

export function delay(time?: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), time)
  })
}

export function scrollIntoElement(selector: string) {
  const element = document.querySelector(selector)
  if (element)
    element.scrollIntoView({ behavior: 'smooth' })
}

export function formDataToObj(formData: FormData) {
  const obj: Record<string, FormDataEntryValue> = { }
  formData.forEach((value, key) => {
    obj[key] = value
  })
  return obj
}
