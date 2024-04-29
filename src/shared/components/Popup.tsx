import { useEffect, useState, type FC, type ReactNode } from 'react';

import './Popup.scss';
import { Button } from './Button';

interface PopupProps {
  open: boolean;
  onClose: () => void;
  children?: ReactNode;
  closeText?: string;
  okText?: string;
  onOk?: () => void;
}

export const Popup: FC<PopupProps> = props => {
  const { open, onClose, children, closeText, okText, onOk } = props;

  const [init, setInit] = useState<boolean>(false);

  useEffect(() => {
    if (open) {
      setInit(true);
    }
  }, [open]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  return init ? (
    <>
      <div className="popup" data-open={open}>
        <div className="popup-content">{children}</div>
        <div className="popup-footer">
          {closeText && (
            <Button className="close" onClick={onClose} kind="text" size="fit">
              {closeText}
            </Button>
          )}
          <Button className="ok" onClick={onOk} size="fit">
            {okText}
          </Button>
        </div>
      </div>
      <div
        className="backdrop"
        data-open={open}
        onClick={onClose}
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}></div>
    </>
  ) : null;
};
