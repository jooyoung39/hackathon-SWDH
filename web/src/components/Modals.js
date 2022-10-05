import { useContext } from "react";
import { ModalsDispatchContext, ModalsStateContext } from "../contexts/ModalsContext";

import LoginModal from "./LoginModal";
import ItemGridModal from "./ItemGridModal";
import ItemListModal from "./ItemListModal";
import HealthCareModal from "./HealthCareModal";

export const modals = {
  loginModal: LoginModal,
  itemGridModal: ItemGridModal,
  itemListModal: ItemListModal,
  healthCareModal: HealthCareModal,
};

const Modals = () => {
  const openedModals = useContext(ModalsStateContext);
  const { close } = useContext(ModalsDispatchContext);

  return openedModals.map((modal, index) => {
    const { Component, props } = modal;
    const onClose = () => {
      setTimeout(() => close(Component), 150);
    };

    return <Component {...props} key={index} onClose={onClose} />;
  });
};

export default Modals;
