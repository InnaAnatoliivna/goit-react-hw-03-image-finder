import ImageGalleryItem from 'components/imageGalleryItem/imageGalleryItem';

const ImageGallery = ({ arrayResults }) => {
    return (
        <ul className="ImageGallery">
            {arrayResults.map(image => {
                return (
                    <ImageGalleryItem
                        key={image.id}
                        imageId={image.id}
                        imageLarge={image.largeImageURL}
                        imadeWeb={image.webformatURL}
                    />
                )
            })}
        </ul>
    )
}

export default ImageGallery;