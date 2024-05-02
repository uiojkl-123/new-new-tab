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
  const { isLoading, setDBData, refreshData } = useDB<{ title: string; order: number }>('tasks');

  const [items, setItems] = React.useState<{ id: string; title: string; order?: number }[]>([]);
  const data = useTaskStore(state => state.task);

  useEffect(() => {
    console.log(data);

    if (data && !isLoading) {
      setItems(
        Object.keys(data)
          .map(key => ({ id: key, ...data[key] }))
          .sort((a, b) => a.order - b.order)
      );
    }
    return () => {};
  }, [data, isLoading]);

  // useEffect(() => {
  //   if (items.length) {
  //     items.forEach((item, index) => {
  //       console.log(index, item.title);
  //       setDBData(item.id, { title: item.title, order: index });
  //     });
  //   }
  //   return () => {};
  // }, [items, refreshData, setDBData]);

  const handleSetItems = useCallback(
    async (items: { id: string; title: string; order?: number }[]) => {
      setItems(items);
      await Promise.all(
        items.map(async (item, index) => {
          await setDBData(item.id, { title: item.title, order: index });
        })
      );
    },
    [setItems, setDBData]
  );

  return (
    <div className="Tasks">
      <div className="tasks-container">
        <DragAndDropList items={items} setItems={handleSetItems} CardComponent={TaskCard} />
        <TaskAdd />
      </div>
    </div>
  );
};
