import styled from '@emotion/styled';

import {useKeyEffect} from './useKeyEffect';
import {useBrowserOverrides} from './useBrowserOverrides';

import {Player} from './Player';
import {System} from './System';
import {REC} from './REC';
import {Instructions} from './Instructions';
import {Progress} from './Progress';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
});

export const App = () => {
  useBrowserOverrides();
  useKeyEffect();

  return (
    <>
      <Container>
        <REC />
        <Player />
        <Progress />
        <Instructions />
      </Container>
      <System />
    </>
  );
};
