import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import UploadHeader from './UploadHeader';
import BottomSlidingModal from '../utility/BottomSlidingModal';

const useStyles = createUseStyles((theme) => ({
  test: {
    height: '200px',
  },
}));

const UploadModal = ({ open, onClose }) => {
  const cls = useStyles();

  return (
    <BottomSlidingModal
      open={open}
      onClose={onClose}
      header={<UploadHeader onClose={onClose} />}
      zOffset={30}
    >
      <div className={cls.test}></div>
    </BottomSlidingModal>
  );
};

UploadModal.propTypes = {
  opan: PropTypes.bool,
  onClick: PropTypes.func,
};

export default UploadModal;
