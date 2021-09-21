import {useEffect, useRef} from 'react';

import {SwipeHandler} from './types';
import {subscribe, withoutSubscribers} from './state';

import {throttledHandleWheel} from './handleWheel';

// TODO: touchstart/move/end for iOS
export const useSwipe = (handler: SwipeHandler) => {
  const callback = useRef(handler);

  useEffect(() => {
    callback.current = handler;
  }, [handler]);

  useEffect(() => {
    withoutSubscribers(() => {
      document.addEventListener('wheel', throttledHandleWheel);
    });

    const unsubscribe = subscribe(callback);

    return () => {
      unsubscribe();

      withoutSubscribers(() => {
        document.removeEventListener('wheel', throttledHandleWheel);
      });
    };
  }, []);
};
