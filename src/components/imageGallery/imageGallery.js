// import ImageGalleryItem from 'components/imageGalleryItem/imageGalleryItem';

// const ImageGallery = ({ arrayResults }) => {
//     return (
//         <ul className="ImageGallery">
//             {arrayResults.map(image => {
//                 return (
//                     <ImageGalleryItem
//                         key={image.id}
//                         imageId={image.id}
//                         imageLarge={image.largeImageURL}
//                         imageWeb={image.webformatURL}
//                     />
//                 )
//             })}
//         </ul>
//     )
// }

// export default ImageGallery;

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
                        imageWeb={image.webformatURL}
                    // onOpenModal={onOpenModal}
                    />
                )
            })}
        </ul>
    )
}

export default ImageGallery;