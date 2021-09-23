import {CSSProperties, FC, Children, ReactElement} from 'react';

import styled from '@emotion/styled';

import {MdSpaceBar, MdCheck, MdClose, MdUpdate, MdList} from 'react-icons/md';
import {GiSoundWaves, GiHamburger} from 'react-icons/gi';
import {CgCrown} from 'react-icons/cg';

import {useSelector} from 'react-redux';
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

const Container = styled.ul({
  listStyleType: 'none',
});

const Centered = styled.span({
  verticalAlign: 'middle',
});

const Li = styled.li({});

const Instruction: FC = ({children, ...props}) => {
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

  return <Li {...props}>{elements}</Li>;
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

const Playing = () => {
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
      {!!failed && (
        <>
          <Instruction>
            <MdClose /> <Subject>swipe left</Subject> to retry {failed} failed
            words
          </Instruction>
          <Divider />
        </>
      )}
      <Instruction>
        <MdUpdate /> <Subject>swipe up</Subject> to restart
      </Instruction>
      {!!passed && (
        <>
          <Divider />
          <Instruction>
            <MdCheck /> <Subject>swipe right</Subject> to retry {passed} passed
            words
          </Instruction>
        </>
      )}
    </>
  );
};

const Settings = () => {
  const passed = useSelector(selectPassedList).length;
  const failed = useSelector(selectFailedList).length;
  const remaining = useSelector(selectRemainingList).length;
  const subject = useSelector(selectSubject);

  const dispatch = useAppDispatch();

  // TODO: Ugh
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
        if (failed || passed) {
          dispatch(actions.resetLists());
        }
        return;
      }
      case 'down': {
        if (subject !== 'remaining') {
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
        <GiHamburger
          style={{backgroundColor: '#fcfcfc', borderRadius: '1px'}}
        />{' '}
        <Subject>settings</Subject>
      </Instruction>
      <BigDivider />
      {!!failed && (
        <Instruction>
          <MdClose /> <Subject>swipe left</Subject> to retry {failed} failed
          words
        </Instruction>
      )}
      {!!(failed || passed) && (
        <Instruction>
          <MdUpdate /> <Subject>swipe up</Subject> to restart
        </Instruction>
      )}
      {!!passed && (
        <Instruction>
          <MdCheck /> <Subject>swipe right</Subject> to retry {passed} passed
          words
        </Instruction>
      )}
      {subject !== 'remaining' && (
        <Instruction>
          <MdList /> <Subject>swipe down</Subject> to return to main list,{' '}
          {remaining} words
        </Instruction>
      )}
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

  return <Container aria-label="app controls">{element}</Container>;
};
