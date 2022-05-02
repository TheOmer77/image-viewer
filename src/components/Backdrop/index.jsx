import { useRef } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';

import classes from './index.module.css';

/**
 * @param {{
 *  open?: boolean;
 * } & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>}
 */
const Backdrop = ({ open = false, className, ...props }) => {
  const ref = useRef();

  return createPortal(
    <CSSTransition
      nodeRef={ref}
      in={open}
      timeout={250}
      unmountOnExit
      classNames={{
        enter: classes['fade-enter'],
        enterActive: classes['fade-enter-active'],
        exit: classes['fade-exit'],
        exitActive: classes['fade-exit-active'],
      }}
    >
      <div
        ref={ref}
        className={classNames(classes.modal, className)}
        role='presentation'
        {...props}
      />
    </CSSTransition>,
    document.getElementById('modal')
  );
};

export default Backdrop;
