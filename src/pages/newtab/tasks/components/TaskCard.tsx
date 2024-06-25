import React from 'react';
import './TaskCard.scss';
import closeIcon from '@assets/icon/CloseIcon.svg';
import { useTaskDB } from '../../hooks/useTaskDB';
import { usePopoverStore } from '@root/src/stores/NewTab/popupStore';

interface TaskCardProps {
  targetTitle: string;
  targetId: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

export const TaskCard: React.FC<TaskCardProps> = props => {
  const { targetTitle, targetId, onClick, children } = props;

  const { deleteData, updateData } = useTaskDB('tasks');

  const { setOpen, setLocation, setMenu } = usePopoverStore();

  const handleDone = () => {
    updateData(targetId, {
      done: true,
      doneAt: new Date().toISOString()
    });
  };

  const handleDelete = () => {
    deleteData(targetId);
  };

  const handleOnContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setOpen(true);
    setLocation({ x: e.clientX, y: e.clientY });
    setMenu([
      {
        label: '완료하기',
        onClick: () => {
          handleDone();
          setOpen(false);
        },
        icon: 'done'
      },
      {
        label: '삭제하기',
        onClick: () => {
          handleDelete();
          setOpen(false);
        },
        type: 'danger',
        icon: 'trashCan'
      }
    ]);
  };

  return (
    <div
      className="TaskCard"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={() => {}}
      onContextMenu={handleOnContextMenu}>
      {targetTitle}
      <div className="deleteButton" onClick={handleDelete} role="button" tabIndex={0} onKeyDown={() => {}}>
        <img src={closeIcon} alt="delete" />
      </div>
    </div>
  );
};
