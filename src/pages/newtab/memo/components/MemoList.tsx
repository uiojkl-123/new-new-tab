import { FC } from 'react';

interface MemoListProps {
  title: string;
  content: string;
}

export const MemoList: FC<MemoListProps> = props => {
  const { title, content } = props;

  return (
    <div className="MemoList">
      <div className="item">
        <div className="title">{title}</div>
        <div className="content">{content}</div>
      </div>
    </div>
  );
};
