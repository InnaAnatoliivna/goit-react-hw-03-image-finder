import PropTypes from 'prop-types';

const ImageGalleryItem = ({ imageWeb, imageId, onOpenModal }) => {
    const handleClick = () => {
        onOpenModal(imageId)
    };
    return (
        <li key={imageId} onClick={handleClick} className="ImageGalleryItem">
            <img
                src={imageWeb}
                alt="imageSearch"
                className="ImageGalleryItem-image"
            />
        </li>
    );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
    imageWeb: PropTypes.string,
    onOpenModal: PropTypes.func,
    imageId: PropTypes.number,
}