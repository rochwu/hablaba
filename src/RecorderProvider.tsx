import {createContext, FC, useContext, useEffect, useRef} from 'react';

import {actions, useAppDispatch} from './state';

type Type = {
  start: () => void;
  stop: () => void;
};

// TODO: See how it fairs on Mobile Chrome
const MIME_TYPE = 'audio/webm;codecs=opus';

const RecorderContext = createContext<Type>({} as any);

export const useRecorder = () => {
  return useContext(RecorderContext);
};

type Acts = 'start' | 'stop';

export const RecorderProvider: FC<{recorder: MediaRecorder}> = ({
  children,
  recorder,
}) => {
  const dispatch = useAppDispatch();
  const ellapsed = useRef(0);

  const effects = {
    stop: () => {
      if (recorder.state !== 'inactive') {
        recorder.stop();
        dispatch(actions.stop((performance.now() - ellapsed.current) / 1000));
      }
    },
    start: () => {
      if (recorder.state !== 'recording') {
        recorder.start();
        ellapsed.current = performance.now();
        dispatch(actions.start());
      }
    },
  };

  const recordingState = (act: Acts) => {
    switch (act) {
      case 'stop': {
        effects.stop();
      }
    }
  };

  const pausedState = (action: Acts) => {
    switch (action) {
      case 'stop': {
        effects.stop();
      }
    }
  };

  const inactiveState = (action: Acts) => {
    switch (action) {
      case 'start': {
        effects.start();
      }
    }
  };

  // Wonder if I like state machines
  const controller = (action: Acts) => {
    switch (recorder.state) {
      case 'recording': {
        recordingState(action);
        return;
      }
      case 'paused': {
        pausedState(action);
        return;
      }
      case 'inactive':
      default: {
        inactiveState(action);
        return;
      }
    }
  };

  const start = () => {
    controller('start');
  };

  const stop = () => {
    controller('stop');
  };

  useEffect(() => {
    recorder.ondataavailable = ({data}) => {
      const audioSource = window.URL.createObjectURL(
        new Blob([data], {type: MIME_TYPE}),
      );

      dispatch(actions.save(audioSource));
    };
  }, [recorder, dispatch]);

  const context = {
    start,
    stop,
  };

  return (
    <RecorderContext.Provider value={context}>
      {children}
    </RecorderContext.Provider>
  );
};
