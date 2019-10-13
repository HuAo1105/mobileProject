// 专门用来本地存储设置
export const setItem = (user, data) => {
  return window.localStorage.setItem(user, JSON.stringify(data))
}
export const getItem = user => {
  return JSON.parse(window.localStorage.getItem(user))
}
export const removeItem = user => {
  window.localStorage.removeItem(user)
}
