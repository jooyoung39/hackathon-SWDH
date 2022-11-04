import { ReactNode, useReducer } from 'react';
import {
  ModalsDispatchContext,
  ModalsStateContext,
  modalsReducer,
} from '../contexts/ModalsContext';

const ModalsContextProvider = ({ children }: { children: ReactNode }) => {
  const [modals, dispatch] = useReducer(modalsReducer, []);
  return (
    <ModalsDispatchContext.Provider value={dispatch}>
      <ModalsStateContext.Provider value={modals}>
        {children}
      </ModalsStateContext.Provider>
    </ModalsDispatchContext.Provider>
  );
};

export default ModalsContextProvider;
