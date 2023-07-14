import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './searchbar/searchbar';
import ImagesInfo from './images-info/imagesInfo';

export class App extends Component {
  state = {
    searchQueryDuplicate: '',
  }// we got this state from 'searchbar.js' (searchQueryOriginal=searchQueryDuplicate)

  onFormSubmit = searchQueryOriginal => {
    this.setState({ searchQueryDuplicate: searchQueryOriginal });
  }

  render() {
    const { searchQueryDuplicate } = this.state;

    return (
      <div className='App'>
        <ToastContainer autoClose={4000} pauseOnHover theme="colored" />
        <Searchbar onSubmit={this.onFormSubmit} />
        <ImagesInfo searchQuery={searchQueryDuplicate} />
      </div>
    );
  }
};
