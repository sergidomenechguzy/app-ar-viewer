import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import IconButton from '../buttons/IconButton';
import ExpandIcon from '../icons/ExpandIcon';

const useStyles = createUseStyles((theme) => ({
  header: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
}));

const UploadHeader = ({ onClose }) => {
  const cls = useStyles();

  return (
    <div className={cls.header}>
      <IconButton onClick={onClose}>
        <ExpandIcon size={'h5'} />
      </IconButton>
    </div>
  );
};

UploadHeader.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default UploadHeader;
