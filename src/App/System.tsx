import {useEffect} from 'react';
import {useSelector} from 'react-redux';

import {
  actions,
  selectRemainingList,
  selectPassedList,
  selectFailedList,
  useAppDispatch,
  selectWord,
  State,
} from '../state';
import {setLists} from '../storage';

const CompletionListener = () => {
  const dispatch = useAppDispatch();

  const completed = useSelector((state: State) => !selectWord(state));

  if (completed) {
    dispatch(actions.changeStatus('completed'));
  }

  return <></>;
};

// So far it's only auto save but still
export const System = () => {
  const remaining = useSelector(selectRemainingList);
  const passed = useSelector(selectPassedList);
  const failed = useSelector(selectFailedList);

  useEffect(() => {
    setLists({
      remaining,
      passed,
      failed,
    });
  }, [remaining, passed, failed]);

  return (
    <>
      <CompletionListener />
    </>
  );
};
