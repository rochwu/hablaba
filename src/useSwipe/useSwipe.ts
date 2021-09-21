import {useEffect, useRef} from 'react';

import {throttle} from 'lodash';

import {SwipeHandler} from './types';

// TODO: touchstart/move/end for iOS
export const useSwipe = (handler: SwipeHandler, wait: number = 333) => {
  const callback = useRef(handler);
  const waitInitOnly = useRef(wait);

  useEffect(() => {
    callback.current = handler;
  }, [handler]);

  useEffect(() => {
    let lastDelta = 0;
    let lastIncreasing = false;

    const handleWheel = ({deltaY, deltaX}: WheelEvent) => {
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      const delta = absX >= absY ? absX : absY;

      let increasing;
      if (lastDelta < delta) {
        increasing = true;
      } else if (lastDelta > delta) {
        increasing = false;
      } else {
        return;
      }

      // When the curve start to increase, it should be the start of a new gesture
      if (lastIncreasing === false && increasing === true) {
        if (absX >= absY) {
          callback.current(deltaX >= 0 ? 'left' : 'right');
        } else {
          callback.current(deltaY >= 0 ? 'up' : 'down');
        }
      }

      lastIncreasing = increasing;
      lastDelta = delta;
    };

    const handler = throttle(handleWheel, waitInitOnly.current, {
      leading: true,
    });
    document.addEventListener('wheel', handler);

    return () => {
      document.removeEventListener('wheel', handler);
    };
  }, []);
};
