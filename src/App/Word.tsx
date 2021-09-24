import {useState, RefObject, useEffect, useCallback} from 'react';
import styled from '@emotion/styled';
import {useSelector} from 'react-redux';

import {useSpring, animated} from 'react-spring';

import {selectDuration, selectWord} from '../state';
import {useRefSelector} from '../useRefSelector';

const Container = styled.div({
  display: 'flex',
  justifyContent: 'center',
  marginTop: `2em`,
  marginBottom: `7px`,
});

const AnimatedText = styled(animated.span)({
  fontSize: `4em`,

  backgroundClip: 'text', // Makes backgroundImage only affect text
  WebkitTextStroke: '1px black',
  WebkitTextFillColor: 'transparent', // Makes backgroundImage seeing through text

  // Black starts first so it can move to the right =>
  backgroundImage: `linear-gradient(to right, black 50%, white 50%)`,
  /**
   * Since the backgroundImage is 50% white, 50% black, when backgroundPosition is a percent
   * the other half is cyclical and shown, by making it 200%, we stretch it so that it's
   * 100% white, 100% black
   */
  backgroundSize: '200%',
});

const toStyle = (percent: number = 100) => {
  const position = (100 - percent).toFixed(0) + '%';

  return {
    backgroundPosition: position,
  };
};

export const AnimatedWord = ({percent}: {percent: number}) => {
  const word = useSelector(selectWord);

  const [style, api] = useSpring(() => toStyle());

  if (Number.isFinite(percent)) {
    api.start(toStyle(percent));
  } else {
    api.start(toStyle());
  }

  return <AnimatedText style={style}>{word || <>&nbsp;</>}</AnimatedText>;
};

export const Word = ({audioRef}: {audioRef: RefObject<HTMLAudioElement>}) => {
  const [percent, setPercent] = useState(100);

  const inaccurateDuration = useRefSelector(selectDuration);

  const handleTimeUpdate = useCallback(() => {
    const audio = audioRef.current;

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
  }, [audioRef, inaccurateDuration]);

  // Since we sometimes use inaccurate duration, we need to force 100% when ended
  const handleEnded = useCallback(() => {
    setPercent(100);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('ended', handleEnded);

      return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, [audioRef, handleTimeUpdate, handleEnded]);

  return (
    <Container>
      <AnimatedWord percent={percent} />
    </Container>
  );
};
