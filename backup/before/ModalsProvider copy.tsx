import { useMemo, useState } from 'react';
import {
  ModalsDispatchContext,
  ModalsStateContext,
} from '../contexts/ModalsContext';

const ModalsProvider = ({ children }) => {
  const [openedModals, setOpenedModals] = useState([]);

  const open = (Component, props) => {
    setOpenedModals((modals) => [...modals, { Component, props }]);
  };

  const close = (Component) => {
    setOpenedModals((modals) =>
      modals.filter((modal) => modal.Component !== Component),
    );
  };

  const dispatch = useMemo(() => ({ open, close }), []);

  return (
    <ModalsStateContext.Provider value={openedModals}>
      <ModalsDispatchContext.Provider value={dispatch}>
        {children}
      </ModalsDispatchContext.Provider>
    </ModalsStateContext.Provider>
  );
};

export default ModalsProvider;
