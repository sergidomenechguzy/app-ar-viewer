import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { useTranslation } from 'react-i18next';
import useOpenState from '../../hooks/useOpenState';
import FloatingButton from '../buttons/FloatingButton';
import SettingsIcon from '../icons/SettingsIcon';
import SettingsModal from '../settings/SettingsModal';
import HideWrapper from '../utility/HideWrapper';

const useStyles = createUseStyles((theme) => ({
  topButtons: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: theme.spacing(2),
    zIndex: ({ zOffset }) => theme.zIndex.modal + zOffset - 2,
  },
  settingsButton: {
    padding: theme.spacing(1),
  },
}));

const TopButtons = ({ zOffset }) => {
  const cls = useStyles({ zOffset });
  const [isOpen, setOpened, setClosed] = useOpenState(false);
  const { t } = useTranslation();

  return (
    <>
      <HideWrapper direction="up">
        <div className={cls.topButtons}>
          <FloatingButton
            onClick={setOpened}
            className={cls.settingsButton}
            ariaLabel={t('settings menu')}
          >
            <SettingsIcon size="h5" />
          </FloatingButton>
        </div>
      </HideWrapper>
      <SettingsModal open={isOpen} onClose={setClosed} zOffset={zOffset} />
    </>
  );
};

TopButtons.displayName = 'TopButtons';

TopButtons.propTypes = {
  zOffset: PropTypes.number,
};

TopButtons.defaultProps = {
  zOffset: 10,
};

export default TopButtons;
