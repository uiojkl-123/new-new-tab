import React, { FC } from 'react';
import closeIcon from '@assets/icon/CloseIcon.svg';
import storelinkIcon from '@assets/img/storelink.png';
import storelinkAdminIcon from '@assets/img/storelink-admin.png';
import storelinkSwaggerIcon from '@assets/img/storelink-swagger.png';
import storelinkAdminSwaggerIcon from '@assets/img/storelink-admin-swagger.png';

import './SideBar.scss';
import { Contact } from '../components/Contact';

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

export const SideBar: FC = () => {
  return (
    <div className="SideBar">
      <div className="side-bar-content">
        <div className="side-bar-title">
          <div className="side-bar-text">안녕하세여</div>
        </div>
        <div className="side-bar-list">
          {links.map((link, index) => (
            <div className="side-bar-item-group" key={index}>
              <div className="side-bar-item-group-title">{link.title}</div>
              <div className="side-bar-item-group-content">
                {link.items.map((item, index) => (
                  <a href={item.url} rel="noreferrer" className="side-bar-item" key={index}>
                    <div className="side-bar-icon">
                      <img src={item.icon} alt="close" />
                    </div>
                    <div className="side-bar-text">{item.title}</div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="side-bar-footer">
          <Contact />
        </div>
      </div>
    </div>
  );
};
