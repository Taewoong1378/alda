import { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { motion } from 'framer-motion';

import styles from './Overlay.module.scss';

interface PortalProps {
  children: ReactNode;
  isBackgroundBlack?: boolean;
  onClickBackground?: () => void;
}

export const Portal = ({ children, isBackgroundBlack = true, onClickBackground }: PortalProps) => {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>('#portal');
    document.body.style.overflow = 'hidden';
    setMounted(true);
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, []);

  return mounted && ref.current
    ? createPortal(
        <div>
          <motion.div
            onClick={onClickBackground}
            initial={{ background: 'rgba(13, 19, 23, 0)' }}
            animate={
              isBackgroundBlack
                ? { background: 'rgba(13, 19, 23, 0.4)' }
                : { background: 'rgba(13, 19, 23, 0)' }
            }
            exit={{ background: 'rgba(13, 19, 23, 0)' }}
            className={styles.overlay}>
            {children}
          </motion.div>
        </div>,
        ref.current,
      )
    : null;
};
