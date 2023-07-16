const ImageGalleryItem = ({ imageWeb, imageId, onOpenModal, getFilmId }) => {
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
