import {createRef} from 'react';
import styled from '@emotion/styled';

import {useRecord} from './useRecord';
import {useBrowserOverrides} from './useBrowserOverrides';

import {Player} from './Player';
import {System} from './System';
import {REC} from './REC';
import {Instructions} from './Instructions';
import {Score} from './Score';
import {Settings} from './Settings';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
});

export const App = () => {
  useBrowserOverrides();
  useRecord();

  // TODO: I would like better separation between Player and Instructions
  const audioRef = createRef<HTMLAudioElement>();

  return (
    <>
      <Container>
        <Settings />
        <REC />
        <Player ref={audioRef} />
        <Score />
        <Instructions audioRef={audioRef} />
      </Container>
      <System />
    </>
  );
};
