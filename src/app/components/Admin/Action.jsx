import React, {forwardRef, CSSProperties} from 'react';

import styles from './Action.module.scss';

export const Action = forwardRef(
  function Action({active, className, cursor, style, ...props}, ref) {
    return (
      <button
        ref={ref}
        {...props}
        className={`${styles.Action} ${className}`}
        tabIndex={0}
        style={
          {
            ...style,
            cursor,
            '--fill': active?.fill,
            '--background': active?.background,
          }
        }
      />
    );
  }
)