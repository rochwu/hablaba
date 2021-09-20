import styled from '@emotion/styled';
import {useSelector} from 'react-redux';

import {selectWord} from '../state';

const Display = styled.span({
  fontSize: `4em`,
  fontWeight: 'bold'
});

const Container = styled.div({
  display: 'flex',
  justifyContent: 'center',
  marginTop: `2em`,
  marginBottom: `1em`,
});

export const Word = () => {
  const word = useSelector(selectWord);

  return (
    <Container>
      <Display>{word}</Display>
    </Container>
  );
};
