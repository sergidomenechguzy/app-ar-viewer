import React from 'react';
import Viewer from './components/arView/Viewer';
import UiOverlay from './components/mainViewUi/UiOverlay';
import AppWrapper from './components/utility/AppWrapper';
import ConfigStore from './stores/ConfigStore';
import ThemeStore from './stores/ThemeStore';
import ViewStore from './stores/ViewStore';
import XRSessionStore from './stores/XRSessionStore';

const App = () => (
  <ThemeStore>
    <ConfigStore>
      <XRSessionStore>
        <ViewStore>
          <AppWrapper>
            <UiOverlay />
            <Viewer />
          </AppWrapper>
        </ViewStore>
      </XRSessionStore>
    </ConfigStore>
  </ThemeStore>
);

export default App;
