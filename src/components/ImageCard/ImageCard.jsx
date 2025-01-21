import s from './ImageCard.module.css'

const ImageCard = ({ card: { urls, alt_description }, openModal }) => {
  return (
    <div>
          <img src={urls.small} alt={alt_description} className={s.img} onClick={openModal} />
    </div>
  )
}

export default ImageCard
