import React from 'react';
import './TaskCard.scss';
import closeIcon from '@assets/icon/CloseIcon.svg';
import { useTaskDB } from '../../hooks/useTaskDB';

interface TaskCardProps {
  targetTitle: string;
  targetId: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

export const TaskCard: React.FC<TaskCardProps> = props => {
  const { targetTitle, targetId, onClick, children } = props;

  const { deleteData } = useTaskDB('tasks');

  const handleDelete = () => {
    deleteData(targetId);
  };

  return (
    <div className="TaskCard" onClick={onClick} role="button" tabIndex={0} onKeyDown={() => {}}>
      {targetTitle}
      <div className="deleteButton" onClick={handleDelete} role="button" tabIndex={0} onKeyDown={() => {}}>
        <img src={closeIcon} alt="delete" />
      </div>
    </div>
  );
};
