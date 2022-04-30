import classNames from 'classnames';

import classes from './index.module.css';

/**
 * @param {{
 *  photos: Array,
 *  onPhotoClick?: (photo: object, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
 * } & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>} props
 */
const PhotoList = ({ photos = [], onPhotoClick, className, ...props }) => (
  <div className={classNames(classes['image-list'], className)} {...props}>
    {photos.map(photo => (
      <button
        key={photo.id}
        className={classes.image}
        onClick={event => onPhotoClick(photo, event)}
      >
        <img
          src={photo.urls.small}
          alt={photo.description || photo.alt_description}
        />
      </button>
    ))}
  </div>
);

export default PhotoList;
