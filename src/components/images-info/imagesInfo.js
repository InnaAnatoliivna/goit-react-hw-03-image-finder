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
        selectedImage: null
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
            this.setState({ status: true, error: null, page: 1 })
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

    getSelectImg = selectedImage => {
        this.setState({ selectedImage: selectedImage })
    }//'selectedImage' from imageGalleryItem.js to 'this.state',
    //=> and next pass to props in  '<ModalContainer/>' and there
    // use this value

    render() {
        const { results, status, isLoadMore } = this.state;
        return (
            <div>
                {this.props.searchQuery === '' && <h2 className='empty'>Please enter a query to search for images!</h2>}

                {results && <ImageGallery arrayResults={results} key={results.id} getSelectImg={this.getSelectImg} />}

                {/* {results.length < 0 && (<h2 className='empty'>No results found. Please try again!</h2>)} */}

                <ModalContainer showModal={this.isModal} results={results} selectedImage={this.state.selectedImage} />

                {status && <Loader />}

                {results && isLoadMore &&
                    <Button handleClick={this.onLoadMore}>
                        <span>Load More</span>
                    </Button>}
            </div>
        );
    }
}
//========================================================
// import api from 'components/service-api/pixabay-api';
// import { Component } from 'react';
// import ImageGallery from 'components/imageGallery/imageGallery';
// import Loader from 'components/loader/loader';
// import Button from 'components/button/button';
// import ModalContainer from 'components/modal-container/modalContainer';

// export default class ImagesInfo extends Component {
//     state = {
//         results: null,
//         error: null,
//         status: 'idle',
//         page: 1,
//         isLoadMore: false,
//         selectedImage: null
//     }//here we got 'searchQuery' as props from App

//     onLoadMore = () => {
//         if (this.state.results) {
//             this.setState(prevState => ({
//                 results: [...prevState.results, ...this.state.results],
//                 page: prevState.page + 1, //+
//                 isLoadMore: true,
//                 status: 'resolved',
//             }));
//         } else {
//             this.setState({ isLoadMore: false, status: 'resolved' });
//         }
//     }


//     async componentDidUpdate(prevProps, prevState) {
//         const prevQuery = prevProps.searchQuery;
//         const nextQuery = this.props.searchQuery;
//         const prevPage = prevState.page;
//         const nextPage = this.state.page;
//         const { searchQuery } = this.props;
//         const { page } = this.state;

//         if (prevQuery !== nextQuery || prevPage !== nextPage) {
//             this.setState({ status: 'pending' })
//             try {
//                 const results = await api.fetchImages(searchQuery, page);
//                 this.setState({ results: results.hits });
//                 const perPage = results.hits.length
//                 const totalPage = Math.ceil(results.totalHits / perPage)
//                 if (nextPage >= totalPage) {
//                     this.setState({ isLoadMore: false })
//                 } else if (prevQuery !== nextQuery) {
//                     this.setState({ isLoadMore: true })
//                 }
//             } catch (error) {
//                 this.setState({ error, status: 'rejected' });
//             } finally {
//                 this.setState({ status: 'resolved' })
//             }
//         }
//     }

//     getSelectImg = selectedImage => {
//         this.setState({ selectedImage: selectedImage })
//     }//'selectedImage' from imageGalleryItem.js to 'this.state',
//     //=> and next pass to props in  '<ModalContainer/>' and there
//     // use this value

//     render() {
//         const { results, status, isLoadMore } = this.state;
//         if (status === 'idle') {
//             return <h2 className='empty'>Please enter a query to search for images!</h2>

//         } else if (status === 'pending') {
//             return <Loader />

//         } else if (status === 'rejected') {
//             return <h2 className='empty'>Try again!</h2>

//         } else if (status === 'resolved') {
//             return (
//                 <>
//                     <ImageGallery arrayResults={results} getSelectImg={this.getSelectImg} />
//                     <ModalContainer showModal={this.isModal} results={results} selectedImage={this.state.selectedImage} />
//                     {isLoadMore && (<Button handleClick={this.onLoadMore}>
//                         <span>Load More</span></Button>)}
//                 </>
//             )
//         }
//     }

// }