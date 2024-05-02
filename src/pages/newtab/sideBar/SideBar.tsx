import React, { FC } from 'react';

export const SideBar: FC = () => {
  return (
    <div className="SideBar">
      <div className="memo-container">
        <textarea className="memo-textarea" placeholder="메모하세용"></textarea>
      </div>
    </div>
  );
};
