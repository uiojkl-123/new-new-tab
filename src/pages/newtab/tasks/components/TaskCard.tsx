import React from 'react';
import './TaskCard.scss';
import closeIcon from '@assets/icon/CloseIcon.svg';
import { useTaskDB } from '../../hooks/useTaskDB';
import { usePopoverStore } from '@root/src/stores/NewTab/popupStore';
import { useTaskStore } from '@root/src/stores/NewTab/taskStore';
import { Item } from '../Tasks';
import { isoToKorean } from '@root/utils/isoToKorean';

interface TaskCardProps {
  item: Item;
  onClick?: () => void;
  children?: React.ReactNode;
}

export const TaskCard: React.FC<TaskCardProps> = props => {
  const { item, onClick, children } = props;

  const { deleteData, updateData } = useTaskDB('tasks');

  const { setOpen, setLocation, setMenu } = usePopoverStore();

  const handleDone = () => {
    updateData(item.id, {
      done: true,
      savedAt: new Date().toISOString()
    });
  };

  const handleRe = () => {
    updateData(item.id, {
      done: false,
      savedAt: ''
    });
  };

  const handleDelete = () => {
    deleteData(item.id);
  };

  const handleOnContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setOpen(true);
    setLocation({ x: e.clientX, y: e.clientY });
    setMenu(
      !item.done
        ? [
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
          ]
        : [
            {
              label: '미완료하기',
              onClick: () => {
                handleRe();
                setOpen(false);
              },
              icon: 're'
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
          ]
    );
  };

  return (
    <div
      className="TaskCard"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={() => {}}
      onContextMenu={handleOnContextMenu}>
      <div className="TaskCard-text-container">
        <div className="TaskCard-title">{item.title}</div>
        {item.done && <div className="TaskCard-sub">{isoToKorean(item.savedAt)}</div>}
      </div>
      <div className="deleteButton" onClick={handleDelete} role="button" tabIndex={0} onKeyDown={() => {}}>
        <img src={closeIcon} alt="delete" />
      </div>
    </div>
  );
};
