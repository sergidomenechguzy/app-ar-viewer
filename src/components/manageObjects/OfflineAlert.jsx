import React from 'react';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';
import OfflineIcon from '../icons/OfflineIcon';
import Typography from '../utility/Typography';

const useStyles = createUseStyles((theme) => ({
  offlineWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(4, 2, 10, 0),
  },
  typography: {
    marginTop: theme.spacing(1),
  },
}));

const OfflineAlert = () => {
  const cls = useStyles();
  const { t } = useTranslation();

  return (
    <div className={cls.offlineWrapper}>
      <OfflineIcon size="h3" color="icon" />
      <Typography className={cls.typography}>
        {t('Go online to see all available 3D-Objects')}
      </Typography>
    </div>
  );
};

export default OfflineAlert;
