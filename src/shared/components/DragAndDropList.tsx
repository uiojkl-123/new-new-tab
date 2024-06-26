import { FC, useEffect, useState , useCallback } from 'react';
// eslint-disable-next-line import/named
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

import './DragAndDropList.scss';
import { Item } from '@root/src/pages/newtab/tasks/Tasks';

interface DragAndDropListProps {
  items: Item[];
  setItems: (items: Item[]) => void;
  CardComponent: FC<{ item: Item }>;
}

const getItemStyle = (isDragging, draggableStyle) => ({
  ...draggableStyle
});

export const DragAndDropList: FC<DragAndDropListProps> = props => {
  const { items, setItems, CardComponent } = props;

  // --- Draggable이 Droppable로 드래그 되었을 때 실행되는 이벤트
  const onDragEnd = useCallback(
    ({ source, destination }: DropResult) => {
      if (!destination) return;

      const _items = JSON.parse(JSON.stringify(items)) as typeof items;
      const targetItem = { ..._items[source.index], order: destination.index };

      _items.splice(source.index, 1);
      _items.splice(destination.index, 0, targetItem);
      setItems(_items);
    },
    [items, setItems]
  );
  // --- requestAnimationFrame 초기화
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }
  // --- requestAnimationFrame 초기화 END

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="drag-drop-list-container">
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                    <CardComponent item={item} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
