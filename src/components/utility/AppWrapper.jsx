import React from 'react';
// import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
// import { useSnackbarStore } from '../../stores/SnackbarStore';

const useStyles = createUseStyles((theme) => ({
  app: {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
  },
}));

const AppWrapper = ({ children }) => {
  const cls = useStyles();
  // const { addSnackbarMessage } = useSnackbarStore();

  // TODO: fix messaging
  // useEffect(() => {
  //   // if (navigator.serviceWorker.controller) {
  //   navigator.serviceWorker.controller.addEventListener('message', (event) => {
  //     if (event?.data) {
  //       switch (event.data.type) {
  //         case 'UPDATE_AVAILABLE':
  //           addSnackbarMessage(
  //             'New content available. Please close all tabs of this app and reopen it.'
  //           );
  //           break;
  //         default:
  //           break;
  //       }
  //     }
  //   });
  //   // }
  // }, [addSnackbarMessage]);

  return <div className={cls.app}>{children}</div>;
};

AppWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppWrapper;
