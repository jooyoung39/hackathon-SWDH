import { createContext, Dispatch } from 'react';

/* State */
export type Modal = {
  id: number;
  Component: ({
    data,
    onClose,
  }: {
    data: any;
    onClose: () => void;
  }) => JSX.Element;
  data: any;
};

type ModalsState = Modal[];

export const ModalsStateContext = createContext<ModalsState | undefined>(
  undefined,
);

/* Dispatch */
type Action =
  | {
      type: 'OPEN';
      Component: ({
        data,
        onClose,
      }: {
        data: any;
        onClose: () => void;
      }) => JSX.Element;
      data: any;
    }
  | {
      type: 'CLOSE';
      id: number;
    };

type ModalsDispatch = Dispatch<Action>;

export const ModalsDispatchContext = createContext<ModalsDispatch | undefined>(
  undefined,
);

export const modalsReducer = (
  state: ModalsState,
  action: Action,
): ModalsState => {
  switch (action.type) {
    case 'OPEN': {
      const nextID = Math.max(...state.map((modal) => modal.id)) + 1;
      return [
        ...state,
        {
          id: nextID < 0 ? 1 : nextID,
          Component: action.Component,
          data: action.data,
        },
      ];
    }
    case 'CLOSE':
      return state.filter((modal) => modal.id !== action.id);
    default:
      throw new Error('Unhandled action');
  }
};
