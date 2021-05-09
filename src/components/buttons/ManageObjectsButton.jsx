import React from 'react';
import PropTypes from 'prop-types';
import FloatingButton from './FloatingButton';
import ThreeDObjectSettingsIcon from '../icons/ThreeDObjectSettingsIcon';
import { useSelectionStore } from '../../stores/SelectionStore';
import ReminderModal from '../mainViewUi/ReminderModal';
import { useViewStore } from '../../stores/ViewStore';

const ManageObjectsButton = ({ className, onClick }) => {
  const { selected } = useSelectionStore();
  const { currentView } = useViewStore();

  return (
    <>
      <FloatingButton className={className} onClick={onClick}>
        <ThreeDObjectSettingsIcon size="h4" />
      </FloatingButton>
      {selected === null && currentView !== 'none' ? <ReminderModal /> : null}
    </>
  );
};

ManageObjectsButton.propTypes = {
  className: PropTypes.string,
};

export default ManageObjectsButton;
