import React from 'react';
import Viewer from './components/viewer/Viewer';
import UiOverlay from './components/mainViewUi/UiOverlay';
import AppWrapper from './components/utility/AppWrapper';
import ConfigStore from './stores/ConfigStore';
import GltfStore from './stores/GltfStore';
import SelectionStore from './stores/SelectionStore';
import ThemeStore from './stores/ThemeStore';
import ViewStore from './stores/ViewStore';
import XRSessionStore from './stores/XRSessionStore';
import SnackbarStore from './stores/SnackbarStore';
import UploadedFilesStore from './stores/UploadedFilesStore';
import HideUiStore from './stores/HideUiStore';

const App = () => (
  <ThemeStore>
    <SnackbarStore>
      <ConfigStore>
        <XRSessionStore>
          <HideUiStore>
            <ViewStore>
              <UploadedFilesStore>
                <GltfStore>
                  <SelectionStore>
                    <AppWrapper>
                      <UiOverlay />
                      <Viewer />
                    </AppWrapper>
                  </SelectionStore>
                </GltfStore>
              </UploadedFilesStore>
            </ViewStore>
          </HideUiStore>
        </XRSessionStore>
      </ConfigStore>
    </SnackbarStore>
  </ThemeStore>
);

export default App;
