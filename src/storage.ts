import {Lists} from './state';

const KEYS = {
  Remaining: 'remaining',
  Passed: 'passed',
  Failed: 'failed',
};

export const setLists = ({remaining, passed, failed}: Partial<Lists>) => {
  if (remaining) {
    localStorage.setItem(KEYS.Remaining, JSON.stringify(remaining));
  }

  if (passed) {
    localStorage.setItem(KEYS.Passed, JSON.stringify(passed));
  }

  if (failed) {
    localStorage.setItem(KEYS.Failed, JSON.stringify(failed));
  }
};

const getList = (key: string) => {
  const stored = localStorage.getItem(key);

  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {}
  }

  return undefined;
};

export const getLists = (): Partial<Lists> => {
  return {
    remaining: getList(KEYS.Remaining),
    passed: getList(KEYS.Passed),
    failed: getList(KEYS.Failed),
  };
};
