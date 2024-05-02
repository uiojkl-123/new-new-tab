import { useState, useCallback } from 'react';
import { useDB } from '@root/src/shared/hooks/useTaskDB';
import './TaskAdd.scss';
import { Input } from '@root/src/shared/components/Input';
import { useEffect } from 'react';
import { useTaskStore } from '@root/src/stores/NewTab/taskStore';

export const TaskAdd: React.FC = () => {
  const [task, setTask] = useState('');
  const { addDBData } = useDB<{ [key: string]: string }>('tasks');

  const data = useTaskStore(state => state.task);

  const getLastOrder = useCallback(() => {
    const keys = Object.keys(data);
    if (!keys.length) return 0;
    return Math.max(...keys.map(key => Number(data[key].order)));
  }, [data]);

  const handleOnAddTask = useCallback(() => {
    if (!task) return;
    const newData = {
      title: task,
      order: String(getLastOrder() + 1)
    };
    addDBData(newData);
    setTask('');
  }, [task, getLastOrder, addDBData]);

  return (
    <div className="TaskAdd">
      {/* <hr /> */}
      <Input
        type="text"
        value={task}
        onChange={e => setTask(e.target.value)}
        placeholder="할 일을 입력해주세요."
        onKeyDown={e => (!e.nativeEvent.isComposing ? e.key === 'Enter' && handleOnAddTask() : null)}
      />
      {/* <div
        onClick={handleOnAddTask}
        className="task-add-button"
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && handleOnAddTask()}>
        <span className="task-add-button-icon-container">
          <img src={AddIcon} alt="추가" />
        </span>
      </div> */}
    </div>
  );
};
