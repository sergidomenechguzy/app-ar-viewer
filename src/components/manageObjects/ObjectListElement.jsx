import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import clsx from 'clsx';
import fileSize from 'filesize';
import { Offline } from 'react-detect-offline';
import { useTranslation } from 'react-i18next';
import Typography from '../utility/Typography';
import IconButton from '../buttons/IconButton';
import Divider from '../utility/Divider';
import Clickable from '../utility/Clickable';
import useOpenState from '../../hooks/useOpenState';
import ConfirmModal from '../utility/ConfirmModal';
import ThreeDObjectIcon from '../icons/ThreeDObjectIcon';

const useStyles = createUseStyles((theme) => ({
  listElement: {
    display: 'flex',
    padding: theme.spacing(1, 0),
    paddingLeft: theme.spacing(2),
    alignItems: 'center',
  },
  selected: {
    backgroundColor: theme.palette.action.selected,
  },
  imageWrapper: {
    border: '1px solid',
    borderRadius: theme.shape.borderRadius * 3,
    borderColor: theme.palette.text.hint,
    width: theme.spacing(10),
    height: theme.spacing(10),
    backgroundColor: theme.palette.action.hover,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  elementInfo: {
    marginLeft: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flexGrow: 1,
  },
  action: {
    marginRight: theme.spacing(2),
    zIndex: 1,
  },
  divider: {
    marginLeft: theme.spacing(14),
  },
  offline: {
    marginTop: theme.spacing(1),
  },
}));

const ObjectListElement = ({
  file,
  last,
  selected,
  onClick,
  onAction,
  actionIcon,
  confirmAction,
  actionLabel,
  confirmText,
  confirmTextOffline,
  translateName,
}) => {
  const cls = useStyles();
  const [isOpen, setOpened, setClosed] = useOpenState(false);
  const { t } = useTranslation();

  const handleActionClick = (e) => {
    e.stopPropagation();
    if (confirmAction) {
      setOpened();
    } else {
      onAction(file);
    }
  };

  return (
    <>
      <Clickable>
        <li
          className={clsx(cls.listElement, selected && cls.selected)}
          onClick={() => onClick(file.id)}
        >
          <div className={cls.imageWrapper}>
            {file.thumbnail ? (
              <img src={file.thumbnail} alt="thumbnail" className={cls.image}></img>
            ) : (
              <ThreeDObjectIcon size="h4" />
            )}
          </div>
          <div className={cls.elementInfo}>
            <Typography variant="h6">{translateName ? t(file.name) : file.name}</Typography>
            <Typography variant="body2">{t(file.category)}</Typography>
            <Typography variant="caption" color="hint">
              {fileSize(file.size)}
            </Typography>
          </div>
          {actionIcon && onAction ? (
            <IconButton
              onClick={handleActionClick}
              className={cls.action}
              ariaLabel={t(actionLabel || 'file action')}
            >
              {actionIcon}
            </IconButton>
          ) : null}
        </li>
      </Clickable>
      {!last ? <Divider className={cls.divider} /> : null}
      {confirmAction && onAction && confirmText ? (
        <ConfirmModal open={isOpen} onClose={setClosed} onConfirm={() => onAction(file)}>
          <Typography>{t(confirmText)}</Typography>
          {confirmTextOffline ? (
            <Offline polling={{ enabled: false }}>
              <Typography className={cls.offline}>{t(confirmTextOffline)}</Typography>
            </Offline>
          ) : null}
        </ConfirmModal>
      ) : null}
    </>
  );
};

ObjectListElement.displayName = 'ObjectListElement';

ObjectListElement.propTypes = {
  file: PropTypes.shape({}).isRequired,
  last: PropTypes.bool,
  selected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  onAction: PropTypes.func,
  actionIcon: PropTypes.element,
  confirmAction: PropTypes.bool,
  actionLabel: PropTypes.string,
  confirmText: PropTypes.string,
  confirmTextOffline: PropTypes.string,
  translateName: PropTypes.bool,
};

ObjectListElement.defaultProps = {
  last: false,
  selected: false,
  confirmAction: false,
  translateName: true,
};

export default ObjectListElement;
