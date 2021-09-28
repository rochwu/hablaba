import {useCallback, useRef} from 'react';
import {useSelector} from 'react-redux';

import {
  actions,
  selectAudioSource,
  selectIsReady,
  useAppDispatch,
} from '../state';
import {useRefSelector} from '../useRefSelector';

import {SwipeAction, useSwipe} from '../useSwipe';
import {Word} from './Word';

export const Player = () => {
  const audioSource = useSelector(selectAudioSource);
  const ready = useRefSelector(selectIsReady);

  const dispatch = useAppDispatch();

  // Prevents multiple dispatches since wheel events are sensitive
  const disabled = useRef(!audioSource);
  disabled.current = !audioSource;

  const ref = useRef<HTMLAudioElement>(null);

  const handleSwipe = useCallback(
    (direction: SwipeAction) => {
      if (ready.current && !disabled.current) {
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
                audio.play().catch((error) => {
                  // TODO: A way to report error on iOS
                  // TODO: Better yet, start the app with an iOS challenge
                  console.log(error);
                });
              } else {
                audio.currentTime = 0;
              }
            }

            return;
          }
        }
      }
    },
    [ready, dispatch],
  );

  useSwipe(handleSwipe);

  /**
   * Note on iOS interactions
   * The autoPlay attribute works as long as the user has interacted with the site
   * ie: the first recording doesn't work but any subsequent will work
   * onLoadedData doesn't work "on loaded data" but only after the user interacts
   * then does it load data
   */
  return (
    <>
      <audio ref={ref} autoPlay src={audioSource} />
      <Word audioRef={ref} />
    </>
  );
};
