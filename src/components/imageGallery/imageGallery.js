import ImageGalleryItem from 'components/imageGalleryItem/imageGalleryItem';

const ImageGallery = ({ arrayResults, onOpenModal }) => {

    return (
        <ul className="ImageGallery">
            {arrayResults.map(image => {
                return (
                    <ImageGalleryItem
                        key={image.id}
                        imageId={image.id}
                        imageWeb={image.webformatURL}
                        onOpenModal={onOpenModal}
                    />
                )
            })}
        </ul>
    )
}

export default ImageGallery;