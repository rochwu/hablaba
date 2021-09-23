import styled, {CSSObject} from '@emotion/styled';
import {useSelector} from 'react-redux';
import {selectFailedList, selectPassedList} from '../state';

const Container = styled.div({
  display: 'flex',
  justifyContent: 'center',
});

const sharedStyle: CSSObject = {
  display: 'flex',
  fontWeight: 'bold',
  width: `50%`,
};

const Left = styled.span(sharedStyle, {
  justifyContent: 'flex-end',
  color: 'red',
});

const Right = styled.span(sharedStyle, {
  display: 'flex',
  color: 'green',
});

const Divider = styled.span({
  margin: '0 5px',
  backgroundColor: 'gray',
  width: '2px',
});

export const Score = () => {
  const passedList = useSelector(selectPassedList);
  const failedList = useSelector(selectFailedList);

  return (
    <Container>
      <Left aria-label="fail count">{failedList.length}</Left>
      <Divider />
      <Right aria-label="pass count">{passedList.length}</Right>
    </Container>
  );
};
