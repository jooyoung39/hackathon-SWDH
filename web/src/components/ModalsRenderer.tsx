import { useModalsState, useModalsDispatch } from '../hooks/useModal';

const ModalsRenderer = (): JSX.Element => {
  const openedModals = useModalsState();
  const dispatch = useModalsDispatch();

  return (
    <>
      {openedModals.map((modal) => {
        const { id, Component, data } = modal;
        const onClose = () => {
          setTimeout(() => dispatch({ type: 'CLOSE', id }), 250);
        };
        return <Component key={id} data={data} onClose={onClose} />;
      })}
    </>
  );
};

export default ModalsRenderer;
