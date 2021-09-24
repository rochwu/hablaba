import {FC, Children, ReactElement, CSSProperties} from 'react';

import styled from '@emotion/styled';
import {useSelector} from 'react-redux';

import {useSpring, animated} from 'react-spring';

import {MdSpaceBar, MdCheck, MdClose, MdUpdate, MdList} from 'react-icons/md';
import {GiSoundWaves, GiHamburger} from 'react-icons/gi';
import {CgCrown} from 'react-icons/cg';

import {
  selectAudioSource,
  selectIsRecording,
  selectPassedList,
  selectFailedList,
  useAppDispatch,
  actions,
  selectStatus,
  selectRemainingList,
  selectSubject,
} from '../state';
import {SwipeDirection, useSwipe} from '../useSwipe';

const Ul = styled.ul({
  listStyleType: 'none',
});

const Li = styled(animated.li)({});

const Centered = styled.span({
  verticalAlign: 'middle',
});

const AnimatedInstruction: FC<{style: CSSProperties}> = ({
  children,
  ...props
}) => {
  const style = useSpring(props.style);

  return <Li style={style}>{children}</Li>;
};

const Instruction: FC<{style?: CSSProperties}> = ({children, style}) => {
  // Normalize for fragments
  const normal =
    Children.count(children) === 1
      ? (Children.toArray(children)[0] as ReactElement).props.children
      : children;

  const elements = Children.map(normal, (child, index) => {
    if (index === 0) {
      return <Centered>{child}</Centered>;
    } else {
      return <>{child}</>;
    }
  });

  if (style) {
    return <AnimatedInstruction style={style}>{elements}</AnimatedInstruction>;
  } else {
    return <Li>{elements}</Li>;
  }
};

const Subject = styled.span({
  fontWeight: 'bold',
});

const Divider = styled.div({
  marginTop: '3px',
});

const BigDivider = styled.div({
  marginTop: '1em',
});

const getDisableProps = (condition: any) => {
  if (!condition) {
    return {
      style: {
        color: `#f4f4f4`,
      },
      'aria-hidden': true,
    };
  } else {
    return {
      style: {
        color: 'black',
      },
    };
  }
};

const Playing = () => {
  const hasAudio = !!useSelector(selectAudioSource);
  const isRecording = useSelector(selectIsRecording);

  const hasAudioProps = getDisableProps(hasAudio);

  return (
    <>
      <Instruction>
        {isRecording ? (
          <>
            <MdSpaceBar /> let go of <Subject>space</Subject> to stop
          </>
        ) : (
          <>
            <MdSpaceBar /> hold <Subject>space</Subject> to record
          </>
        )}
      </Instruction>
      <Divider />
      <Instruction {...hasAudioProps}>
        <MdCheck /> <Subject>swipe right</Subject> to pass
      </Instruction>
      <Instruction {...hasAudioProps}>
        <MdClose /> <Subject>swipe left</Subject> to fail
      </Instruction>
      <Divider />
      <Instruction {...hasAudioProps}>
        <GiSoundWaves /> <Subject>swipe up</Subject> to replay recording
      </Instruction>
    </>
  );
};

const Beat = () => {
  const passed = useSelector(selectPassedList).length;
  const failed = useSelector(selectFailedList).length;

  const dispatch = useAppDispatch();

  // TODO: Why tf are there two swipes listeners (for now) on my app
  // And how tf am I gonna handle stuff when I have to juggle all the different states
  // Update: there are now 3 of these shits, what garbage...
  const handleSwipe = (direction: SwipeDirection) => {
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

  // Ummmmm... finished shouldn't be li... you know aria something something
  return (
    <>
      <Instruction>
        <CgCrown style={{backgroundColor: 'yellow', borderRadius: '1px'}} />{' '}
        <Subject>finished!</Subject>
      </Instruction>
      <BigDivider />
      <Instruction {...getDisableProps(failed)}>
        <MdClose /> <Subject>swipe left</Subject> to retry {failed} failed words
      </Instruction>
      <Divider />
      <Instruction>
        <MdUpdate /> <Subject>swipe up</Subject> to restart
      </Instruction>
      <Divider />
      <Instruction {...getDisableProps(passed)}>
        <MdCheck /> <Subject>swipe right</Subject> to retry {passed} passed
        words
      </Instruction>
    </>
  );
};

const Settings = () => {
  const passed = useSelector(selectPassedList).length;
  const failed = useSelector(selectFailedList).length;
  const remaining = useSelector(selectRemainingList).length;
  const subject = useSelector(selectSubject);

  const dispatch = useAppDispatch();

  const canDoFailed = failed && subject !== 'failed';
  const canDoPassed = passed && subject !== 'passed';

  const hasRemaining = subject !== 'remaining';
  const canRestart = !!(passed || failed);

  // TODO: Ugh
  const handleSwipe = (direction: SwipeDirection) => {
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

  return (
    <>
      <Instruction>
        <GiHamburger style={{color: '#EE851C', borderRadius: '1px'}} />{' '}
        <Subject>settings</Subject>
      </Instruction>
      <BigDivider />
      <Instruction {...getDisableProps(canDoFailed)}>
        <MdClose /> <Subject>swipe left</Subject> to retry {failed} failed words
      </Instruction>
      <Divider />
      <Instruction {...getDisableProps(canRestart)}>
        <MdUpdate /> <Subject>swipe up</Subject> to restart
      </Instruction>
      <Divider />
      <Instruction {...getDisableProps(canDoPassed)}>
        <MdCheck /> <Subject>swipe right</Subject> to retry {passed} passed
        words
      </Instruction>
      <Divider />
      <Instruction {...getDisableProps(hasRemaining)}>
        <MdList /> <Subject>swipe down</Subject> to return to main list,{' '}
        {remaining} words
      </Instruction>
    </>
  );
};

export const Instructions = () => {
  const status = useSelector(selectStatus);

  let element;
  switch (status) {
    case 'ready':
      element = <Playing />;
      break;
    case 'completed':
      element = <Beat />;
      break;
    case 'settings':
      element = <Settings />;
      break;
  }

  return <Ul aria-label="app controls">{element}</Ul>;
};
