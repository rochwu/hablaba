import {throttle} from 'lodash';

import {SwipeDirection} from './types';
import {notifySubscribers} from './state';

let lastDelta = 0;
let lastIncreasing = false;

// TODO: See if I need to do anything for other laptops, since MacOS uses momentum
export const handleWheel = ({deltaY, deltaX}: WheelEvent) => {
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
    let direction: SwipeDirection;
    if (absX >= absY) {
      direction = deltaX >= 0 ? 'left' : 'right';
    } else {
      direction = deltaY >= 0 ? 'up' : 'down';
    }

    notifySubscribers(direction);
    lastDelta = 0;
    lastIncreasing = false;
    return;
  }

  lastIncreasing = increasing;
  lastDelta = delta;
};

export const throttledHandleWheel = throttle(handleWheel, 333, {leading: true});
