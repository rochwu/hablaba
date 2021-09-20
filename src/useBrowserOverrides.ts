import {useEffect} from 'react';

export const useBrowserOverrides = () => {
  // Suppresses browser stuff
  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.fontFamily = 'Lato, sans-sarif';
  }, []);
};
