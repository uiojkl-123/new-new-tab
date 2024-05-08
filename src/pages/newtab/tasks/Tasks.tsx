import React from 'react';
import './Tasks.scss';
import { Button } from '@root/src/shared/components/Button';
import { useDB } from '@root/src/shared/hooks/useTaskDB';
import { DragAndDropList } from '@root/src/shared/components/DragAndDropList';
import { TaskCard } from './components/TaskCard';
import { TaskAdd } from './components/TaskAdd';
import { useEffect } from 'react';
import { useTaskStore } from '@root/src/stores/NewTab/taskStore';
import { useCallback } from 'react';

export const Tasks: React.FC = () => {
  const { isLoading, setMultipleDBData, refreshData } = useDB<{ title: string; order: number }>('tasks');

  const [items, setItems] = React.useState<{ id: string; title: string; order?: number }[]>([]);
  const data = useTaskStore(state => state.task);

  useEffect(() => {
    if (data && !isLoading) {
      setItems(
        Object.keys(data)
          .map(key => ({ id: key, ...data[key] }))
          .sort((a, b) => a.order - b.order)
      );
    }
    return () => {};
  }, [data, isLoading]);

  const handleSetItems = useCallback(
    async (items: { id: string; title: string; order?: number }[]) => {
      setItems(items);
      const newData = items.map((item, index) => ({ key: item.id, data: { title: item.title, order: index } }));
      await setMultipleDBData(newData);
    },
    [setMultipleDBData]
  );

  return (
    <div className="Tasks">
      <div className="tasks-title">할 일{<div className="tasks-count">{items.length}</div>}</div>
      <div className="tasks-container">
        <DragAndDropList items={items} setItems={handleSetItems} CardComponent={TaskCard} />
        <TaskAdd />
      </div>
    </div>
  );
};
