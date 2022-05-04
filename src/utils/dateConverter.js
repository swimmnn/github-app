const options = {
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric'
}

export const getDate = (str) => {
  let date = new Date(str)
  return date.toLocaleString('ru', options)
}