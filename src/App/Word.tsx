import styled from '@emotion/styled';
import {useSelector} from 'react-redux';

import {useSpring, animated} from 'react-spring';

import {selectWord} from '../state';

type Props = {
  percent: number;
};

const Container = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end', // iOS
  height: `120px`, // Golden ratio of 390 is 240
  marginBottom: `7px`,
});

const AnimatedText = styled(animated.span)({
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

export const Word = ({percent}: Props) => {
  const word = useSelector(selectWord);

  const [style, api] = useSpring(() => toStyle());

  if (Number.isFinite(percent)) {
    api.start(toStyle(percent));
  } else {
    api.start(toStyle());
  }

  // Trial and error with widest character in font
  const fontSize = word.length > 7 ? `3em` : `4em`;

  return (
    <Container>
      <AnimatedText style={{...style, fontSize}}>{word}</AnimatedText>
    </Container>
  );
};
