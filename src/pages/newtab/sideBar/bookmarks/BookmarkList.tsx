import React, { useEffect } from 'react';
import storelinkIcon from '@assets/img/storelink.png';
import { Button } from '@root/src/shared/components/Button';
import { Popup } from '@root/src/shared/components/Popup';
import AddIcon from '@assets/icon/AddIcon.svg';

import './BookmarkList.scss';
import { Input } from '@root/src/shared/components/Input';
import { useBookmarkDB } from '../../hooks/useBookmarksDB';
import { useBookmarkStore } from '@root/src/stores/NewTab/bookmarkStore';
import { BookmarkItem } from './BookmarkItem';
import Popover from '../../components/Popover';

interface BookmarkListProps {}

export const BookmarkList: React.FC<BookmarkListProps> = props => {
  const [popUpOpen, setPopUpOpen] = React.useState(false);
  const [link, setLink] = React.useState('');
  const [linkName, setLinkName] = React.useState('');
  const [icon, setIcon] = React.useState<string>();

  const [items, setItems] = React.useState([]);

  const { bookmark } = useBookmarkStore();

  const { addDBData } = useBookmarkDB('bookmark');

  useEffect(() => {
    if (bookmark) {
      if (items.length === Object.keys(bookmark).length) return;
      setItems(Object.keys(bookmark).map(key => ({ id: key, ...bookmark[key] })));
    }
  }, [bookmark, items.length]);

  const handleAddBookmark = () => {
    addDBData({ linkName: linkName, link: link, icon: icon ? icon : storelinkIcon });
  };

  return (
    <div className="BookmarkList">
      {items.map((link, index) => (
        <BookmarkItem key={index} link={link} />
      ))}
      <Button kind="text" onClick={() => setPopUpOpen(true)}>
        <div className="icon-container">
          <img src={AddIcon} alt="add" />
        </div>
      </Button>
      <Popup
        open={popUpOpen}
        onClose={() => setPopUpOpen(false)}
        closeText="취소"
        okText="저장"
        onOk={() => {
          handleAddBookmark();
          setPopUpOpen(false);
        }}>
        <form className="bookmarkAddForm">
          <div className="input-container">
            <span className="input-label">icon</span>
            <Input
              name="icon"
              type="file"
              onChange={e => {
                const reader = new FileReader();
                reader.onload = () => {
                  setIcon(reader.result as string);
                };
                reader.readAsDataURL(e.target.files[0]);
              }}
            />
          </div>
          <div className="input-container">
            <span className="input-label">link</span>
            <Input
              name="link"
              onChange={e => {
                setLink(e.target.value);
              }}
              value={link}
            />
          </div>
          <div className="input-container">
            <span className="input-label">name</span>
            <Input
              name="linkName"
              onChange={e => {
                setLinkName(e.target.value);
              }}
              value={linkName}
            />
          </div>
        </form>
      </Popup>
    </div>
  );
};
