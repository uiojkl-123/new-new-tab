import React from 'react';
import storelinkIcon from '@assets/img/storelink.png';
import storelinkAdminIcon from '@assets/img/storelink-admin.png';
import storelinkSwaggerIcon from '@assets/img/storelink-swagger.png';
import storelinkAdminSwaggerIcon from '@assets/img/storelink-admin-swagger.png';
import { Button } from '@root/src/shared/components/Button';
import { Popup } from '@root/src/shared/components/Popup';
import AddIcon from '@assets/icon/AddIcon.svg';

import './BookmarkList.scss';
import { Input } from '@root/src/shared/components/Input';
import { useBookmarkDB } from '../../hooks/useBookmarksDB';
import { useBookmarkStore } from '@root/src/stores/NewTab/bookmarkStore';
import { useEffect } from 'react';

interface BookmarkListProps {}

const links = [
  {
    title: 'JIRA',
    items: [
      {
        title: '보드 내꺼',
        url: 'https://storelink.atlassian.net/jira/software/projects/SS/boards/35?assignee=712020%3Abfb9f17d-1014-4363-ac4d-6d8c3561b527',
        icon: storelinkIcon
      }
    ]
  },
  {
    title: 'LOCAL',
    items: [
      {
        title: 'local 스토어링크',
        url: 'http://localhost:3001',
        icon: storelinkIcon
      },
      {
        title: 'local 스토어링크 어드민',
        url: 'http://localhost:3002',
        icon: storelinkAdminIcon
      }
    ]
  },
  {
    title: 'DEV',
    items: [
      {
        title: 'dev 스토어링크',
        url: 'http://stldev.storelink.io',
        icon: storelinkIcon
      },
      {
        title: 'dev 스토어링크 어드민',
        url: 'http://stldeva.storelink.io',
        icon: storelinkAdminIcon
      },
      {
        title: 'dev 스웨거',
        url: 'https://stlapid.storelink.io/webjars/swagger-ui/index.html#/',
        icon: storelinkSwaggerIcon
      },
      {
        title: 'dev 어드민 스웨거',
        url: 'https://apiad.storelink.io/webjars/swagger-ui/index.html#/',
        icon: storelinkAdminSwaggerIcon
      }
    ]
  },
  {
    title: 'PROD',
    items: [
      {
        title: '스토어링크',
        url: 'http://storelink.io',
        icon: storelinkIcon
      },
      {
        title: '스토어링크 어드민',
        url: 'http://admin.storelink.io',
        icon: storelinkAdminIcon
      }
    ]
  }
];

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

  console.log(items);

  return (
    <div className="BookmarkList">
      {items.map((link, index) => (
        <a href={link.link} rel="noreferrer" className="side-bar-item" key={index}>
          <div className="side-bar-icon">
            <img src={link.icon} alt="icon" />
          </div>
          <div className="side-bar-text">{link.linkName}</div>
        </a>
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
