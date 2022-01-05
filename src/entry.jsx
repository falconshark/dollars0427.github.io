import { React, core, plugins } from 'avg-core';
import Game from './game';
import { AppContainer } from 'react-hot-loader';
import Fullscreen from './extensions/fullscreen';
import History from './extensions/history';

const render = (process.env.NODE_ENV === 'development')
? Component =>
  core.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('app')
  )
: Component =>
  core.render(
    <Component />,
    document.getElementById('app')
  );

(async () => {
  try {
    await core.post('localstorage-init');
    await core.post('storyscript-init');

    core.installPlugin(plugins.Audio);
    core.installPlugin(plugins.Screenshot);
    core.plugins.audio.channelVolume('button', 0.8);
    core.plugins.audio.channelVolume('bgm', 0.8);
    core.plugins.audio.channelVolume('se', 0.8);
    await core.init(1280, 720, {
      fitWindow: true,
      assetsPath: 'assets',
      tryWebp: process.env.NODE_ENV === 'production'
    });
    core.installPlugin(Fullscreen);
    core.installPlugin(History);

    render(Game);
    if (module.hot) {
      module.hot.accept('./game', () => { render(Game); });
    }

    core.start();

  } catch (e) {
    document.write(e.message);
  }
})();
