import classNames from 'classnames';
import classes from './index.module.css';

/**
 * @param {React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>} props
 */
const Container = ({ className, ...props }) => {
  return (
    <div className={classNames(classes.container, className)} {...props}></div>
  );
};

export default Container;
