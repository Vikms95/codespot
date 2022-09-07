export const getImage = async (image) => {
  if(!image) return ''

  const data = await fetch('/images/' + image) 

  return data
}