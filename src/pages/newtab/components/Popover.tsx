import React, { useRef, useEffect } from 'react';
import './Popover.scss';
import { usePopoverStore } from '@root/src/stores/NewTab/popupStore';
import { TrashCanIcon, NewTabIcon, DoneIcon, ReIcon } from '../icons';

interface PopoverProps {}

export default function Popover(props: PopoverProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { open, location, menu } = usePopoverStore();

  useEffect(() => {
    if (open && ref.current) {
      ref.current.style.transform = `translate(${location.x + 5}px, ${location.y}px)`;
    }
  }, [location.x, location.y, open]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pageClickEvent = (e: any) => {
      if (!ref.current.contains(e.target)) {
        usePopoverStore.getState().setOpen(false);
      }
    };

    window.addEventListener('click', pageClickEvent, true);

    if (!open) window.removeEventListener('click', pageClickEvent, true);

    return () => {
      window.removeEventListener('click', pageClickEvent, true);
    };
  }, [open]);

  const Icon = (props: { icon: string }) => {
    switch (props.icon) {
      case 'newtab':
        return <NewTabIcon />;
      case 'trashCan':
        return <TrashCanIcon />;
      case 'done':
        return <DoneIcon />;
      case 're':
        return <ReIcon />;
      default:
        return <></>;
    }
  };

  return (
    open && (
      <div className={'Popover ' + (open ? 'show' : '')} ref={ref}>
        {menu.map((v, index) => (
          <div
            className={'Popover-item ' + (v.type === 'danger' ? 'danger' : '')}
            key={index}
            onClick={v.onClick}
            onKeyDown={e => {
              if (e.key === 'Enter') v.onClick();
            }}
            tabIndex={0}
            role="button">
            {!!v.icon && (
              <span className="Popover-item-icon">
                <Icon icon={v.icon} />
              </span>
            )}
            {v.label}
          </div>
        ))}
      </div>
    )
  );
}
