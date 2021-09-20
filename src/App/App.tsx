import styled from '@emotion/styled';

import {useKeyEffect} from './useKeyEffect';
import {useBrowserOverrides} from './useBrowserOverrides';

import {Word} from './Word';
import {Playback} from './Playback';
import {System} from './System';
import {REC} from './REC';
import {Instructions} from './Instructions';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  aspectRatio: '9 / 16',
  height: '100vh',
});

export const App = () => {
  useBrowserOverrides();

  useKeyEffect();

  return (
    <>
      <Container>
        <REC />
        <Word />
        <Playback />
        <Instructions />
      </Container>
      <System />
    </>
  );
};
