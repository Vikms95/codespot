export const getImage = async (image) => {
  const response = await fetch('/images/' + image)

  const data = await response.json()
  return data
}