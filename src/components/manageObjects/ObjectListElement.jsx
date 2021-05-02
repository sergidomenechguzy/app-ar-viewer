import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import fileSize from 'filesize';
import Typography from '../utility/Typography';
import IconButton from '../buttons/IconButton';
import DeleteIcon from '../icons/DeleteIcon';
import Divider from '../utility/Divider';

const useStyles = createUseStyles((theme) => ({
  listElement: {
    display: 'flex',
    padding: theme.spacing(1, 0),
    alignItems: 'center',
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
    marginLeft: theme.spacing(12),
  },
}));

const ObjectListElement = ({ file, last }) => {
  const cls = useStyles();

  return (
    <>
      <li className={cls.listElement}>
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
          <DeleteIcon size="h5" />
        </IconButton>
      </li>
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
