import {useEffect} from 'react';
import {useSelector} from 'react-redux';

import {
  selectRemainingList,
  selectPassedList,
  selectFailedList,
} from '../state';
import {setLists} from '../storage';

export const System = () => {
  const remaining = useSelector(selectRemainingList);
  const passed = useSelector(selectPassedList);
  const failed = useSelector(selectFailedList);

  useEffect(() => {
    setLists({remaining, passed, failed});
  }, [remaining, passed, failed]);

  return <></>;
};
