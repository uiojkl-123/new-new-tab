import React from 'react';

interface ProvidesProps {
  children: React.ReactNode;
}

export const Providers: React.FC<ProvidesProps> = props => {
  return <>{props.children}</>;
};
