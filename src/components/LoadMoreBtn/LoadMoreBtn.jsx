import s from './LoadMoreBtn.module.css'

const LoadMoreBtn = ({ onClick }) => {
  return (
    <>
      <button type='button' onClick={onClick} className={s.btn}>Load more</button>
    </>
  )
}

export default LoadMoreBtn
