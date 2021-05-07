import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import clsx from 'clsx';
import fileSize from 'filesize';
import Typography from '../utility/Typography';
import IconButton from '../buttons/IconButton';
import DeleteIcon from '../icons/DeleteIcon';
import Divider from '../utility/Divider';
import Clickable from '../utility/Clickable';

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
  },
  divider: {
    marginLeft: theme.spacing(14),
  },
}));

const ObjectListElement = ({ file, last, selected, onClick }) => {
  const cls = useStyles();

  return (
    <>
      <Clickable>
        <li className={clsx(cls.listElement, selected && cls.selected)} onClick={onClick}>
          <div className={cls.imageWrapper}>
            <img src={file.thumbnail} alt="thumbnail" className={cls.image}></img>
          </div>
          <div className={cls.elementInfo}>
            <Typography>{file.name}</Typography>
            <Typography variant="caption" color="hint">
              {fileSize(file.size)}
            </Typography>
          </div>
          <IconButton className={cls.action}>
            <DeleteIcon size="h6" />
          </IconButton>
        </li>
      </Clickable>
      {!last ? <Divider className={cls.divider} /> : null}
    </>
  );
};

ObjectListElement.propTypes = {
  file: PropTypes.shape({}).isRequired,
  last: PropTypes.bool,
};

ObjectListElement.defaultProps = {
  last: false,
};

export default ObjectListElement;
