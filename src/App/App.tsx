import styled from '@emotion/styled';

import {useKeyEffect} from './useKeyEffect';
import {useBrowserOverrides} from './useBrowserOverrides';

import {Word} from './Word';
import {Playback} from './Playback';
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
        <Word />
        <Progress />
        <Playback />
        <Instructions />
      </Container>
      <System />
    </>
  );
};
