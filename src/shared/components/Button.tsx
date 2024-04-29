import React, { FC } from 'react';

import './Button.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  onClick?: () => void;
  size?: 'full' | 'large' | 'medium' | 'small' | 'fit';
  kind?: 'text' | 'contained';
}

export const Button: FC<ButtonProps> = props => {
  const { children, onClick, ...rest } = props;

  return (
    <button onClick={onClick} {...rest} className={`button button-${props.size} button-${props.kind}`}>
      {children}
    </button>
  );
};
