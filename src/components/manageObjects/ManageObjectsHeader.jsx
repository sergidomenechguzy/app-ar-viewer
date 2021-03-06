import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { useTranslation } from 'react-i18next';
import IconButton from '../buttons/IconButton';
import ExpandIcon from '../icons/ExpandIcon';
import InfoIcon from '../icons/InfoIcon';
import InfoModal from '../info/InfoModal';
import useOpenState from '../../hooks/useOpenState';

const useStyles = createUseStyles((theme) => ({
  header: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  expand: {
    [theme.breakpoints.up('md')]: {
      transform: 'rotate(-90deg)',
    },
  },
}));

const ManageObjectsHeader = ({ onClose }) => {
  const cls = useStyles();
  const [isOpen, setOpened, setClosed] = useOpenState(false);
  const { t } = useTranslation();

  return (
    <>
      <div className={cls.header}>
        <IconButton onClick={setOpened} ariaLabel={t('info')}>
          <InfoIcon size={'h5'} />
        </IconButton>
        <IconButton onClick={onClose} ariaLabel={t('close menu')}>
          <ExpandIcon size={'h5'} className={cls.expand} />
        </IconButton>
      </div>
      <InfoModal open={isOpen} onClose={setClosed} />
    </>
  );
};

ManageObjectsHeader.displayName = 'ManageObjectsHeader';

ManageObjectsHeader.propTypes = {
  onClose: PropTypes.func.isRequired,
};

ManageObjectsHeader.defaultProps = {};

export default ManageObjectsHeader;
