import api from 'components/service-api/pixabay-api';
import { Component } from 'react';
import ImageGallery from 'components/imageGallery/imageGallery';
import Loader from 'components/loader/loader';
import Button from 'components/button/button';
import smoothScroll from 'components/smooth-scroll/smooth-scroll';
import ModalContainer from 'components/modal-container/modalContainer';
// import Modal from 'components/modal/modal';
// import ImageGalleryItem from 'components/imageGalleryItem/imageGalleryItem';

export default class ImagesInfo extends Component {
    state = {
        results: null,
        error: null,
        status: false,
        page: 1,
        isLoadMore: false,
        // isModal: false
    }//here we got 'searchQuery' as props from App

    onLoadMore = () => {
        this.setState(prevState => ({ page: prevState.page + 1 })
        )
    }

    async componentDidUpdate(prevProps, prevState) {
        const prevQuery = prevProps.searchQuery;
        const nextQuery = this.props.searchQuery;
        const prevPage = prevState.page;
        const nextPage = this.state.page;
        const { searchQuery } = this.props;
        const { page } = this.state;

        if (prevQuery !== nextQuery || prevPage !== nextPage) {
            this.setState({ status: true })
            try {
                const results = await api.fetchImages(searchQuery, page);
                this.setState({ results: results.hits });
                const perPage = results.hits.length
                const totalPage = Math.ceil(results.totalHits / perPage)
                if (nextPage >= totalPage) {
                    this.setState({ isLoadMore: false })
                } else if (prevQuery !== nextQuery) {
                    this.setState({ isLoadMore: true })
                }
                smoothScroll();
            } catch (error) {
                this.setState({ error });
            } finally {
                this.setState({ status: false })
            }
        }
    }

    // isModal = (showModal) => {
    //     this.setState({ isModal: showModal })

    // }

    render() {
        const { results, status, isLoadMore, isModal } = this.state;
        return (
            <div className='images-info'>
                {this.props.searchQuery === '' && <h2 className='empty'>Please enter a query to search for images!</h2>}
                {/* {results && (
                    <>
                        <ImageGallery arrayResults={results} />
                        <ModalContainer showModal={this.isModal} results={results} />
                    </>)} */}
                {results && <ImageGallery arrayResults={results} />}
                {/* {isModal && <ModalContainer showModal={this.isModal} results={results} />} */}
                <ModalContainer showModal={this.isModal} results={results} />
                {status && <Loader />}
                {results && isLoadMore &&
                    <Button handleClick={this.onLoadMore}>
                        <span>Load More</span>
                    </Button>}
                {/* <Modal onClose={this.toogleModal}><ImageGalleryItem /></Modal> */}
            </div>
        );
    }
}