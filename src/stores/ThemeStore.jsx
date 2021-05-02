import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { tryFetchJson5 } from 'fetch-json5/src';
import { ThemeProvider } from 'react-jss';
import deepmerge from 'deepmerge';

const Context = createContext();

// https://blog.bitsrc.io/how-to-sync-your-react-app-with-the-system-color-scheme-78c0ad00074b

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
    const createSpacing = (theme) => {
      const themeSpacing = theme.spacingUnit || 8;

      return (...args) =>
        args.reduce(
          (acc, curr, index) =>
            index !== 0 ? `${acc} ${curr * themeSpacing}px` : `${curr * themeSpacing}px`,
          ['']
        );
    };

    const fetchedTheme = await tryFetchJson5('theme/baseTheme.json5');
    fetchedTheme.spacing = createSpacing(fetchedTheme);
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

ThemeStore.propTypes = {
  children: PropTypes.node.isRequired,
};

const useThemestore = () => useContext(Context);

Context.displayName = 'ThemeStore';

export default ThemeStore;

export { useThemestore };
