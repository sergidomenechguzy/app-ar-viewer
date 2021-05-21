import React, { lazy } from 'react';
import Viewer from './components/viewer/Viewer';
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
import LazyLoad from './components/utility/LazyLoad';

const UiOverlay = lazy(() => import('./components/mainViewUi/UiOverlay'));

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
                      <LazyLoad>
                        <UiOverlay />
                      </LazyLoad>
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
