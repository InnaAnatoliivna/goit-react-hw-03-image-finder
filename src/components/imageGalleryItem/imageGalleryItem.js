// import { nanoid } from 'nanoid';
// const KEYitem = nanoid()

const ImageGalleryItem = ({
    arrayResults,
    imageWeb,
    imageId,
    getSelectImg }) => {

    const handleClick = (e) => {
        const selectedImage = arrayResults.find((image) => { return image.id === imageId });
        getSelectImg(selectedImage); //this function is in 'imageInfo.js'
    }

    return (
        <li key={imageId} onClick={handleClick} className="ImageGalleryItem">
            <img src={imageWeb} alt="imageSearch" className="ImageGalleryItem-image" />
        </li>
    )
}

export default ImageGalleryItem;