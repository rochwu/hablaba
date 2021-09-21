import {createContext, FC, useContext, useRef} from 'react';
import {actions, useAppDispatch} from './state';

type Type = {
  start: () => void;
  stop: () => void;
  recorder: MediaRecorder;
};

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
        dispatch(actions.stop(Date.now() - ellapsed.current));
      }
    },
    start: () => {
      if (recorder.state !== 'recording') {
        recorder.start();
        ellapsed.current = Date.now();
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

  const context = {
    start,
    stop,
    recorder,
  };

  return (
    <RecorderContext.Provider value={context}>
      {children}
    </RecorderContext.Provider>
  );
};
