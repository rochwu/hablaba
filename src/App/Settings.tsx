import {useEffect, useRef} from 'react';

import styled from '@emotion/styled';
import {useSelector} from 'react-redux';
import {useSpring, animated} from 'react-spring';

import IconButton from '@mui/material/IconButton';
import {GiHamburger} from 'react-icons/gi';
import {MdClose} from 'react-icons/md';

import {actions, selectStatus, useAppDispatch} from '../state';

const Container = styled.div({
  position: 'absolute',
  top: '3px',
  left: '3px',
});

const Hamburger = animated(GiHamburger);
const Close = animated(MdClose);

const getDisplay = (flipped: boolean): 'none' | 'inline-flex' => {
  return flipped ? 'none' : 'inline-flex';
};

export const Settings = () => {
  const dispatch = useAppDispatch();
  const status = useSelector(selectStatus);
  const show = status === 'settings';

  const previousStatus = useRef(status);
  useEffect(() => {
    if (status !== 'settings') {
      previousStatus.current = status;
    }
  }, [status]);

  const {transform, display, opacity} = useSpring({
    display: getDisplay(show),
    opacity: show ? 0 : 1,
    transform: `perspective(600px) rotateX(${show ? 180 : 0}deg)`,
    config: {mass: 5, tension: 500, friction: 80},
  });

  const toggle = () => {
    dispatch(actions.changeStatus(show ? previousStatus.current : 'settings'));
  };

  // Announce aria settings somehow on instructions or something
  return (
    <Container>
      <IconButton onClick={toggle}>
        <Hamburger
          style={{
            opacity,
            display,
            transform,
          }}
        />
        <Close
          style={{
            display: display.to(() => {
              return getDisplay(!show);
            }),
            opacity: opacity.to((o: number) => 1 - o),
            transform,
          }}
        />
      </IconButton>
    </Container>
  );
};
