import {useCallback, useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';

import {
  actions,
  selectAudioSource,
  selectCompleted,
  useAppDispatch,
} from '../state';

import {SwipeDirection, useSwipe} from '../useSwipe';
import {Word} from './Word';

export const Player = () => {
  const audioSource = useSelector(selectAudioSource);

  const dispatch = useAppDispatch();

  // Prevents multiple dispatches since wheel events are sensitive
  const disabled = useRef(!audioSource);
  disabled.current = !audioSource;

  const ref = useRef<HTMLAudioElement>(null);

  const handleSwipe = useCallback(
    (direction: SwipeDirection) => {
      if (!disabled.current) {
        switch (direction) {
          case 'left': {
            dispatch(actions.fail());
            return;
          }
          case 'right': {
            dispatch(actions.pass());
            return;
          }
          case 'up': {
            const audio = ref.current;

            if (audio) {
              if (audio.paused) {
                audio.play();
              } else {
                audio.currentTime = 0;
              }
            }

            return;
          }
        }
      }
    },
    [dispatch],
  );

  useSwipe(handleSwipe);

  useEffect(() => {
    const audio = ref.current;

    // TODO: disable autoplay on mobile, I mean it's disabled, but disable the code
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
