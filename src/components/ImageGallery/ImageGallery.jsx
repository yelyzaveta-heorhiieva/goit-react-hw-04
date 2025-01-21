import React from 'react'
import ImageCard from '../ImageCard/ImageCard'
import s from './ImageGallery.module.css'

const ImageGallery = ({data, openModal}) => {
  return (
   <ul className={s.list}>
      {data.map(item => <li key={item.id}><ImageCard card={item} openModal={openModal} /></li>)}
</ul>
  )
}

export default ImageGallery
