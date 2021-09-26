import {notifySubscribers} from './state';
import {SwipeDirection} from './types';

const SWIPE_CUTOFF = 5; // Change in coordinates
const PRESSED_CUTOFF = 200; // Delay to see whether long press

let averageX = 0;
let averageY = 0;

let lastX: number;
let lastY: number;

let events = 0;

let ended = true;
let pressed = false;

const updateAverage = (x: number, y: number) => {
  let newX = lastX - x;
  let newY = lastY - y;

  if (!events) {
    averageX = 0;
    averageY = 0;
  } else if (events === 1) {
    averageX = newX;
    averageY = newY;
  } else {
    averageX = (averageX * events + newX) / (events + 1);
    averageY = (averageY * events + newY) / (events + 1);
  }

  lastX = x;
  lastY = y;
  ++events;
};

export const handleTouchStart = (event: TouchEvent) => {
  events = 0;
  ended = false;
  pressed = false;

  const {screenX, screenY} = event.changedTouches[0];
  updateAverage(screenX, screenY);

  setTimeout(() => {
    if (ended) {
      return;
    }

    const deltaX = Math.abs(averageX);
    const deltaY = Math.abs(averageY);

    const delta = deltaY >= deltaX ? deltaY : deltaX;

    if (delta < SWIPE_CUTOFF) {
      notifySubscribers('pressed');
      ended = true;
      pressed = true;
    }
  }, PRESSED_CUTOFF);
};

export const handleTouchMove = (event: TouchEvent) => {
  if (!ended) {
    const {screenX, screenY} = event.changedTouches[0];
    updateAverage(screenX, screenY);
  }
};

export const handleTouchEnd = (event: TouchEvent) => {
  if (!ended) {
    const {screenX, screenY} = event.changedTouches[0];
    updateAverage(screenX, screenY);

    const deltaX = Math.abs(averageX);
    const deltaY = Math.abs(averageY);
    const delta = deltaY >= deltaX ? deltaY : deltaX;

    if (delta >= SWIPE_CUTOFF) {
      let direction: SwipeDirection;
      if (deltaY >= deltaX) {
        direction = averageY > 0 ? 'up' : 'down';
      } else {
        direction = averageX > 0 ? 'left' : 'right';
      }

      notifySubscribers(direction);
    }
  }

  if (pressed) {
    notifySubscribers('released');
  }

  ended = true;
};
