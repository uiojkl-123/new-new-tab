import React, { FC } from 'react';
import './Memo.scss';
import { useMemoDB } from '../hooks/useMemoDB';
import { useMemoStore } from '@root/src/stores/NewTab/memoStore';

export const Memo: FC = () => {
  // 🪝 React Hooks
  const { isLoading, setDBData } = useMemoDB<string>('memo');

  // 📦 Store
  const { memo, setMemo } = useMemoStore();

  // 🎁 Event Handler
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMemo(e.target.value);
    setDBData('memo', e.target.value);
  };

  return (
    <div className="Memo">
      <div className="memo-container">
        <div className="memo-title">메모</div>
        <textarea className="memo-textarea" placeholder="메모하세용" value={memo} onChange={handleChange}></textarea>
      </div>
    </div>
  );
};
