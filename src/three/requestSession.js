let xrSession;

const requestSession = (clearSession) =>
  new Promise((resolve, reject) => {
    const options = {
      requiredFeatures: ['hit-test', 'dom-overlay', 'local'],
      optionalFeatures: ['light-estimation'],
      domOverlay: { root: document.documentElement },
    };
    navigator.xr
      .requestSession('immersive-ar', options)
      .then((session) => {
        // eslint-disable-next-line no-param-reassign
        session.mode = 'immersive-ar';

        xrSession = session;
        xrSession.onend = () => {
          clearSession();
          xrSession = null;
        };
        resolve(xrSession);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
        reject();
      });
  });

export default requestSession;
