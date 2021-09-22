import {useCallback, useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';

import {actions, selectAudioSource, useAppDispatch} from '../state';

import {SwipeDirection, useSwipe} from '../useSwipe';
import {Word} from './Word';

export const Player = () => {
  const audioSource = useSelector(selectAudioSource);
  const dispatch = useAppDispatch();

  // Prevents multiple dispatches since wheel events are sensitive
  const disabled = useRef(!audioSource);
  disabled.current = !audioSource;

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

  const handleSwipe = useCallback(
    (direction: SwipeDirection) => {
      if (disabled.current) {
        return;
      }

      switch (direction) {
        case 'left': {
          fail();
          return;
        }
        case 'right': {
          pass();
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
    },
    [fail, pass, replay],
  );

  useSwipe(handleSwipe);

  useEffect(() => {
    const audio = ref.current;

    // TODO: disable autoplay on mobile
    if (audio) {
      const autoplay = () => {
        audio.play();
      };

      audio.addEventListener('loadeddata', autoplay);
      return () => {
        audio.removeEventListener('loadeddata', autoplay);
      };
    }
  }, []);

  return (
    <>
      <audio ref={ref} src={audioSource} />
      <Word audioRef={ref} />
    </>
  );
};
