import {configureStore, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';

import {list, shuffle} from '../list';
import {getLists} from '../storage';

import {State} from './types';

const initialState: State = {
  isRecording: false,
  audioSource: '',
  subject: 'remaining',
  remaining: [], // These lists are set on configureState
  passed: [],
  failed: [],
};

const slice = createSlice({
  name: 'speech',
  initialState,
  reducers: {
    start: (state) => {
      state.isRecording = true;
      state.audioSource = '';
    },
    stop: (state, {payload: duration}: PayloadAction<number>) => {
      state.isRecording = false;
      state.duration = duration;
    },
    pass: (state) => {
      state.audioSource = '';

      const word = state[state.subject].shift();

      if (word) {
        state.passed.push(word);
      }
    },
    fail: (state) => {
      state.audioSource = '';

      const word = state[state.subject].shift();

      if (word) {
        state.failed.push(word);
      }
    },
    save: (state, {payload: audioSource}: PayloadAction<string>) => {
      state.audioSource = audioSource;
    },
  },
});

export const selectList = (state: State) => state[state.subject];
export const selectSubject = ({subject}: State) => subject;
export const selectRemainingList = ({remaining}: State) => remaining;
export const selectPassedList = ({passed}: State) => passed;
export const selectFailedList = ({failed}: State) => failed;

export const selectWord = (state: State) => state[state.subject][0];
export const selectAudioSource = ({audioSource}: State) => audioSource;
export const selectIsRecording = ({isRecording}: State) => isRecording;

export const {actions} = slice;

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
  reducer: slice.reducer,
  preloadedState: preloadState(),
});

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();