import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import FloatingButton from './FloatingButton';
import ThreeDObjectSettingsIcon from '../icons/ThreeDObjectSettingsIcon';
import { useSelectionStore } from '../../stores/SelectionStore';
import ReminderOverlay from '../mainViewUi/ReminderOverlay';
import { useViewStore } from '../../stores/ViewStore';

const ManageObjectsButton = ({ className, onClick }) => {
  const { selected } = useSelectionStore();
  const { currentView } = useViewStore();
  const { t } = useTranslation();

  return (
    <>
      <FloatingButton className={className} onClick={onClick} ariaLabel={t('manage objects')}>
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
