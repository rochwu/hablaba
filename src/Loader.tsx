import {useEffect, useState} from 'react';
import styled from '@emotion/styled';

import {actions, useAppDispatch} from './state';

import {RecorderProvider} from './RecorderProvider';
import {App} from './App';

const MIME_TYPE = 'audio/webm;codecs=opus';

const Container = styled.div({
  aspectRatio: '9 / 16',
  height: '100vh', // Used to enforce aspect ratio
  margin: `0 auto`,
});

const Loading = () => {
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

export const Loader = () => {
  const dispatch = useAppDispatch();

  const [recorder, setRecorder] = useState<MediaRecorder | undefined>();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      navigator.mediaDevices
        .getUserMedia({audio: true})
        .then((stream) => {
          // Don't use `mimeType` iOS Chrome doesn't like it
          const recorder = new MediaRecorder(stream);

          recorder.ondataavailable = ({data}) => {
            const audioSource = window.URL.createObjectURL(
              new Blob([data], {type: MIME_TYPE}),
            );

            dispatch(actions.save(audioSource));
          };

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
    if (recorder) {
      return (
        <RecorderProvider recorder={recorder}>
          <App />
        </RecorderProvider>
      );
    } else {
      return <Loading />;
    }
  }

  return <></>;
};

export default () => {
  return (
    <Container>
      <Loader />
    </Container>
  );
};
