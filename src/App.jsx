import { useState, useEffect } from 'react'
import './App.css'
import SearchBar from './components/SearchBar/SearchBar'
import ImageGallery from './components/ImageGallery/ImageGallery'
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn'
import ImageModal from './components/ImageModal/ImageModal'
import Loader from './components/Loader/Loader'
import ErrorMessage from './components/ErrorMessage/ErrorMessage'
import toast from 'react-hot-toast';
import { fetchImages } from './services/api';

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [item, setItem] = useState('')


  useEffect(() => {
    if (query) {
      const getImages = async (searchParam, searchPage) => {
        try {
          setLoading(true);
          setError(false);
          const { total_pages, results } = await fetchImages(searchParam, searchPage);
          if (!results.length) {
            return toast.error('No images found for your request');
          }
          setTotalPages(total_pages);
          setImages((prev) => [...prev, ...results])
        } catch (error) {
         setError(true);
      } finally {
      setLoading(false);
      }
    } 
      getImages(query, page);
    }
  }, [query, page])

  const onSubmit = (newQuery) => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  
  const openModal = (evt) => {
    setIsOpen(true);
    setItem(images.filter(image => image.urls.small === evt.target.src));
  }
 

  return (
    <>
      <SearchBar onSubmit={onSubmit} onLoad={loading} />
      {!error && images.length > 0 && <ImageGallery data={images} openModal={openModal} />}
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {!error && images.length > 0 && totalPages > page && <LoadMoreBtn onClick={() => setPage(prev => prev + 1)} />}
      <ImageModal onOpen={modalIsOpen} closeModal={() => setIsOpen(false)} data={images} item={item} />
    </>
  )
}

export default App
