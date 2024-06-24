import React, { FC, useState } from 'react';

import './Memo.scss';
import { Modal } from '@root/src/shared/components/Modal';
import { Popup } from '@root/src/shared/components/Popup';
import { useMemoDB } from '../hooks/useMemoDB';
import { useMemoStore } from '@root/src/stores/NewTab/memoStore';

export const Memo: FC = () => {
  const { isLoading, setDBData } = useMemoDB<string>('memo');

  const memo = useMemoStore(state => state.memo);

  const setMemo = useMemoStore(state => state.setMemo);

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
