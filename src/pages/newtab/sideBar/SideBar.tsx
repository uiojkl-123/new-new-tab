import React, { FC } from 'react';
import { useDB } from '@root/src/shared/hooks/useDB';

export const SideBar: FC = () => {
  const { data, isLoading, setMemo } = useDB();

  return (
    <div className="SideBar">
      <div className="memo-container">
        <textarea
          className="memo-textarea"
          onChange={e => setMemo(e.target.value)}
          defaultValue={data}
          placeholder="메모하세용"></textarea>
      </div>
    </div>
  );
};
