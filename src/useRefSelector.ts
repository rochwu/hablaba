import {useRef, MutableRefObject} from 'react';
import {useSelector} from 'react-redux';

export const useRefSelector = <S = any, R = any>(
  selector: (state: S) => R,
): MutableRefObject<R> => {
  const state = useSelector(selector);
  const ref = useRef(state);
  ref.current = state;

  return ref;
};
