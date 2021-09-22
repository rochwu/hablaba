import {MutableRefObject} from 'react';

import {SwipeDirection, SwipeHandler} from './types';

type Callback = MutableRefObject<SwipeHandler>;

// "state" lol, global variables
const subscribers: Callback[] = [];

export const unsubscribe = (callback: Callback) => {
  const found = subscribers.indexOf(callback);
  subscribers.splice(found, 1);
};

/**
 * Returns unsubscribe function
 */
export const subscribe = (callback: Callback) => {
  subscribers.push(callback);

  return () => unsubscribe(callback);
};

export const withoutSubscribers = (method: () => void) => {
  if (!subscribers.length) {
    method();
  }
};

export const notifySubscribers = (direction: SwipeDirection) => {
  subscribers.forEach((subscriber) => subscriber.current(direction));
};
