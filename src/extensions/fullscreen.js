import screenfull from 'screenfull';

function setStyle(view) {
  if (screenfull.isFullscreen) {
    const head = document.head || document.getElementsByTagName('head')[0];
    const style = document.getElementById('avg-fullscreen-style') || document.createElement('style');

    style.id = 'avg-fullscreen-style';

    const css = `
      .avg-fullscreen {
        background-color: black;
        width: 100% !important;
        height: ${100 * view.height / (view.width / window.innerWidth) / window.innerHeight}% !important;
        transform: scale(1, 1) !important;
        --webkit-transform: scale(1, 1) !important;
        left: 0 !important;
        top: ${(window.innerHeight - (view.height / (view.width / window.innerWidth))) / 2}px !important;
      }
    `;

    style.type = 'text/css';
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.childNodes.length && style.removeChild(style.childNodes[0]);
      style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);
  } else {
    view.classList.remove('avg-fullscreen');
  }
}

export default class Fullscreen {
  constructor(core) {
    this.view = core.getRenderer().view;

    document.addEventListener('webkitfullscreenchange', () => setStyle(this.view));
    document.addEventListener('mozfullscreenchange', () => setStyle(this.view));
    core.plugins.fullscreen = this;
  }
  request() {
    if (screenfull.enabled) {
      screenfull.request(this.view);
      this.view.classList.add('avg-fullscreen');
    }
  }
  exit() {
    if (screenfull.enabled) {
      screenfull.exit();
      this.view.classList.remove('avg-fullscreen');
    }
  }
  toggle() {
    if (!screenfull.isFullscreen) {
      this.request();
    } else {
      this.exit();
    }
  }
  get enabled() {
    return screenfull.enabled;
  }
  get isFullscreen() {
    return screenfull.isFullscreen;
  }
}
