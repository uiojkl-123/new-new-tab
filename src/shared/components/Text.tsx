import React, { FC } from 'react';

interface TextProps {
  kind: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption';
  weight: 'heavy' | 'extra-bold' | 'bold' | 'semiBold' | 'medium' | 'regular' | 'light' | 'extra-light' | 'thin';
  children: React.ReactNode;
}

export const Text: FC<TextProps> = props => {
  const { kind, weight, children } = props;

  return <span className={`text-${kind} text-${weight}`}>{children}</span>;
};
