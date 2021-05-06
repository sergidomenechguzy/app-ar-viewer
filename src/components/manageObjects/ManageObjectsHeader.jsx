import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
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
}));

const ManageObjectsHeader = ({ onClose }) => {
  const cls = useStyles();
  const [isOpen, setOpened, setClosed] = useOpenState(false);

  return (
    <>
      <div className={cls.header}>
        <IconButton onClick={setOpened}>
          <InfoIcon size={'h5'} />
        </IconButton>
        <IconButton onClick={onClose}>
          <ExpandIcon size={'h5'} />
        </IconButton>
      </div>
      <InfoModal open={isOpen} onClose={setClosed} />
    </>
  );
};

ManageObjectsHeader.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ManageObjectsHeader;
