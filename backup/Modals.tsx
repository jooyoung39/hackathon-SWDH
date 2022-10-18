import { useModalState, useModalsDispatch } from '../hooks/useModal';

const Modals = () => {
  const openedModals = useModalState();
  const dispatch = useModalsDispatch();

  return (
    <>
      {openedModals.map((modal) => {
        const { id, Component, props } = modal;
        const onClose = () => {
          setTimeout(() => dispatch({ type: 'CLOSE', Component }), 150);
        };
        return (
          <Component
            key={id}
            show={props.show}
            data={props.data}
            onClose={onClose}
          />
        );
      })}
    </>
  );
};

export default Modals;
