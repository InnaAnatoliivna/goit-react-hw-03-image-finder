import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './searchbar/searchbar';
import api from 'components/service-api/pixabay-api';
import { toast } from 'react-toastify';
import ImageGallery from 'components/imageGallery/imageGallery';
import Button from 'components/button/button';
import Loader from 'components/loader/loader';
import Modal from 'components/modal/modal';
export class App extends Component {
  state = {
    searchQuery: '',
    results: null,
    error: null,
    page: 0,
    showLoadMore: false,
    showLoader: false,
    showModal: false,
    selectedImage: null,
  }// we got state 'searchQuery' from 'searchbar.js' (searchQueryOriginal=searchQuery)

  async componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      const currentPage = nextQuery === prevQuery ? nextPage : 1;
      const prevResults = currentPage === 1 ? [] : prevState.results;
      this.setState({ showLoader: true, error: null });
      try {
        const data = await api.fetchImages(nextQuery, currentPage);
        const totalPage = Math.ceil(data.totalHits / data.hits.length)
        this.setState({
          results: [...prevResults, ...data.hits],
          showLoadMore: data.totalHits > 12 * currentPage,
          page: currentPage
        });
        !data.totalHits ? toast.error("No results found. Please try again!") : toast.success(`Hooray! We found ${data.totalHits} images`);
        nextPage >= totalPage && toast.warning("We're sorry, but you've reached the end of search results!");
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ showLoader: false })
      }
    }
  }
  onFormSubmit = searchQueryOriginal => {
    this.setState({ searchQuery: searchQueryOriginal, page: 1 });
  }
  onLoadMore = () => {
    if (this.state.results) {
      this.setState(prevState => ({ page: prevState.page + 1 }));
    }
  }
  handleKeydown = e => {
    if (e.code === 'Escape') {
      this.setState({ showModal: false, selectedImage: null });
    }
  };
  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.setState({ showModal: false, selectedImage: null });
    }
  };
  onOpenModal = imageId => {
    const { results } = this.state;
    const selectedImage = results.find(image => image.id === imageId);
    this.setState({ selectedImage: selectedImage, showModal: true });
  }; // we got'imageId' from callback 'onOpenModal(imageId)' from 'imageGalleryItem.js'

  render() {
    const { results, showLoadMore, showLoader, showModal, selectedImage, searchQuery } = this.state;
    return (
      <div className='App'>
        <ToastContainer autoClose={5000} pauseOnHover theme="colored" />
        <Searchbar onSubmit={this.onFormSubmit} />
        {searchQuery === '' && <h2 className='empty'>Please enter a query to search for images!</h2>}
        {results && <ImageGallery arrayResults={results} key={results.id} onOpenModal={this.onOpenModal} />}
        {showLoadMore && <Button handleClick={this.onLoadMore}><span>Load More</span></Button>}
        {showLoader && <Loader />}
        {showModal && (
          <Modal
            onBackdropClose={this.handleBackdropClick}
            onKeydownClose={this.handleKeydown}
          >
            <img src={selectedImage.largeImageURL} alt="imageSearch" />
          </Modal>
        )}
      </div>
    );
  }
};
