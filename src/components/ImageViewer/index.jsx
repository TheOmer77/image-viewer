import { useState, useRef, useCallback } from 'react';
import { useGesture } from '@use-gesture/react';
import classNames from 'classnames';

import classes from './index.module.css';

/**
 * @param {React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>} props
 */
const ImageViewer = ({ src, alt, className, ...props }) => {
  /** @type {React.MutableRefObject<HTMLImageElement>} */
  const imageRef = useRef(),
    /** @type {React.MutableRefObject<HTMLDivElement>} */
    containerRef = useRef();
  const [crop, setCrop] = useState({ x: 0, y: 0, z: 1 });
  const [dragging, setDragging] = useState(false);

  const adjustImage = useCallback(() => {
    setDragging(false);

    let newCrop = { ...crop };
    const imageBounds = imageRef.current.getBoundingClientRect(),
      containerBounds = containerRef.current.getBoundingClientRect(),
      originalWidth = imageRef.current.clientWidth,
      originalHeight = imageRef.current.clientHeight,
      widthOverhang = (imageBounds.width - originalWidth) / 2,
      heightOverhang = (imageBounds.height - originalHeight) / 2;

    if (imageBounds.left > containerBounds.left) {
      newCrop.x = widthOverhang;
    } else if (imageBounds.right < containerBounds.right) {
      newCrop.x = -(imageBounds.width - containerBounds.width) + widthOverhang;
    }

    if (imageBounds.top > containerBounds.top) {
      newCrop.y = heightOverhang;
    } else if (imageBounds.bottom < containerBounds.bottom) {
      newCrop.y =
        -(imageBounds.height - containerBounds.height) + heightOverhang;
    }

    setCrop(newCrop);
  }, [crop]);

  useGesture(
    {
      onDragStart: () => setDragging(true),
      onDrag: ({ event, offset: [x, y] }) => {
        event.preventDefault();
        setCrop(prev => ({ ...prev, x, y }));
      },
      onDragEnd: adjustImage,
      onPinchStart: () => setDragging(true),
      onPinch: ({
        event,
        memo,
        origin: [pinchOriginX, pinchOriginY],
        offset: [z],
      }) => {
        event.preventDefault();
        memo ??= {
          bounds: imageRef.current.getBoundingClientRect(),
          crop,
        };

        const transformOriginX = memo.bounds.x + memo.bounds.width / 2,
          transformOriginY = memo.bounds.y + memo.bounds.height / 2;

        const displacementX = (transformOriginX - pinchOriginX) / memo.crop.z,
          displacementY = (transformOriginY - pinchOriginY) / memo.crop.z;

        const initialOffsetDistance = memo.crop.z - 1,
          movementDistance = z - initialOffsetDistance;

        setCrop(prev => ({
          ...prev,
          x: memo.crop.x + displacementX * movementDistance,
          y: memo.crop.y + displacementY * movementDistance,
          z,
        }));

        return memo;
      },
      onPinchEnd: adjustImage,
    },
    {
      drag: { from: () => [crop.x, crop.y] },
      pinch: { scaleBounds: { min: 1 } },
      target: imageRef,
      eventOptions: { passive: false },
    }
  );

  return (
    <div className={classes['image-viewer']} ref={containerRef}>
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className={classNames(
          classes.image,
          dragging && classes['image-drag'],
          className
        )}
        style={{
          left: crop.x,
          top: crop.y,
          transform: `scale(${crop.z})`,
        }}
        {...props}
      />
    </div>
  );
};

export default ImageViewer;
