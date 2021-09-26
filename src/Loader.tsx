import {FC, useEffect, useState} from 'react';
import styled from '@emotion/styled';

import {useAppDispatch} from './state';

import {RecorderProvider} from './RecorderProvider';
import {App} from './App';

const Container = styled.div({
  width: `100%`,
  margin: `0 auto`,
  backgroundColor: 'white', // TODO: Maybe think about night mode
});

const ErrorMessage = styled.div({
  margin: `1em`,
});

const Emoji: FC = ({children, ...props}) => (
  <span {...props} role="img">
    {children}
  </span>
);

const MediaLoader = () => {
  const dispatch = useAppDispatch();

  const [recorder, setRecorder] = useState<MediaRecorder | undefined>();

  const [status, setStatus] = useState<
    'loading' | 'ready' | 'unsupported' | 'declined'
  >('loading');

  useEffect(() => {
    try {
      navigator.mediaDevices
        .getUserMedia({audio: true})
        .then((stream) => {
          // Don't use `mimeType` iOS Chrome doesn't like it
          const recorder = new MediaRecorder(stream);

          setRecorder(recorder);
          setStatus('ready');
        })
        .catch((error) => {
          console.error(error);
          setStatus('declined');
        });
    } catch {
      setStatus('unsupported');
    }
  }, [dispatch]);

  switch (status) {
    case 'loading':
      return <></>;
    case 'ready':
      return (
        <RecorderProvider recorder={recorder!}>
          <App />
        </RecorderProvider>
      );
    case 'declined':
      return (
        <ErrorMessage>
          Oi <Emoji aria-hidden={true}>🤌</Emoji> why would you be here and not
          allow mic
        </ErrorMessage>
      );
    case 'unsupported':
    default:
      return (
        <ErrorMessage>
          {/* eslint-disable jsx-a11y/accessible-emoji */}
          <Emoji aria-label="shrugs">🤷</Emoji> are you on Chrome? Cuz it only
          works on Chrome, sorta...
        </ErrorMessage>
      );
  }
};

export const Loader = () => {
  return (
    <Container>
      <MediaLoader />
    </Container>
  );
};
