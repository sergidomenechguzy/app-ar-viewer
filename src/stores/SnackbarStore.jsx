import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import useOpenState from '../hooks/useOpenState';
import Snackbar from '../components/utility/Snackbar';

const Context = createContext();

const SnackbarStore = ({ children }) => {
  const [current, setCurrent] = useState(null);
  const [queue, setQueue] = useState([]);
  const [isOpen, setOpened, setClosed] = useOpenState(false);
  const timeoutId = useRef();

  const handleClose = useCallback(() => {
    setClosed();
    timeoutId.current = setTimeout(() => {
      const newQueue = queue;
      const newCurrent = newQueue.shift();
      setQueue(newQueue);
      if (newCurrent) {
        setCurrent({ ...newCurrent, timestamp: Date.now() });
      } else {
        setCurrent(newCurrent);
      }
    }, 200);
  }, [queue, setClosed]);

  useEffect(() => {
    const id = setTimeout(() => {
      if (current) {
        setOpened();
      }
    }, 400);
    return () => clearTimeout(id);
  }, [current, setOpened]);

  useEffect(() => () => clearTimeout(timeoutId?.current), []);

  return (
    <Context.Provider
      value={{ current, setCurrent, queue, setQueue, isOpen, setOpened, setClosed }}
    >
      {children}
      {createPortal(
        <Snackbar open={isOpen} onClose={handleClose} {...current} />,
        document.getElementById('root')
      )}
    </Context.Provider>
  );
};

SnackbarStore.displayName = 'SnackbarStore';

SnackbarStore.propTypes = {
  children: PropTypes.node.isRequired,
};

SnackbarStore.defaultProps = {};

export default SnackbarStore;

export const useSnackbarStore = () => {
  const { current, setCurrent, setQueue } = useContext(Context);

  const addSnackbarMessage = useCallback(
    (message, variant) => {
      if (!current) {
        setCurrent({ message, variant, timestamp: Date.now() });
      } else {
        setQueue((old) => [...old, { message, variant }]);
      }
    },
    [current, setCurrent, setQueue]
  );

  const showErrorMessage = useCallback(() => {
    addSnackbarMessage('Something went wrong, please try again!', 'error');
  }, [addSnackbarMessage]);

  return { addSnackbarMessage, showErrorMessage };
};
