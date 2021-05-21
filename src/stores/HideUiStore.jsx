import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import useOpenState from '../hooks/useOpenState';

const Context = createContext();

const HideUiStore = ({ children }) => {
  const value = useOpenState(false);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

HideUiStore.propTypes = {
  children: PropTypes.node.isRequired,
};

Context.displayName = 'HideUiStore';

export default HideUiStore;

export const useHideUiStore = () => {
  const [hidden, setHidden, setVisible, toggleVisibility, setVisibility] = useContext(Context);

  return { hidden, setHidden, setVisible, toggleVisibility, setVisibility };
};
