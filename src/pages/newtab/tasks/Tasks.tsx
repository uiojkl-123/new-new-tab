import React, { useEffect , useCallback } from 'react';
import './Tasks.scss';
import { Button } from '@root/src/shared/components/Button';
import { useDB } from '@root/src/shared/hooks/useTaskDB';
import { DragAndDropList } from '@root/src/shared/components/DragAndDropList';
import { TaskCard } from './components/TaskCard';
import { TaskAdd } from './components/TaskAdd';
import { Task, useTaskStore } from '@root/src/stores/NewTab/taskStore';

export interface Item extends Task {
  id: string;
}

export const Tasks: React.FC = () => {
  const { isLoading, setMultipleDBData } = useDB<{ title: string; order: number }>('tasks');

  const [items, setItems] = React.useState<Item[]>([]);
  const [showItems, setShowItems] = React.useState<Item[]>([]);
  const { task: data, category, setCategory } = useTaskStore();

  useEffect(() => {
    if (data && !isLoading) {
      if (items.length === Object.keys(data).length) return;
      setItems(
        Object.keys(data)
          .map(key => ({ id: key, ...data[key] }))
          .sort((a, b) => a.order - b.order)
      );
    }
  }, [data, isLoading, items.length]);

  const updateDB = useCallback(
    (items: Item[]) => {
      const newData = items.map((item, index) => ({
        key: item.id,
        data: { title: item.title, order: index, done: item.done, savedAt: item.savedAt }
      }));
      setMultipleDBData(newData);
    },
    [setMultipleDBData]
  );

  useEffect(() => {
    setShowItems(items.filter(item => (category === 'active' ? !item.done : item.done)));
  }, [items, category]);

  return (
    <div className="Tasks">
      <div className="tasks-title">할 일{<div className="tasks-count">{showItems.length}</div>}</div>
      <div className="tasks-container">
        <div className="tasks-category">
          <div
            className={'category-toggle ' + (category === 'active' ? 'active' : '')}
            onClick={() => setCategory('active')}
            tabIndex={0}
            role="button"
            onKeyDown={() => {}}>
            진행 중
          </div>
          <div
            className={'category-toggle ' + (category === 'completed' ? 'active' : '')}
            onClick={() => setCategory('completed')}
            tabIndex={0}
            role="button"
            onKeyDown={() => {}}>
            완료
          </div>
        </div>
        <div className="tasks-item-container">
          <DragAndDropList
            items={Object.keys(data)
              .map(key => ({ id: key, ...data[key] }))
              .sort((a, b) => a.order - b.order)
              .filter(item => (category === 'active' ? !item.done : item.done))}
            setItems={updateDB}
            CardComponent={TaskCard}
          />
          {category === 'active' && <TaskAdd />}
        </div>
      </div>
    </div>
  );
};
