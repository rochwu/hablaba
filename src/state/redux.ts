import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';

import {list, shuffle} from '../list';
import {getLists} from '../storage';

import {State} from './types';
import {reducer, initialState} from './duck';

const preloadState = (): Partial<State> | undefined => {
  const {remaining, passed, failed} = getLists();

  if (remaining || passed || failed) {
    return {
      ...initialState,
      remaining: remaining ? shuffle(remaining) : initialState.remaining,
      passed: passed ? shuffle(passed) : initialState.passed,
      failed: failed ? shuffle(failed) : initialState.failed,
    };
  } else {
    return {...initialState, remaining: shuffle(list)};
  }
};

export const store = configureStore({
  reducer,
  preloadedState: preloadState(),
});

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
