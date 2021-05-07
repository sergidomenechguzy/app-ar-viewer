import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const Context = createContext();

const reducerMachine = (state, action) => {
  switch (action.type) {
    case 'reset':
      return { currentView: 'none' };
    case 'setAr':
      return { currentView: 'ar' };
    case 'set3d':
      return { currentView: '3d' };
    case 'switch':
      if (state.currentView === 'ar') {
        return { currentView: '3d' };
      }
      if (state.currentView === '3d') {
        return { currentView: 'ar' };
      }
      return { currentView: 'none' };
    default:
      throw new Error();
  }
};

const ViewStore = ({ children }) => {
  const reducer = useReducer(reducerMachine, { currentView: 'none' });

  return <Context.Provider value={reducer}>{children}</Context.Provider>;
};

ViewStore.propTypes = {
  children: PropTypes.node.isRequired,
};

Context.displayName = 'ViewStore';

export default ViewStore;

export const useViewStore = () => {
  const [state, dispatch] = useContext(Context);
  return { currentView: state.currentView, dispatch };
};
