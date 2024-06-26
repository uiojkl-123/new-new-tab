import React, { FC } from 'react';

import './SideBar.scss';
import { Contact } from '../components/Contact';
import { BookmarkList } from './bookmarks/BookmarkList';

export const SideBar: FC = () => {
  return (
    <div className="SideBar">
      <div className="side-bar-content">
        <div className="side-bar-title">{/* <div className="side-bar-text">New new tab</div> */}</div>
        <BookmarkList />
        <div className="side-bar-footer">
          <Contact />
        </div>
      </div>
    </div>
  );
};
