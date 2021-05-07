import React from 'react';
import Viewer from './components/arView/Viewer';
import UiOverlay from './components/mainViewUi/UiOverlay';
import AppWrapper from './components/utility/AppWrapper';
import ConfigStore from './stores/ConfigStore';
import GltfStore from './stores/GltfStore';
import SelectionStore from './stores/SelectionStore';
import ThemeStore from './stores/ThemeStore';
import ViewStore from './stores/ViewStore';
import XRSessionStore from './stores/XRSessionStore';

const App = () => (
  <ThemeStore>
    <ConfigStore>
      <XRSessionStore>
        <ViewStore>
          <GltfStore>
            <SelectionStore>
              <AppWrapper>
                <UiOverlay />
                <Viewer />
              </AppWrapper>
            </SelectionStore>
          </GltfStore>
        </ViewStore>
      </XRSessionStore>
    </ConfigStore>
  </ThemeStore>
);

export default App;
