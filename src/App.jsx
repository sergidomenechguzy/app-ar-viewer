import React from 'react';
import { createUseStyles } from 'react-jss';
import UiOverlay from './components/mainViewUi/UiOverlay';
import ConfigStore from './stores/ConfigStore';
import ThemeStore from './stores/ThemeStore';

const useStyles = createUseStyles({
  app: {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
  },
  image: {
    height: '100vh',
    position: 'fixed',
    top: 0,
    zIndex: 0,
  },
});

const App = () => {
  const cls = useStyles();

  return (
    <ThemeStore>
      <ConfigStore>
        <div className={cls.app}>
          <UiOverlay />
          <img className={cls.image} src="https://picsum.photos/1920/1080" alt="background" />
        </div>
      </ConfigStore>
    </ThemeStore>
  );
};

export default App;
