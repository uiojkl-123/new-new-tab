import React from 'react';
import '@pages/newtab/Newtab.scss';
import '@shared/styles/GlobalStyle.scss';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import { Hellow } from './components/Hellow';
import { Memo } from './memo/Memo';
import { Tasks } from './tasks/Tasks';
import { Contact } from './components/Contact';
import { SideBar } from './sideBar/SideBar';

const Newtab = () => {
  return (
    <div className="App">
      <div className="side-container">
        <SideBar />
      </div>
      <div className="content-container">
        <Hellow />
        <div className="new-tab-content">
          <Memo />
          <Tasks />
        </div>
        <footer className="footer"></footer>
      </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Newtab, <div> Loading ... </div>), <div> Error Occur </div>);
