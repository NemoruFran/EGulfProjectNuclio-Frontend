import "./galleryImage.css";

const GalleryImage = ({img}) => {
    return(
        <span  className="galleryImageContainer"> 
                <img className="galleryImage" src={img} alt="" />
        </span>
    )
};
export default GalleryImage;
