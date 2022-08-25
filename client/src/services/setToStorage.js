export const setToStorage = (key, value) => (
  localStorage.setItem(key, JSON.stringify(value))
)
