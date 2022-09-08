export const getRelativeCurrentDate = (dateToCompare) => {
  const formatter = new Intl.RelativeTimeFormat('en')

  const diff = new Date() - new Date(dateToCompare)

  switch(true) {
    
    case (diff >= 604800):
      return (diff / 604800 + 'weeks ago')

    case (diff >= 86400):
      return (diff / 86400 + 'days ago')

    case (diff >= 3600):
      return (diff / 3600 + 'hour ago')

    case (diff >= 60):
      return (diff / 60 + 'minute ago')
  }
}