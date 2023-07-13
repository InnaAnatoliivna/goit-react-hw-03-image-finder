const ImageGalleryItem = ({
    imageWeb,
    // imageLarge,
    imageId,
    onOpenModal }) => {

    const handleClick = (event) => {
        event.preventDefault();
        const getImageId = imageId;
        console.log(getImageId)
        onOpenModal(getImageId);
    }
    return (
        <li key={imageId} onClick={handleClick} className="ImageGalleryItem">
            {/* <a href={imageLarge} > */}
            <img src={imageWeb} alt="imageSearch" className="ImageGalleryItem-image" />
            {/* </a> */}
        </li>
    )
}

export default ImageGalleryItem;

// import { Component } from "react";

// class ImageGalleryItem extends Component {
//     // const { imageWeb,imageLarge,imageId,onOpenModal } = this.props
//     state = {
//         imageId: ''
//     }

//     handleClick = (event) => {
//         event.preventDefault();
//         const { imageId } = this.state;
//         this.setState({ imageId: this.props.imageId })
//         console.log(imageId);
//         this.props.onOpenModal(imageId);
//     }

//     render() {
//         const { imageWeb, imageLarge, imageId } = this.props;

//         return (
//             <li key={imageId} className="ImageGalleryItem">
//                 <a href={imageLarge} onClick={this.handleClick}>
//                     <img src={imageWeb} alt="imageSearch" className="ImageGalleryItem-image" />
//                 </a>
//             </li>
//         )
//     }
// }

// export default ImageGalleryItem;