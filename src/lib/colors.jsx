const determineTextColor = (color) => {
  if (color === 'blue') {
    return '#0284c7'
  } else if (color === 'red') {
    return '#dc2626'
  } else if (color === 'orange') {
    return '#f59e0b'
  } else if (color === 'purple') {
    return '#a855f7'
  } else if (color === 'green') {
    return '#16a34a'
  } else if (color === 'grey') {
    return '#475569'
  } else if (color === 'yellow') {
    return '#fde047'
  }
}

export default determineTextColor