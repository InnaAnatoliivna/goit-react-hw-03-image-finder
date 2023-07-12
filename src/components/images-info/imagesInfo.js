import api from 'components/service-api/pixabay-api';
import { Component } from 'react';
import ImageGallery from 'components/imageGallery/imageGallery';
import Loader from 'components/loader/loader';

export default class ImagesInfo extends Component {
    state = {
        results: null,
        error: null,
        status: false
    }//here we got 'searchQuery' as props from App

    async componentDidUpdate(prevProps, prevState) {
        const prevQuery = prevProps.searchQuery;
        const nextQuery = this.props.searchQuery;

        const { searchQuery } = this.props;
        if (prevQuery !== nextQuery) {
            this.setState({ status: true })

            try {
                const results = await api.fetchImages(searchQuery);
                this.setState({ results: results.hits });
            } catch (error) {
                this.setState({ error });
            } finally {
                this.setState({ status: false })
            }
        }
    }

    render() {
        const { results, status } = this.state;

        return (
            <div className='images-info'>
                {this.props.searchQuery === '' && <h2>Please enter a query to search for images!</h2>}
                {results && <ImageGallery arrayResults={results} />}
                {status && <Loader />}
            </div>
        );
    }
}