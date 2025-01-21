import toast, { Toaster } from 'react-hot-toast';
import s from './SearchBar.module.css';
import { BsSearch } from "react-icons/bs";

const SearchBar = ({ onSubmit, onLoad}) => {
  return (
   <header className={s.wrapper}>
  <form onSubmit={onSubmit} className={s.form}>
    <input
      type="text"
      autoComplete="off"
      autoFocus
          placeholder="Search images and photos"
          className={s.input}
              />
              
    <button type="submit" disabled={onLoad} className={s.btn}><BsSearch /></button>
  </form>
      <Toaster position="top-right" reverseOrder={false} />
</header>

  )
}

export default SearchBar
