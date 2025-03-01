import {Lists} from './state';

const prefix = 'hablaba-';

const Keys = {
  Remaining: `${prefix}remaining`,
  Passed: `${prefix}passed`,
  Failed: `${prefix}failed`,
};

export const setLists = ({remaining, passed, failed}: Partial<Lists>) => {
  if (remaining) {
    sessionStorage.setItem(Keys.Remaining, JSON.stringify(remaining));
  }

  if (passed) {
    sessionStorage.setItem(Keys.Passed, JSON.stringify(passed));
  }

  if (failed) {
    sessionStorage.setItem(Keys.Failed, JSON.stringify(failed));
  }
};

const getList = (key: string) => {
  const stored = sessionStorage.getItem(key);

  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {}
  }

  return undefined;
};

export const getLists = (): Partial<Lists> => {
  return {
    remaining: getList(Keys.Remaining),
    passed: getList(Keys.Passed),
    failed: getList(Keys.Failed),
  };
};
