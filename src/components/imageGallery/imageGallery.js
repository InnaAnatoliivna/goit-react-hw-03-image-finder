import ImageGalleryItem from 'components/imageGalleryItem/imageGalleryItem';

const ImageGallery = ({ arrayResults, onOpenModal, getFilmId }) => {

    return (
        <ul className="ImageGallery">
            {arrayResults.map(image => {
                return (
                    <ImageGalleryItem
                        key={image.id}
                        imageId={image.id}
                        imageWeb={image.webformatURL}
                        onOpenModal={onOpenModal}
                        getFilmId={getFilmId}
                    />
                )
            })}
        </ul>
    )
}

export default ImageGallery;