import {forwardRef, useCallback, useState, MutableRefObject} from 'react';
import {useSelector} from 'react-redux';

import {selectAudioSource, selectDuration} from '../state';
import {useRefSelector} from '../useRefSelector';

import {Word} from './Word';

const isRef = (ref: any): ref is MutableRefObject<HTMLAudioElement> => {
  return !!ref.current;
};

export const Player = forwardRef<HTMLAudioElement>((_, ref) => {
  const audioSource = useSelector(selectAudioSource);

  const [percent, setPercent] = useState(100);

  const inaccurateDuration = useRefSelector(selectDuration);

  const handleTimeUpdate = useCallback(() => {
    const audio = isRef(ref) && ref.current;

    // When a new source is fed, currentTime is changed to 0 and thus "change"
    // To ignore this, we check for the proper ready state
    if (audio) {
      if (audio.readyState !== 0) {
        const {currentTime, duration: accurateDuration} = audio;
        // Sometimes the API is unable to return duration, so we use the one on redux
        const duration = Number.isFinite(accurateDuration)
          ? accurateDuration
          : inaccurateDuration.current;

        const rawPercent = (currentTime / duration) * 100;

        setPercent(rawPercent);
      } else {
        setPercent(100);
      }
    }
  }, [ref, inaccurateDuration]);

  // Since we sometimes use inaccurate duration, we need to force 100% when ended
  const handleEnded = useCallback(() => {
    setPercent(100);
  }, []);

  /**
   * Note on iOS interactions
   * The autoPlay attribute works as long as the user has interacted with the site
   * ie: the first recording doesn't work but any subsequent will work
   * onLoadedData doesn't work "on loaded data" but only after the user interacts
   * then does it load data
   */
  return (
    <>
      <audio
        ref={ref}
        autoPlay
        src={audioSource}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
      <Word percent={percent} />
    </>
  );
});
