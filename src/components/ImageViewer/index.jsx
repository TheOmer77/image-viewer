import { useRef } from 'react';
import PinchZoomPan from '@godartm/react-responsive-pinch-zoom-pan';
import classNames from 'classnames';

import classes from './index.module.css';

/**
 * @param {React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>} props
 */
const ImageViewer = ({ src, alt, className, ...props }) => {
  const imageRef = useRef();

  return (
    <div
      className={classes['image-viewer']}
      role='presentation'
      onClick={event =>
        event.target === imageRef.current && event.stopPropagation()
      }
    >
      <PinchZoomPan position='center' zoomButtons={false}>
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          className={classNames(classes.image, className)}
          {...props}
        />
      </PinchZoomPan>
    </div>
  );
};

export default ImageViewer;
