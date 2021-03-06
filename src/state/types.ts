export type List = string[];

export type ListType = 'remaining' | 'passed' | 'failed';

export type Lists = {
  [key in ListType]: List;
};

export type StatusType = 'settings' | 'ready' | 'completed';

export type State = Lists & {
  isRecording: boolean;
  audioSource: string;
  duration: number;
  subject: ListType;
  status: StatusType;
};
