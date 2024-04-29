import React from 'react';
import '@pages/newtab/Newtab.scss';
import '@shared/styles/GlobalStyle.scss';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import { Hellow } from './components/Hellow';
import { Memo } from './memo/Memo';
import { Tasks } from './tasks/Tasks';

const Newtab = () => {
  return (
    <div className="App">
      <Hellow />
      <Memo />
    </div>
  );
};

export default withErrorBoundary(withSuspense(Newtab, <div> Loading ... </div>), <div> Error Occur </div>);
