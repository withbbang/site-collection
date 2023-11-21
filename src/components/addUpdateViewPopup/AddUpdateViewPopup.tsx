import React from 'react';
import { TypeLink } from 'modules/types';
import styles from './AddUpdateViewPopup.module.scss';

function AddUpdateViewPopup({
  isActive,
  xPos,
  yPos,
  link,
  onClick,
}: TypeAddUpdateViewPopup): React.JSX.Element {
  const ref = React.useRef(
    null,
  ) as React.MutableRefObject<HTMLDivElement | null>;

  React.useEffect(() => {
    if (isActive) {
      handleActivePopup();
    } else {
      handleInActivePopup();
    }
  }, [isActive, link]);

  // 팝업 활성
  const handleActivePopup = () => {
    document.body.style.position = 'fixed';

    if (ref.current) {
      ref.current.style.transition = 'none';
      ref.current.style.left = `${xPos}px`;
      ref.current.style.top = `${yPos}px`;
    }

    setTimeout(() => {
      if (ref.current) {
        ref.current.style.transition = 'all 0.5s';
        ref.current.style.top = '50%';
        ref.current.style.left = '50%';
        ref.current.style.transform = 'translate(-50%, -50%) scale(1)';
      }
    }, 0);
  };

  // 팝업 비활성
  const handleInActivePopup = () => {
    document.body.style.position = 'unset';

    if (ref.current) {
      ref.current.style.top = `${yPos}px`;
      ref.current.style.left = `${xPos}px`;
      ref.current.style.transform = 'translate(-50%, -50%) scale(0)';
    }
  };

  return (
    <>
      <div
        className={
          isActive
            ? [styles.background, styles.isActive].join(' ')
            : styles.background
        }
        onClick={onClick}
      />
      <div className={styles.modalBody} ref={ref}></div>
    </>
  );
}

interface TypeAddUpdateViewPopup {
  isActive: boolean;
  xPos: number | undefined;
  yPos: number | undefined;
  link: TypeLink | undefined;
  onClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id?: string | undefined,
  ) => void;
}

export default AddUpdateViewPopup;
