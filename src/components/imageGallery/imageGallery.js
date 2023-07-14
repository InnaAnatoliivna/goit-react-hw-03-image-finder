import ImageGalleryItem from 'components/imageGalleryItem/imageGalleryItem';


const ImageGallery = ({ arrayResults, getSelectImg }) => {

    return (
        <ul className="ImageGallery">
            {arrayResults.map(image => {
                return (
                    <ImageGalleryItem
                        key={image.id}
                        imageId={image.id}
                        imageWeb={image.webformatURL}
                        arrayResults={arrayResults}
                        getSelectImg={getSelectImg}
                    />
                )
            })}
        </ul>
    )
}

export default ImageGallery;