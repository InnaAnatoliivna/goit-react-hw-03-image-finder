import api from 'components/service-api/pixabay-api';
import { Component } from 'react';
import { toast } from 'react-toastify';
import ImageGallery from 'components/imageGallery/imageGallery';
import Loader from 'components/loader/loader';
import Button from 'components/button/button';
import Modal from 'components/modal/modal';

export default class ImagesInfo extends Component {
    state = {
        results: null,
        error: null,
        page: 1,
        showLoader: false,
        showLoadMore: false,
        showModal: false,
        selectedImage: null
    }//here we got 'searchQuery' as props from App

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeydown);
    }
    async componentDidUpdate(prevProps, prevState) {
        const prevQuery = prevProps.searchQuery;
        const nextQuery = this.props.searchQuery;
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
                !data.totalHits && toast.warning("No results found. Please try again!")
                nextPage >= totalPage && toast.error("We're sorry, but you've reached the end of search results!");
            } catch (error) {
                this.setState({ error });
            } finally {
                this.setState({ showLoader: false })
            }
        }
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeydown);
    }
    handleKeydown = (e) => {
        if (e.code === 'Escape') {
            this.setState({ showModal: false, selectedImage: null });
        }
    }
    handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            this.setState({ showModal: false, selectedImage: null });
        }
    }
    onOpenModal = imageId => {
        const selectedImage = this.state.results.find((image) => { return image.id === imageId });
        this.setState({ selectedImage: selectedImage, showModal: true });
    }//'selectedImage' from imageGalleryItem.js to 'this.state',

    onLoadMore = () => {
        if (this.state.results) {
            this.setState(prevState => ({
                page: prevState.page + 1,
            }));
        }
    }

    render() {
        const { results, showLoader, showLoadMore, showModal, selectedImage } = this.state;
        return (
            <div>
                {this.props.searchQuery === '' && <h2 className='empty'>Please enter a query to search for images!</h2>}
                {results && <ImageGallery arrayResults={results} key={results.id} onOpenModal={this.onOpenModal} />}
                {showModal && <Modal onBackdropClose={this.handleBackdropClick}>
                    <img src={selectedImage.largeImageURL} alt="imageSearch" /></Modal>}
                {showLoader && <Loader />}
                {showLoadMore && <Button handleClick={this.onLoadMore}>
                    <span>Load More</span></Button>}
            </div>
        );
    }
}