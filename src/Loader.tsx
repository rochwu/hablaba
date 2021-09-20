import {useEffect, useState} from 'react';

import {actions, useAppDispatch} from './state';
import {useBrowserOverrides} from './useBrowserOverrides';

import {RecorderProvider} from './RecorderProvider';
import {App} from './App';

const MIME_TYPE = 'audio/webm;codecs=opus';

const Loading = () => {
  return (
    <span>
      This is the big loading message, either something fucked up pretty bad or
      I'm not on Chrome or I don't even know what is going on, but anyways tough
      luck. Actually, maybe one of my dependencies got borked. Oh, did you got
      to allow mic.
    </span>
  );
};

export const Loader = () => {
  const dispatch = useAppDispatch();

  const [recorder, setRecorder] = useState<MediaRecorder | undefined>();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({audio: true}).then((stream) => {
      const recorder = new MediaRecorder(stream, {mimeType: MIME_TYPE});

      recorder.ondataavailable = ({data}) => {
        const audioSource = window.URL.createObjectURL(
          new Blob([data], {type: MIME_TYPE}),
        );

        dispatch(actions.save(audioSource));
      };

      setRecorder(recorder);
    });
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 500);
  }, []);

  useBrowserOverrides();

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
