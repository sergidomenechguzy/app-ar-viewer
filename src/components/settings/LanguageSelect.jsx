import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import Select from 'react-select';

const LanguageSelect = ({ zOffset }) => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();

  const changeLanguage = (selected) => {
    i18n.changeLanguage(selected.value);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      minWidth: '100px',
      backgroundColor: theme.palette.background.level2,
      borderColor: `${theme.palette.action.active} !important`,
      cursor: 'pointer',
      WebkitTapHighlightColor: 'transparent',
      WebkitTouchCallout: 'none',
      WebkitUserSelect: 'none',
      KhtmlUserSelect: 'none',
      MozUserSelect: 'none',
      MsUserSelect: 'none',
      userSelect: 'none',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: theme.palette.text.primary,
    }),
    option: (provided, state) => ({
      ...provided,
      color: theme.palette.text.primary,
      backgroundColor: state.isSelected ? theme.palette.action.selected : 'none',
      cursor: 'pointer',
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    }),
    menuPortal: (provided) => ({
      ...provided,
      zIndex: theme.zIndex.modal + zOffset + 1,
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: theme.palette.background.level2,
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: `${theme.palette.text.secondary} !important`,
    }),
  };

  return (
    <Select
      value={{ value: i18n.language, label: i18n.language }}
      options={i18n.options.supportedLngs
        .filter((language) => language !== 'cimode')
        .map((language) => ({ value: language, label: language }))}
      onChange={changeLanguage}
      menuPortalTarget={document.body}
      placeholder=""
      isSearchable={false}
      styles={customStyles}
      theme={(defaultTheme) => ({
        ...defaultTheme,
        colors: {
          ...defaultTheme.colors,
          primary: theme.palette.action.active,
          primary50: theme.palette.action.disabled,
        },
      })}
      aria-label={t('language selection')}
    />
  );
};

LanguageSelect.displayName = 'LanguageSelect';

LanguageSelect.propTypes = {
  zOffset: PropTypes.number,
};

LanguageSelect.defaultProps = {
  zOffset: 0,
};

export default LanguageSelect;
