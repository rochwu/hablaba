import styled from '@emotion/styled';
import {useSelector} from 'react-redux';
import {useSpring, animated} from 'react-spring';
import {SiAudiomack} from 'react-icons/si';

import {selectIsRecording} from '../state';

const Container = styled.div({
  position: 'absolute',
  top: '7px',
  right: '14px',
});

const Icon = styled(SiAudiomack)({
  height: '3em',
  width: 'auto',
});

export const REC = () => {
  const isRecording = useSelector(selectIsRecording);

  const {x} = useSpring({
    reset: isRecording,
    cancel: !isRecording,
    loop: true,
    from: {x: 0},
    x: isRecording ? 1 : 0,
    config: {duration: 1000},
  });

  return (
    <Container>
      <animated.div
        style={{
          transform: x
            .to({
              range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
              output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1],
            })
            .to((x) => `scale(${x})`),
        }}
      >
        <Icon style={{color: isRecording ? 'IndianRed' : '#fdfdfd'}} />
      </animated.div>
    </Container>
  );
};
