import React, { FC, useState } from 'react';

import './Memo.scss';
import { useDB } from '@root/src/shared/hooks/useDB';
import { Modal } from '@root/src/shared/components/Modal';
import { Popup } from '@root/src/shared/components/Popup';

export const Memo: FC = () => {
  const { data, isLoading, setMemo } = useDB();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [popUpOpen, setPopUpOpen] = useState<boolean>(false);

  // const handleOnGetMemo = async () => {
  //   console.log(await getMemo());
  // };

  return (
    <div className="Memo">
      <div className="memo-container">
        <textarea
          className="memo-textarea"
          onChange={e => setMemo(e.target.value)}
          defaultValue={data}
          placeholder="메모하세용"></textarea>
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
