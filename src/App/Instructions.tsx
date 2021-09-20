import styled from '@emotion/styled';

import {MdSpaceBar, MdCheck, MdClose} from 'react-icons/md';
import {GiSoundWaves} from 'react-icons/gi';
import {useSelector} from 'react-redux';
import {selectAudioSource, selectIsRecording} from '../state';
import {CSSProperties} from 'react';

const Container = styled.ul({
  display: 'flex',
  flexDirection: 'column',
});

const Instruction = styled.li({
  display: 'flex',
});

const Subject = styled.span({
  fontWeight: 'bold',
});

const Divider = styled.div({
  marginTop: '3px',
});

export const Instructions = () => {
  const hasAudio = !!useSelector(selectAudioSource);
  const isRecording = useSelector(selectIsRecording);

  const hasAudioProps = !hasAudio
    ? {
        style: {
          visibility: 'hidden',
        } as CSSProperties, // 'hidden' was typed as 'string'
      }
    : undefined;

  return (
    <Container aria-label="app controls">
      <Instruction>
        <MdSpaceBar />
        &nbsp;
        {isRecording ? (
          <>
            <span>let go of</span>
            &nbsp;
            <Subject>space</Subject>
            &nbsp;
            <span>to stop</span>
          </>
        ) : (
          <>
            <span>hold</span>
            &nbsp;
            <Subject>space</Subject>
            &nbsp;
            <span>to record</span>
          </>
        )}
      </Instruction>
      <Instruction {...hasAudioProps}>
        <MdCheck />
        &nbsp;
        <Subject>swipe right</Subject>
        &nbsp;
        <span>to pass</span>
      </Instruction>
      <Instruction {...hasAudioProps}>
        <MdClose />
        &nbsp;
        <Subject>swipe left</Subject>
        &nbsp;
        <span>to fail</span>
      </Instruction>
      <Divider />
      <Instruction {...hasAudioProps}>
        <GiSoundWaves />
        &nbsp;
        <Subject>swipe up</Subject>
        &nbsp;
        <span>to replay recording</span>
      </Instruction>
    </Container>
  );
};
