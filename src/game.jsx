import { React, Component, core, components } from 'avg-core';
import { Router, Route, IndexRedirect, Redirect, hashHistory, createMemoryHistory } from 'react-router';

import Title from './title';
import Info from './dialogs/info';
import Story from './story';
import Save from './dialogs/save';
import Load from './dialogs/load';
import Option from './dialogs/option';
import History from './dialogs/history';

const { Surface } = components;

class Stage extends Component {
  static propTypes = {
    children: React.PropTypes.any
  }
  render() {
    return (
      <Surface>
        {this.props.children}
      </Surface>
    );
  }
}

export default class Game extends Component {
  render() {
    return (
      <Router history={process.env.NODE_ENV === 'production' ? createMemoryHistory() : hashHistory}>
        <Route path='/' component={Stage}>
          <Route path='title' component={Title}>
            <Route path='load' component={Load} />
            <Route path='info' component={Info} />
            <Route path='option' component={Option} />
          </Route>
          <Route path='story/:chapter' component={Story} onLeave={() => core.plugins.audio.stopAll()}>
            <Route path='save' component={Save} onEnter={() => core.plugins.shot.shot(191, 98)}/>
            <Route path='load' component={Load} />
            <Route path='history' component={History} />
            <Route path='option' component={Option} />
          </Route>
          <Redirect from='story' to='story/1' />
          <IndexRedirect from='*' to='title' />
        </Route>
      </Router>
    );
  }
}




