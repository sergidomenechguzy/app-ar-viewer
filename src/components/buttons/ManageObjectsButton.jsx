import React from 'react';
import PropTypes from 'prop-types';
import FloatingButton from './FloatingButton';
import ThreeDObjectSettingsIcon from '../icons/ThreeDObjectSettingsIcon';
import { useSelectionStore } from '../../stores/SelectionStore';
import ReminderOverlay from '../mainViewUi/ReminderOverlay';
import { useViewStore } from '../../stores/ViewStore';

const ManageObjectsButton = ({ className, onClick }) => {
  const { selected } = useSelectionStore();
  const { currentView } = useViewStore();

  return (
    <>
      <FloatingButton className={className} onClick={onClick}>
        <ThreeDObjectSettingsIcon size="h4" />
      </FloatingButton>
      {selected === null && currentView !== 'none' ? <ReminderOverlay /> : null}
    </>
  );
};

ManageObjectsButton.propTypes = {
  className: PropTypes.string,
};

export default ManageObjectsButton;
