import { Component } from 'react';
import Modal from 'components/modal/modal';
import ImageGalleryItem from 'components/imageGalleryItem/imageGalleryItem';

class ModalContainer extends Component {
    state = {
        showModal: false,
        selectedImage: null
    }
    // modal close==============================================>>
    componentDidMount() {
        console.log('modal did mount');
        window.addEventListener('keydown', this.handleKeydown);
    }
    componentWillUnmount() {
        console.log('modal will unmount');
        window.removeEventListener('keydown', this.handleKeydown);
    }
    handleKeydown = (e) => {
        if (e.code === 'Escape') {
            console.log('close modal on Escape');
            this.toggleModal();
        }
    }
    handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            this.toggleModal()
        }
    }
    //<<===========================================================
    toggleModal = () => {
        this.setState(prevState => ({ showModal: !prevState.showModal }))
    }

    onOpenModal = getImageId => {
        const { results } = this.props;
        console.log('hello in ON OPEN MODAL');
        const selectedImage = results.find((image) => image.id === getImageId);
        this.setState({ selectedImage, showModal: true });
        console.log(selectedImage);
    }

    render() {
        const { showModal, selectedImage } = this.state;
        return (
            <>
                {selectedImage && showModal &&
                    <Modal
                        onBackdropClose={this.handleBackdropClick}>
                        <ImageGalleryItem
                            imageId={selectedImage.id}
                            // imageLarge={selectedImage.largeImageURL}
                            imageWeb={selectedImage.largeImageURL}
                            onOpenModal={this.onOpenModal}
                        />
                    </Modal>}
            </>
        )
    }
}

export default ModalContainer;