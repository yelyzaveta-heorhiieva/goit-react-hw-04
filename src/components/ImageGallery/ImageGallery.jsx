import React from 'react'
import ImageCard from '../ImageCard/ImageCard'
import s from './ImageGallery.module.css'

const ImageGallery = ({data}) => {
  return (
   <ul className={s.list}>
        {data.results.map(item => <li key={item.id}><ImageCard card={item} /></li>)}
</ul>
  )
}

export default ImageGallery
