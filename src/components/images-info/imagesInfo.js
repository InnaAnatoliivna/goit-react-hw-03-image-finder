import api from 'components/service-api/pixabay-api';
import { Component } from 'react';
import ImageGallery from 'components/imageGallery/imageGallery';
import Loader from 'components/loader/loader';
import Button from 'components/button/button';
import ModalContainer from 'components/modal-container/modalContainer';

export default class ImagesInfo extends Component {
    state = {
        results: null,
        error: null,
        status: false,
        page: 1,
        isLoadMore: false,
    }//here we got 'searchQuery' as props from App

    onLoadMore = () => {
        if (this.state.results) {
            this.setState(prevState => ({
                results: [...prevState.results, ...this.state.results],
                page: prevState.page + 1, //+
                isLoadMore: true
            }));
        } else {
            this.setState({ isLoadMore: false });
        }
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
            } catch (error) {
                this.setState({ error });
            } finally {
                this.setState({ status: false })
            }
        }
    }

    render() {
        const { results, status, isLoadMore, openModal } = this.state;
        return (
            <div className='images-info'>
                {this.props.searchQuery === '' && <h2 className='empty'>Please enter a query to search for images!</h2>}
                {results && <ImageGallery arrayResults={results} onOpenModal={openModal} />}
                {/* {isModal && <ModalContainer showModal={this.isModal} results={results} />} */}
                <ModalContainer showModal={this.isModal} results={results} />
                {status && <Loader />}
                {results && isLoadMore &&
                    <Button handleClick={this.onLoadMore}>
                        <span>Load More</span>
                    </Button>}
            </div>
        );
    }
}