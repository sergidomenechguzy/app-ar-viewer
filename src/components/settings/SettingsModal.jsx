import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { useTranslation } from 'react-i18next';
import { Offline } from 'react-detect-offline';
import Modal from '../utility/Modal';
import Typography from '../utility/Typography';
import SettingsList from './SettingsList';
import SettingsListElement from './SettingsListElement';
import ThemeIcon from '../icons/ThemeIcon';
import DeleteIcon from '../icons/DeleteIcon';
// import CacheIcon from '../icons/CacheIcon';
import LanguageIcon from '../icons/LanguageIcon';
import ThreeDObjectIcon from '../icons/ThreeDObjectIcon';
import IconButton from '../buttons/IconButton';
import Switch from '../utility/Switch';
import { useThemestore } from '../../stores/ThemeStore';
import LanguageSelect from './LanguageSelect';
import { useGltfStore } from '../../stores/GltfStore';
import { useSnackbarStore } from '../../stores/SnackbarStore';
import { useSelectionStore } from '../../stores/SelectionStore';
import ConfirmModal from '../utility/ConfirmModal';
import useOpenState from '../../hooks/useOpenState';
import { useHideUiStore } from '../../stores/HideUiStore';
import { useViewStore } from '../../stores/ViewStore';
import HideIcon from '../icons/HideIcon';

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
  offline: {
    marginTop: theme.spacing(1),
  },
}));

const SettingsModal = ({ open, onClose, zOffset }) => {
  const cls = useStyles();
  const { darkMode, setDarkMode } = useThemestore();
  const { hidden, setVisibility } = useHideUiStore();
  const { resetGltfs } = useGltfStore();
  const { selected, resetSelected } = useSelectionStore();
  const { addSnackbarMessage, showErrorMessage } = useSnackbarStore();
  const { currentView } = useViewStore();
  const { t } = useTranslation();
  const [isOpenObjects, setOpenedObjects, setClosedObjects] = useOpenState(false);

  const deleteObjects = useCallback(async () => {
    try {
      const cache = await caches.open('assets');
      (await cache.keys()).forEach((request) => {
        if (request.url.endsWith('.gltf') || request.url.endsWith('.glb')) {
          cache.delete(request);
        }
      });

      resetSelected();
      resetGltfs();
      addSnackbarMessage('All 3D-Objects deleted from cache.');
    } catch (err) {
      console.warn('Something went wrong trying to delete all 3D-Objects.', err);
      showErrorMessage();
    }
  }, [addSnackbarMessage, resetGltfs, resetSelected, showErrorMessage]);

  return (
    <>
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
            action={<Switch value={darkMode} setValue={setDarkMode} size="h5" />}
          />
          <SettingsListElement
            icon={<LanguageIcon />}
            name={t('Language')}
            action={<LanguageSelect zOffset={zOffset} />}
          />
          <SettingsListElement
            icon={<ThreeDObjectIcon />}
            name={t('Delete 3D-Objects')}
            action={
              <IconButton onClick={setOpenedObjects}>
                <DeleteIcon color="error" size="h6" />
              </IconButton>
            }
          />
          <SettingsListElement
            icon={<HideIcon />}
            name={t('Hide UI')}
            action={
              <Switch
                value={hidden}
                setValue={setVisibility}
                size="h5"
                disabled={!(currentView !== 'none' && !!selected)}
              />
            }
            info={
              currentView !== 'none' && !!selected
                ? null
                : t('You have to start one of the Viewers and select a 3D-Object first.')
            }
          />
          {/* <SettingsListElement
          icon={<CacheIcon />}
          name={t('Clear Cache')}
          action={
            <IconButton>
              <DeleteIcon color="error" size="h5" />
            </IconButton>
          }
        /> */}
        </SettingsList>
      </Modal>
      <ConfirmModal open={isOpenObjects} onClose={setClosedObjects} onConfirm={deleteObjects}>
        <Typography>
          {t(
            'Deleting all 3D-Objects will remove them from the local cache and they have to be downloaded again.'
          )}
        </Typography>
        <Offline polling={{ enabled: false }}>
          <Typography className={cls.offline}>
            {t('You will not be able to select any 3D-Object again until you go online.')}
          </Typography>
        </Offline>
      </ConfirmModal>
    </>
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
