import {useRef} from 'react';
import {useSelector} from 'react-redux';

/**
 * Could be dangerous, this doesn't update the component ever
 */
export const useRefSelector = <S = any, R = any>(selector: (state: S) => R) => {
  const ref = useRef<R>(undefined as never);

  useSelector((state: S) => {
    ref.current = selector(state);
  });

  return ref;
};
