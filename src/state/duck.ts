import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {shuffle} from '../list';

import {State} from './types';

export const initialState: State = {
  isRecording: false,
  audioSource: '',
  duration: 0,
  subject: 'remaining',
  remaining: [], // These lists are set on configureState
  passed: [],
  failed: [],
  status: 'ready',
};

const changeSubject = (subject: State['subject']) => {
  return (state: State) => {
    state.subject = subject;
    state[subject] = shuffle(state[subject]);
    state.status = 'ready';
    state.audioSource = '';
  };
};

export const {reducer, actions} = createSlice({
  name: 'speech',
  initialState,
  reducers: {
    start: (state) => {
      state.isRecording = true;
      state.audioSource = '';
      state.duration = 0;
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
    doFailedList: changeSubject('failed'),
    doPassedList: changeSubject('passed'),
    doRemainingList: changeSubject('remaining'),
    resetLists: (state) => {
      state.subject = 'remaining';
      state.remaining = shuffle([
        ...state.remaining,
        ...state.failed,
        ...state.passed,
      ]);
      state.passed = [];
      state.failed = [];
      state.status = 'ready';
      state.audioSource = '';
    },
    changeStatus: (state, {payload}: PayloadAction<State['status']>) => {
      state.status = payload;
    },
  },
});
