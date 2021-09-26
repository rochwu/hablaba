import {useEffect, useRef} from 'react';

import {isTouchable} from '../isTouchable';

import {SwipeHandler} from './types';
import {subscribe, withoutSubscribers} from './state';

import {throttledHandleWheel} from './handleWheel';
import {handleTouchStart, handleTouchMove, handleTouchEnd} from './handleTouch';

// TODO: touchstart/move/end for iOS
export const useSwipe = (handler: SwipeHandler) => {
  const callback = useRef(handler);

  useEffect(() => {
    callback.current = handler;
  }, [handler]);

  useEffect(() => {
    withoutSubscribers(() => {
      document.addEventListener('wheel', throttledHandleWheel);

      if (isTouchable) {
        document.addEventListener('touchstart', handleTouchStart);
        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleTouchEnd);
      }
    });

    const unsubscribe = subscribe(callback);

    return () => {
      unsubscribe();

      withoutSubscribers(() => {
        document.removeEventListener('wheel', throttledHandleWheel);

        if (isTouchable) {
          document.removeEventListener('touchstart', handleTouchStart);
          document.removeEventListener('touchmove', handleTouchMove);
          document.removeEventListener('touchend', handleTouchEnd);
        }
      });
    };
  }, []);
};
