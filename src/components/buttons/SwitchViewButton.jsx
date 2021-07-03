import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useViewStore } from '../../stores/ViewStore';
import FloatingButton from './FloatingButton';
import ThreeDViewerIcon from '../icons/ThreeDViewerIcon';
import ArViewerIcon from '../icons/ArViewerIcon';
import { useXrSession } from '../../stores/XrSessionStore';
import requestSession from '../../three/requestSession';
import { useSnackbarStore } from '../../stores/SnackbarStore';

const SwitchViewButton = ({ className }) => {
  const { currentView, dispatch } = useViewStore();
  const { xrSession, endSession, clearSession, supportsWebXR } = useXrSession();
  const { addSnackbarMessage } = useSnackbarStore();
  const { t } = useTranslation();

  const changeView = async () => {
    if (currentView === 'ar') {
      endSession();
      dispatch({ type: 'set3d' });
    } else if (currentView === '3d' && supportsWebXR) {
      try {
        xrSession.current = await requestSession(clearSession);
        dispatch({ type: 'setAr' });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('something went wrong while starting the ar session', err);
        addSnackbarMessage('Something went wrong while starting the AR session!', 'error');
      }
    }
  };

  return supportsWebXR ? (
    <FloatingButton className={className} onClick={changeView} ariaLabel={t('switch view')}>
      {currentView === '3d' ? <ArViewerIcon size="h4" /> : <ThreeDViewerIcon size="h4" />}
    </FloatingButton>
  ) : null;
};

SwitchViewButton.displayName = 'SwitchViewButton';

SwitchViewButton.propTypes = {
  className: PropTypes.string,
};

SwitchViewButton.defaultProps = {};

export default SwitchViewButton;
