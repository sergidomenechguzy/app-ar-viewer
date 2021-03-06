import React from 'react';
import { createUseStyles } from 'react-jss';
import { useTranslation } from 'react-i18next';
import HideWrapper from '../utility/HideWrapper';
import IconButton from './IconButton';
import ExpandIcon from '../icons/ExpandIcon';
import { useHideUiStore } from '../../stores/HideUiStore';

const useStyles = createUseStyles((theme) => ({
  showUi: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(1),
  },
  button: {
    transform: 'rotate(180deg)',
  },
}));

const ShowUiButton = () => {
  const cls = useStyles();
  const { setVisible } = useHideUiStore();
  const { t } = useTranslation();

  return (
    <HideWrapper direction="down" inverted>
      <div className={cls.showUi}>
        <IconButton className={cls.button} onClick={setVisible} ariaLabel={t('show UI')}>
          <ExpandIcon size="h5" />
        </IconButton>
      </div>
    </HideWrapper>
  );
};

ShowUiButton.displayName = 'ShowUiButton';

ShowUiButton.propTypes = {};

ShowUiButton.defaultProps = {};

export default ShowUiButton;
