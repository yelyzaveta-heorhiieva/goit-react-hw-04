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
  const [fetchTrigger, setFetchTrigger] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const API = `https://api.unsplash.com/search/photos/?client_id=${import.meta.env.VITE_API_KEY}`;

  useEffect(() => {
    if (searchValue) {
      fetchImages(searchValue, page);
    }
  }, [fetchTrigger, page])

  const handleSubmit = async (evt) => {
    setImages([]);
    evt.preventDefault();
    const [input] = evt.target.elements;
    if (input.value.trim() === '') {
     return toast.error("Please enter a request")
    }
    setPage(1);
    setSearchValue(input.value.trim());
    setFetchTrigger(prev => !prev);
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
      setTotalPages(response.data.total_pages);
      setImages((prev) => [...prev, ...response.data.results])
    } catch (error) {
         setError(true);
      } finally {
      setLoading(false);
      }
  }
  
 const loadMore = () => {
   setPage((prevPage) => prevPage + 1);
   };

  return (
    <>
      <SearchBar onSubmit={handleSubmit} onLoad={loading} />
      {images.length > 0 && <ImageGallery data={images} />}
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {images.length > 0 && totalPages > page && <LoadMoreBtn onClick={loadMore} />}
      <ImageModal />
    </>
  )
}

export default App
