import { Component } from 'react';
import Modal from 'components/modal/modal';

class ModalContainer extends Component {
    state = {
        showModal: true,
        selectedImage: null
    }

    //handler on the card with the image is hang in the 'imageGalleryItem.js'

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeydown);
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.selectedImage !== this.props.selectedImage) {
            this.setState({
                selectedImage: this.props.selectedImage,
            });
            this.toggleModal()
        }
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeydown);
    }
    handleKeydown = (e) => {
        if (e.code === 'Escape') {
            this.toggleModal();
        }
    }
    handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            this.toggleModal()
        }
    }

    toggleModal = () => {
        this.setState({ showModal: !this.state.showModal })
    }

    render() {
        const { showModal, selectedImage } = this.state;
        return (
            <>
                {selectedImage && showModal &&
                    <Modal
                        onBackdropClose={this.handleBackdropClick}>
                        <div>
                            <img src={selectedImage.largeImageURL} alt="imageSearch" />
                        </div>
                    </Modal>}
            </>
        )
    }
}
export default ModalContainer;




    // onOpenModal = () => {
    //     // const { results } = this.props;
    //     //     const selectedImage = results.find((image) => image.id === getImageId);
    //     this.setState({
    //         selectedImage: this.props.selectedImage,
    //         showModal: true
    //     });
    // }