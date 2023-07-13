const ImageGalleryItem = ({
    imageWeb,
    // imageLarge,
    imageId,
    onOpenModal }) => {

    const handleClick = (event) => {
        // event.preventDefault();

        const getImageId = imageId;
        console.log(getImageId);
        onOpenModal(getImageId);
    }

    return (
        <li key={imageId} onClick={handleClick} className="ImageGalleryItem">
            <img src={imageWeb} alt="imageSearch" className="ImageGalleryItem-image" />
        </li>
    )
}

export default ImageGalleryItem;