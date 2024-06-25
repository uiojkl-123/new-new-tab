import React, { useRef, useEffect } from 'react';
import './Popover.scss';
import { usePopoverStore } from '@root/src/stores/NewTab/popupStore';
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
            {v.label}
          </div>
        ))}
      </div>
    )
  );
}
