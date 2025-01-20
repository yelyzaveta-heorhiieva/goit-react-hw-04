import toast, { Toaster } from 'react-hot-toast';

const SearchBar = ({ onSubmit, onLoad, onReset }) => {
    
  return (
   <header>
  <form onSubmit={onSubmit}>
    <input
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
              />
              
    <button type="submit" disabled={onLoad} onClick={onReset}>Search</button>
          </form>
          <Toaster
  position="top-center"
  reverseOrder={false}
/>
</header>

  )
}

export default SearchBar
