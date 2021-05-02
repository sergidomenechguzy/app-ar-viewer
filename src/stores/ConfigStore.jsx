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

ConfigStore.propTypes = {
  children: PropTypes.node.isRequired,
};

const useConfigStore = () => useContext(Context);

Context.displayName = 'ConfigStore';

export default ConfigStore;

export { useConfigStore };
