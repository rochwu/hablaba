import {useEffect} from 'react';

import {useRecorder} from '../RecorderProvider';
import {selectIsReady} from '../state';
import {useRefSelector} from '../useRefSelector';

export const useKeyListener = () => {
  const {start, stop} = useRecorder();
  const canRecord = useRefSelector(selectIsReady);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (canRecord.current && event.key === ' ') {
        event.preventDefault(); // Scrolls
        start();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (canRecord.current && event.key === ' ') {
        event.preventDefault(); // Scrolls
        stop();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [canRecord, start, stop]);
};
