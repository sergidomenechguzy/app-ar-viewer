import React from 'react';
import { useTranslation } from 'react-i18next';
// import { createUseStyles } from 'react-jss';
import useOpenState from '../../hooks/useOpenState';
import Button from '../buttons/Button';
import UploadModal from '../upload/UploadModal';

// const useStyles = createUseStyles((theme) => ({
//   button: {
//     margin: theme.spacing(2),
//   },
// }));

const ManageObjectsFooter = () => {
  // const cls = useStyles();
  const { t } = useTranslation();
  const [isOpen, setOpened, setClosed] = useOpenState(false);

  return (
    <>
      <Button variant="outlined" onClick={setOpened}>
        {t('Upload')}
      </Button>
      <UploadModal open={isOpen} onClose={setClosed} />
    </>
  );
};

export default ManageObjectsFooter;
