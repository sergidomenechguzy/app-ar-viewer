import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { tryFetchJson5 } from 'fetch-json5/src';

const Context = createContext();

const ConfigStore = ({ children }) => {
  const [config, setConfig] = useState(null);

  const fetchConfig = async () => {
    const fetchedTheme = await tryFetchJson5('config/config.json5');
    setConfig(fetchedTheme);
    return fetchedTheme;
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  return config ? (
    <Context.Provider value={{ config, setConfig }}>{children}</Context.Provider>
  ) : null;
};

ConfigStore.displayName = 'ConfigStore';

ConfigStore.propTypes = {
  children: PropTypes.node.isRequired,
};

ConfigStore.defaultProps = {};

export default ConfigStore;

export const useConfigStore = () => useContext(Context);
