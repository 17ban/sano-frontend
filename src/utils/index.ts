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

type SyncOrAsyncFunc<T = void> = () => T | PromiseLike<T>

function objectIsPromiseLike<T = any>(object: PromiseLike<T> | object): object is PromiseLike<T> {
  if (object instanceof Object)
    return (object as PromiseLike<T>).then instanceof Function
  return false
}

export async function execSyncOrAsyncFunc<T>(func: SyncOrAsyncFunc<T>) {
  const promiseOrValue = func()
  if (promiseOrValue instanceof Object && objectIsPromiseLike(promiseOrValue))
    return await promiseOrValue
  else
    return promiseOrValue
}

export async function tryFunc<T>(func?: SyncOrAsyncFunc<T>) {
  if (func)
    return await execSyncOrAsyncFunc(func)
}
