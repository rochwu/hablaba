import {useCallback, useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';

import {actions, selectAudioSource, useAppDispatch} from '../state';

import {SwipeDirection, useSwipe} from '../useSwipe';

export const Playback = () => {
  const audioSource = useSelector(selectAudioSource);
  const dispatch = useAppDispatch();

  // Prevents multiple dispatches since wheel events are sensitive
  const disabled = useRef(true);

  const ref = useRef<HTMLAudioElement>(null);

  const replay = useCallback(() => {
    const audio = ref.current;

    if (audio) {
      if (audio.paused) {
        audio.play();
      } else {
        audio.currentTime = 0;
      }
    }
  }, []);
  const pass = useCallback(() => dispatch(actions.pass()), [dispatch]);
  const fail = useCallback(() => dispatch(actions.fail()), [dispatch]);

  const handleSwipe = (direction: SwipeDirection) => {
    if (disabled.current) {
      return;
    }

    switch (direction) {
      case 'left': {
        fail();
        disabled.current = true;
        return;
      }
      case 'right': {
        pass();
        disabled.current = true;
        return;
      }
      case 'up': {
        replay();
        return;
      }
      case 'down': {
        return;
      }
    }
  };

  useSwipe(handleSwipe);

  // Listens for new audioSource
  useEffect(() => {
    if (audioSource) {
      disabled.current = false;
    }
  }, [audioSource]);

  useEffect(() => {
    const audio = ref.current;

    if (audio) {
      audio.addEventListener('loadeddata', () => {
        audio.play();
      });
    }
  }, []);

  const handleTimeUpdate = () => {
    const audio = ref.current;

    if (audio) {
      const {currentTime, duration} = audio;
      const rawPercent = (currentTime / duration) * 100;
      const percent = rawPercent.toFixed(0);

      console.warn(currentTime, duration, percent);
    }
  };

  return <audio ref={ref} src={audioSource} onTimeUpdate={handleTimeUpdate} />;

  // if (audioSource) {
  //   return <audio ref={ref} autoPlay src={audioSource} />;
  // } else {
  //   return <></>;
  // }
};
