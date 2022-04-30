import classes from './index.module.css';

/**
 * @param {React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>} props
 */
const ImageViewer = ({ src, alt, props }) => {
  return (
    <div className={classes['image-viewer']}>
      <img src={src} alt={alt} {...props} />
    </div>
  );
};

export default ImageViewer;
