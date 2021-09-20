import {useEffect} from 'react';

export const useBrowserOverrides = () => {
  // Suppresses browser stuff
  useEffect(() => {
    // We don't do this on the main one so they can go back/forwards
    document.body.style.overscrollBehavior = 'none';
  }, []);
};
