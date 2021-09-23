import {useEffect, useState} from 'react';
import styled from '@emotion/styled';

import {useAppDispatch} from './state';

import {RecorderProvider} from './RecorderProvider';
import {App} from './App';

const Container = styled.div({
  aspectRatio: '9 / 16',
  height: '100vh', // Used to enforce aspect ratio
  margin: `0 auto`,
  backgroundColor: 'white', // TODO: Maybe think about night mode
});

const LoadFailed = () => {
  return (
    <div style={{margin: '1em'}}>
      <span>
        This is the big loading message, either something fucked up pretty bad
        or I'm not on Chrome or I don't even know what is going on, but anyways
        tough luck. Actually, maybe one of my dependencies got borked. Oh, did
        you allow mic?
      </span>
    </div>
  );
};

const MediaLoader = () => {
  const dispatch = useAppDispatch();

  const [recorder, setRecorder] = useState<MediaRecorder | undefined>();
  const [loaded, setLoaded] = useState(false);

  // TODO: Feature checks when I am less lazy
  const hasChrome = navigator.userAgent.indexOf('Chrome') !== -1;

  useEffect(() => {
    try {
      navigator.mediaDevices
        .getUserMedia({audio: true})
        .then((stream) => {
          // Don't use `mimeType` iOS Chrome doesn't like it
          const recorder = new MediaRecorder(stream);

          setRecorder(recorder);
        })
        .catch(() => {
          console.error('Oi 🤌 why did you come for if not for speech');
        });
    } catch {
      console.error(`I wouldn't know why I failed here to be honest 🤷`);
    }
  }, [dispatch]);

  // TODO: Maybe add an actual loading screen
  // Mostly used to skip the loading screen
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 500);
  }, []);

  // TODO: Finish the three states here, I'd like to make a loading screen
  if (loaded) {
    if (hasChrome && recorder) {
      return (
        <RecorderProvider recorder={recorder}>
          <App />
        </RecorderProvider>
      );
    } else {
      return <LoadFailed />;
    }
  }

  return <></>;
};

export const Loader = () => {
  return (
    <Container>
      <MediaLoader />
    </Container>
  );
};
