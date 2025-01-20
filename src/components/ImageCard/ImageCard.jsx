import React from 'react'
import s from './ImageCard.module.css'

const ImageCard = ({ card: {urls, alt_description}}) => {
  return (
    <div>
          <img src={urls.small} alt={alt_description} className={s.img} />
    </div>
  )
}

export default ImageCard
