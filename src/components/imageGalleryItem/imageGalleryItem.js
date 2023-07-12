const ImageGalleryItem = ({ imadeWeb, imageLarge, imageId }) => {
    return (
        <li key={imageId} className="ImageGalleryItem">
            <a href={imageLarge}>
                <img src={imadeWeb} alt="imageSearch" className="ImageGalleryItem-image" />
            </a>
        </li>
    )
}

export default ImageGalleryItem;