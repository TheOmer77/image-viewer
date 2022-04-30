import { useEffect } from 'react';
import classNames from 'classnames';

import usePrefersDarkMode from '../../hooks/usePrefersDarkMode';

import classes from './index.module.css';

const metaThemeColor = document.querySelector('meta[name=theme-color]');

/**
 * @param {{
 *  fixed?: boolean;
 * } & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>} props
 */
const Header = ({ className, fixed, ...props }) => {
  const darkMode = usePrefersDarkMode();

  // Set the theme-color meta tag to the same color as the header
  useEffect(() => {
    metaThemeColor.setAttribute(
      'content',
      getComputedStyle(document.documentElement)
        .getPropertyValue('--color-primary-header')
        .trim()
    );
  }, [darkMode]);

  return (
    <>
      <header
        className={classNames(
          classes.header,
          fixed && classes['header-fixed'],
          className
        )}
        {...props}
      />
      <div className={classes['header-fixed-margin']} />
    </>
  );
};

export default Header;
