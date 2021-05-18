import React from 'react';
import { createUseStyles } from 'react-jss';
import { useTranslation } from 'react-i18next';
import Typography from '../utility/Typography';
import Paper from '../utility/Paper';

const useStyles = createUseStyles((theme) => ({
  paper: {
    position: 'fixed',
    right: theme.spacing(2),
    bottom: theme.spacing(15),
    maxWidth: '85%',
    backgroundColor: theme.palette.background.level2,

    '&:before': {
      content: '""',
      position: 'absolute',
      transform: 'rotate(45deg)',
      width: theme.spacing(3),
      height: theme.spacing(3),
      right: theme.spacing(4.25),
      bottom: theme.spacing(-1),
      backgroundColor: theme.palette.background.level2,
      boxShadow:
        '3px 3px 1px -3px rgba(0,0,0,0.2), 4px 4px 2px -2px rgba(0,0,0,0.14), 3px 3px 3px -3px rgba(0,0,0,0.12)',
    },
  },
  info: {
    marginBottom: theme.spacing(3),
  },
}));

const ReminderOverlay = () => {
  const cls = useStyles();
  const { t } = useTranslation();

  return (
    <Paper className={cls.paper}>
      <Typography variant="h5">{t('Select a 3D-Object')}</Typography>
      <Typography>
        {t('Please choose one of the 3D-Objects so you can look at it in the available viewers.')}
      </Typography>
    </Paper>
  );
};

export default ReminderOverlay;
