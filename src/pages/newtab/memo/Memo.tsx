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

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [popUpOpen, setPopUpOpen] = useState<boolean>(false);

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
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="모냐고F">
        <div>안녕하세요</div>
      </Modal>
      <Popup
        open={popUpOpen}
        onClose={() => setPopUpOpen(false)}
        closeText="닫기"
        okText="확인"
        onOk={() => {
          setPopUpOpen(false);
        }}>
        <div>안녕하세요</div>
      </Popup>
    </div>
  );
};
