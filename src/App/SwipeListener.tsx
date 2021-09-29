import {RefObject} from 'react';

import {useSelector} from 'react-redux';

import {
  selectStatus,
  actions,
  selectFailedList,
  selectPassedList,
  useAppDispatch,
  selectRemainingList,
  selectSubject,
} from '../state';
import {SwipeAction, useSwipe} from '../useSwipe';
import {useRefSelector} from '../useRefSelector';

type Props = {
  audioRef: RefObject<HTMLAudioElement>;
};

const Ready = ({audioRef}: Props) => {
  const handleSwipe = (action: SwipeAction) => {};

  useSwipe(handleSwipe);

  return <></>;
};

const Completed = () => {
  const passed = useSelector(selectPassedList).length;
  const failed = useSelector(selectFailedList).length;

  const dispatch = useAppDispatch();

  const handleSwipe = (direction: SwipeAction) => {
    switch (direction) {
      case 'left': {
        if (failed) {
          dispatch(actions.doFailedList());
        }
        return;
      }
      case 'right': {
        if (passed) {
          dispatch(actions.doPassedList());
        }
        return;
      }
      case 'up': {
        dispatch(actions.resetLists());
        return;
      }
    }
  };

  useSwipe(handleSwipe);

  return <></>;
};

const Settings = () => {
  const passed = useSelector(selectPassedList).length;
  const failed = useSelector(selectFailedList).length;
  const remaining = useSelector(selectRemainingList).length;
  const subject = useSelector(selectSubject);

  const dispatch = useAppDispatch();

  const canDoFailed = failed && subject !== 'failed';
  const canDoPassed = passed && subject !== 'passed';

  const hasRemaining = remaining && subject !== 'remaining';
  const canRestart = !!(passed || failed);

  // TODO: Ugh
  const handleSwipe = (direction: SwipeAction) => {
    switch (direction) {
      case 'left': {
        if (canDoFailed) {
          dispatch(actions.doFailedList());
        }
        return;
      }
      case 'right': {
        if (canDoPassed) {
          dispatch(actions.doPassedList());
        }
        return;
      }
      case 'up': {
        if (canRestart) {
          dispatch(actions.resetLists());
        }
        return;
      }
      case 'down': {
        if (hasRemaining) {
          dispatch(actions.doRemainingList());
        }
        return;
      }
    }
  };

  useSwipe(handleSwipe);

  return <></>;
};

export const SwipeListener = (props: Props) => {
  const status = useRefSelector(selectStatus);

  switch (status.current) {
    case 'ready':
      return <Ready {...props} />;
    case 'completed':
      return <Completed />;
    case 'settings':
      return <Settings />;
  }

  return <></>;
};
