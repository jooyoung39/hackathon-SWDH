import { useContext } from 'react';
import {
  ModalsDispatchContext,
  ModalsStateContext,
} from '../contexts/ModalsContext';

export const useModalsState = () => {
  const state = useContext(ModalsStateContext);
  if (!state) throw new Error('ModalsProvider not found');
  return state;
};

export const useModalsDispatch = () => {
  const dispatch = useContext(ModalsDispatchContext);
  if (!dispatch) throw new Error('ModalsProvider not found');
  return dispatch;
};
