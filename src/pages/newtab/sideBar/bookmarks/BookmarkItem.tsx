import React from 'react';
import './BookmarkItem.scss';
import Popover from '../../components/Popover';
import { usePopoverStore } from '@root/src/stores/NewTab/popupStore';
import { useBookmarkDB } from '../../hooks/useBookmarksDB';
import { useBookmarkStore } from '@root/src/stores/NewTab/bookmarkStore';
import trashCanIcon from '@assets/icon/TrashCanIcon.svg';
// import newTabIcon from '@assets/icon/NewTabIcon.svg';
import NewTabIcon from '@assets/icon/NewTabIcon.svg';

interface BookmarkItemProps {
  link: {
    id: string;
    linkName: string;
    link: string;
    icon: string;
  };
}

export const BookmarkItem: React.FC<BookmarkItemProps> = props => {
  const { link } = props;

  const { setOpen, setLocation, setMenu } = usePopoverStore();

  const { deleteData } = useBookmarkDB('bookmark');

  const handleOnContextMenu = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setOpen(true);
    setLocation({ x: e.clientX, y: e.clientY });
    setMenu([
      {
        label: '새 탭에서 열기',
        onClick: () => {
          window.open(link.link, '_blank');
          setOpen(false);
        },
        icon: 'newtab'
      },
      {
        label: '삭제하기',
        onClick: () => {
          setOpen(false);
          deleteData(link.id);
        },
        type: 'danger',
        icon: 'trashCan'
      }
    ]);
  };

  return (
    <a href={link.link} rel="noreferrer" className="side-bar-item" onContextMenu={handleOnContextMenu}>
      <div className="side-bar-icon">
        <img src={link.icon} alt="icon" />
      </div>
      <div className="side-bar-text">{link.linkName}</div>
    </a>
  );
};
