export type SwipeTouch = 'pressed' | 'released';
export type SwipeDirection = 'up' | 'right' | 'down' | 'left';

// Ugh, it isn't swipe anymore is it
export type SwipeAction = SwipeTouch | SwipeDirection;

export type SwipeHandler = (action: SwipeAction) => void;
