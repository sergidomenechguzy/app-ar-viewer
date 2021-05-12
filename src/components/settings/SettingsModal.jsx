import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { useTranslation } from 'react-i18next';
import Modal from '../utility/Modal';
import Typography from '../utility/Typography';
import SettingsList from './SettingsList';
import SettingsListElement from './SettingsListElement';
import ThemeIcon from '../icons/ThemeIcon';
// import DeleteIcon from '../icons/DeleteIcon';
// import CacheIcon from '../icons/CacheIcon';
import LanguageIcon from '../icons/LanguageIcon';
// import ThreeDObjectIcon from '../icons/ThreeDObjectIcon';
// import IconButton from '../buttons/IconButton';
import Switch from '../utility/Switch';
import { useThemestore } from '../../stores/ThemeStore';
import LanguageSelect from './LanguageSelect';

const useStyles = createUseStyles((theme) => ({
  modal: {
    position: 'fixed',
    right: theme.spacing(1),
    top: theme.spacing(10),
    maxWidth: '85%',

    '&:before': {
      content: '""',
      position: 'absolute',
      transform: 'rotate(45deg)',
      width: theme.spacing(3),
      height: theme.spacing(3),
      right: theme.spacing(2.25),
      top: theme.spacing(-1),
      backgroundColor: theme.palette.background.paper,
    },
  },
}));

const SettingsModal = ({ open, onClose, zOffset }) => {
  const { darkMode, setDarkMode } = useThemestore();
  const cls = useStyles();
  const { t } = useTranslation();

  return (
    <Modal
      open={open}
      onClose={onClose}
      className={cls.modal}
      header={<Typography variant="h5">{t('Settings')}</Typography>}
      fullSizeContent
      hasTitle
      zOffset={zOffset}
    >
      <SettingsList>
        <SettingsListElement
          icon={<ThemeIcon />}
          name={t('Darkmode')}
          action={<Switch value={darkMode} setValue={setDarkMode} size="h4" />}
        />
        <SettingsListElement
          icon={<LanguageIcon />}
          name={t('Language')}
          action={<LanguageSelect zOffset={zOffset} />}
        />
        {/* <SettingsListElement
          icon={<ThreeDObjectIcon />}
          name="Delete Files"
          action={
            <IconButton>
              <DeleteIcon color="error" size="h5" />
            </IconButton>
          }
        />
        <SettingsListElement
          icon={<CacheIcon />}
          name="Delete Cache"
          action={
            <IconButton>
              <DeleteIcon color="error" size="h5" />
            </IconButton>
          }
        /> */}
      </SettingsList>
    </Modal>
  );
};

SettingsModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  zOffset: PropTypes.number,
};

SettingsModal.defaultProps = {
  zOffset: 10,
};

export default SettingsModal;
