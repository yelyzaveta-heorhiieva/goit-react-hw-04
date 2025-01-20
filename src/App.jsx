import { useState, useEffect } from 'react'
import './App.css'
import SearchBar from './components/SearchBar/SearchBar'
import ImageGallery from './components/ImageGallery/ImageGallery'
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn'
import ImageModal from './components/ImageModal/ImageModal'
import Loader from './components/Loader/Loader'
import ErrorMessage from './components/ErrorMessage/ErrorMessage'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';


function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const API = `https://api.unsplash.com/search/photos/?client_id=${import.meta.env.VITE_API_KEY}`;

  const handleSubmit = async (evt) => {
    setImages([]);
    evt.preventDefault();
    const [input] = evt.target.elements;
    setSearchValue(input.value.trim())
  const searchInputValue = input.value.trim();
   if (searchInputValue ==='') {
     return toast.error("Please enter a request")
   }
    const photos = await fetchImages(searchInputValue, page);
    setImages(photos)
   evt.target.reset();
  };

  async function fetchImages(searchParam, searchPage) {
    try {
      setLoading(true);
      const response = await axios.get(API, {
        params: {
          query: searchParam,
          page: searchPage,
          per_page: 20
        }
      });

      console.log(response.data);
      return response.data
    } catch (error) {
         setError(true);
      } finally {
      setLoading(false);
      }
  }

 const resetPage = () => {
    setPage(1);
 }
  
 const changePage = () => {
        setPage((prevPage) => prevPage + 1);
 };
  
  useEffect(() => {
    if (page > 1) {
      const handleClick = async () => {
    const morePhotos = await fetchImages(searchValue, page);
        setImages({...images, ...morePhotos})
      }      
   handleClick() }
  }, [page])

  return (
    <>
      <SearchBar onSubmit={handleSubmit} onLoad={loading} onReset={resetPage} />
      {images.total > 0 && <ImageGallery data={images} />}
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {images.total > 0 && images.total_pages > page && <LoadMoreBtn onClick={changePage} />}
      <ImageModal />
    </>
  )
}

export default App
