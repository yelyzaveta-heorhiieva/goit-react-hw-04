import Modal from 'react-modal';
import s from './ImageModal.module.css';
import { BiSolidLike } from "react-icons/bi";

Modal.setAppElement('#root');

const ImageModal = ({ onOpen, closeModal, item }) => {

  return (
    <>
      {item.length > 0 && item.map(({id, urls, likes, alt_description}) => <Modal
        isOpen={onOpen}
        key={id}
        onRequestClose={closeModal}
        className={s.modal}
        overlayClassName={s.overlay}
        contentLabel="Image card"
      >
        <img src={urls.regular} className={s.img} alt={alt_description}/>
        <p className={s.item}><BiSolidLike className={s.options}/> {likes}</p>
      </Modal>)}
    </>
  )
}

export default ImageModal
