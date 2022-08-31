export const getImage = async (image) => {
  const data = await fetch('/images/' + image)

  return data
}