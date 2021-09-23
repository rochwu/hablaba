import {State} from './types';

export const selectList = (state: State) => state[state.subject];
export const selectSubject = ({subject}: State) => subject;
export const selectRemainingList = ({remaining}: State) => remaining;
export const selectPassedList = ({passed}: State) => passed;
export const selectFailedList = ({failed}: State) => failed;

export const selectWord = (state: State) => state[state.subject][0];
export const selectAudioSource = ({audioSource}: State) => audioSource;
export const selectIsRecording = ({isRecording}: State) => isRecording;
export const selectDuration = ({duration}: State) => duration;

export const selectStatus = ({status}: State) => status;
export const selectIsReady = ({status}: State) => status === 'ready';
export const selectIsCompleted = ({status}: State) => status === 'completed';
export const selectIsSettings = ({status}: State) => status === 'settings';
