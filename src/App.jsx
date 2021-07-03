import React, { lazy } from 'react';
import Viewer from './views/Viewer';
import AppWrapper from './components/utility/AppWrapper';
import ConfigStore from './stores/ConfigStore';
import GltfStore from './stores/GltfStore';
import SelectionStore from './stores/SelectionStore';
import ThemeStore from './stores/ThemeStore';
import ViewStore from './stores/ViewStore';
import XrSessionStore from './stores/XrSessionStore';
import SnackbarStore from './stores/SnackbarStore';
import UploadedFilesStore from './stores/UploadedFilesStore';
import HideUiStore from './stores/HideUiStore';
import LazyLoad from './components/utility/LazyLoad';

const UiOverlay = lazy(() => import('./components/mainViewUi/UiOverlay'));

const App = () => (
  <ThemeStore>
    <SnackbarStore>
      <ConfigStore>
        <XrSessionStore>
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
        </XrSessionStore>
      </ConfigStore>
    </SnackbarStore>
  </ThemeStore>
);

App.displayName = 'App';

App.propTypes = {};

App.defaultProps = {};

export default App;
