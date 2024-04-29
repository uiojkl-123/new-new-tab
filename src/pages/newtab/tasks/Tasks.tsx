import React from 'react';
import './Tasks.scss';
import { Button } from '@root/src/shared/components/Button';

export const Tasks: React.FC = () => {
  const handleOnGetMemo = async () => {
    // console.log(await getDB('tasks'));
  };

  return (
    <div className="Tasks">
      <div className="tasks-container">
        <Button onClick={handleOnGetMemo}>불러오기</Button>
        {/* <Button onClick={() => setDB('tasks', '테스트')}>저장하기</Button> */}
      </div>
    </div>
  );
};
