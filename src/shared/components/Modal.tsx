import { useEffect, useState, type FC, type ReactNode } from 'react';

import { Text } from './Text';
import closeIcon from '@assets/icon/CloseIcon.svg';

import './Modal.scss';

interface ModalProps {
  open: boolean;
  title?: string;
  onClose: () => void;
  children?: ReactNode;
}

export const Modal: FC<ModalProps> = props => {
  const { open, title, onClose, children } = props;

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
    <div className="modal-wrapper" data-open={open}>
      <div className="modal-container">
        <div className="modal-header">
          <span className="space-dummy"></span>
          <Text kind="h4" weight="bold">
            {/* \n 인식하여 줄바꿈으로 */}
            {title?.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </Text>
          <button className="close-container" onClick={onClose} onKeyDown={handleKeyDown}>
            <img src={closeIcon} alt="close icon" />
          </button>
        </div>
        {children}
      </div>
    </div>
  ) : null;
};
