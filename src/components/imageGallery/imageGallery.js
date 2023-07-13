import ImageGalleryItem from 'components/imageGalleryItem/imageGalleryItem';

const ImageGallery = ({ arrayResults, onOpenModal }) => {
    return (
        <ul className="ImageGallery">
            {arrayResults.map(image => {
                return (
                    <ImageGalleryItem
                        key={image.id}
                        imageId={image.id}
                        imageLarge={image.largeImageURL}
                        imageWeb={image.webformatURL}
                    />
                )
            })}
        </ul>
    )
}

export default ImageGallery;