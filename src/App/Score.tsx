import styled, {CSSObject} from '@emotion/styled';
import {useSelector} from 'react-redux';
import {selectFailedList, selectPassedList, selectSubject} from '../state';

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

  const subject = useSelector(selectSubject);
  const underline = {textDecoration: 'underline'};
  const failedUnderlined = subject === 'failed' ? underline : undefined;
  const passedUnderlined = subject === 'passed' ? underline : undefined;

  return (
    <Container>
      <Left aria-label="fail count" style={failedUnderlined}>
        {failedList.length}
      </Left>
      <Divider />
      <Right aria-label="pass count" style={passedUnderlined}>
        {passedList.length}
      </Right>
    </Container>
  );
};
