import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { tryFetchJson5 } from 'fetch-json5/src';
import { ThemeProvider } from 'react-jss';
import deepmerge from 'deepmerge';
import { createBreakpointDown, createBreakpointUp, createSpacing } from '../utils';

const Context = createContext();

const ThemeStore = ({ children }) => {
  const [baseTheme, setBaseTheme] = useState(null);
  const [lightTheme, setLightTheme] = useState(null);
  const [darkTheme, setDarkTheme] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const fetchTheme = async (url, set) => {
    const fetchedTheme = await tryFetchJson5(url);
    set(fetchedTheme);
    return fetchedTheme;
  };

  const fetchAndBuildBaseTheme = async () => {
    const fetchedTheme = await tryFetchJson5('theme/baseTheme.json5');
    fetchedTheme.spacing = createSpacing(fetchedTheme);
    fetchedTheme.breakpoints.up = createBreakpointUp(fetchedTheme);
    fetchedTheme.breakpoints.down = createBreakpointDown(fetchedTheme);
    setBaseTheme(fetchedTheme);
    return fetchedTheme;
  };

  useEffect(() => {
    fetchAndBuildBaseTheme();
    fetchTheme('theme/lightTheme.json5', setLightTheme);
    fetchTheme('theme/darkTheme.json5', setDarkTheme);
  }, []);

  useEffect(() => {
    if (lightTheme && darkTheme) {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      if (mq.matches) {
        setDarkMode(true);
      } else {
        setDarkMode(false);
      }
    }
  }, [darkTheme, lightTheme]);

  return baseTheme && lightTheme && darkTheme ? (
    <Context.Provider value={{ lightTheme, darkTheme, darkMode, setDarkMode }}>
      <ThemeProvider theme={deepmerge(baseTheme, darkMode ? darkTheme : lightTheme)}>
        {children}
      </ThemeProvider>
    </Context.Provider>
  ) : null;
};

ThemeStore.displayName = 'ThemeStore';

ThemeStore.propTypes = {
  children: PropTypes.node.isRequired,
};

ThemeStore.defaultProps = {};

export default ThemeStore;

export const useThemestore = () => useContext(Context);
