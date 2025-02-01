import toast, { Toaster } from 'react-hot-toast';
import s from './SearchBar.module.css';
import { BsSearch } from "react-icons/bs";
import { useState } from 'react';

const SearchBar = ({ onSubmit, onLoad }) => {
  const [searchValue, setSearchValue] = useState('');
  
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (searchValue.trim() === '') {
     return toast.error("Please enter a request")
    }
    onSubmit(searchValue);
   evt.target.reset();
  };


  return (
   <header className={s.wrapper}>
  <form onSubmit={handleSubmit} className={s.form}>
    <input
      onChange={e => setSearchValue(e.target.value)} value={searchValue}
      type="text"
      autoComplete="off"
      autoFocus
          placeholder="Search images"
          className={s.input}
              />
              
    <button type="submit" disabled={onLoad} className={s.btn}><BsSearch /></button>
  </form>
</header>

  )
}

export default SearchBar
