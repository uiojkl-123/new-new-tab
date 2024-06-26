import { useVisibilityStore } from '@root/src/stores/NewTab/visibilityStore';
import { useEffect } from 'react';

export const useVisibility = () => {
  const setVisibility = useVisibilityStore(state => state.setVisibility);
  const visibility = useVisibilityStore(state => state.visibility);

  useEffect(() => {
    document.addEventListener(
      'visibilitychange',
      () => {
        setVisibility(document.visibilityState === 'visible');
      },
      false
    );

    return () => {
      document.removeEventListener(
        'visibilitychange',
        () => {
          setVisibility(document.visibilityState === 'visible');
        },
        false
      );
    };
  }, [setVisibility]);

  return { visibility };
};
