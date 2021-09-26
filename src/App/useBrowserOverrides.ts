import {useEffect} from 'react';
import {isTouchable} from '../isTouchable';

export const useBrowserOverrides = () => {
  // Suppresses browser stuff
  useEffect(() => {
    // We don't do this on the main one so they can go back/forwards
    document.body.style.overscrollBehavior = 'none';
    document.body.style.overflow = 'hidden'; // iOS bouncy scroll, but it also messes refresh

    if (isTouchable) {
      document.body.style.webkitUserSelect = 'none';
    }
  }, []);
};
