import {useCallback, useEffect} from 'react';

import {useRecorder} from '../RecorderProvider';
import {selectIsReady} from '../state';
import {useRefSelector} from '../useRefSelector';
import {SwipeAction, useSwipe} from '../useSwipe';

export const useRecord = () => {
  const {start, stop} = useRecorder();
  const canRecord = useRefSelector(selectIsReady);

  const handleTouch = useCallback(
    (action: SwipeAction) => {
      if (canRecord.current) {
        switch (action) {
          case 'pressed': {
            start();
            return;
          }
          case 'released': {
            stop();
            return;
          }
        }
      }
    },
    [canRecord, start, stop],
  );

  useSwipe(handleTouch);

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
