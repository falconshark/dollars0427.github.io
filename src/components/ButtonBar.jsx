import { React, Component, components, core } from 'avg-core';

const { Button, Image } = components;

const menuPos = [[22, 0], [116, 0], [210, 0], [304, 0], [398, 0], [492, 0], [586, 0]];

export default class ButtonBar extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
    location: React.PropTypes.object,
  }
  handleSaveButton(e) {
    const currentPath = this.context.location.pathname;

    this.context.router.push(`${currentPath}/save`);
    e.stopPropagation();
  }
  handleLoadButton(e) {
    const currentPath = this.context.location.pathname;

    this.context.router.push(`${currentPath}/load`);

    e.stopPropagation();
  }
  handleSkipButton(e) {

    core.post('script-mode', { mode: 'skip' });

    e.stopPropagation();
  }
  handleAutoButton(e) {

    core.post('script-mode', { mode: 'auto' });

    e.stopPropagation();
  }
  handleHistoryButton(e) {
    const currentPath = this.context.location.pathname;

    this.context.router.push(`${currentPath}/backlog`);

    e.stopPropagation();
  }
  handleOptionButton(e) {
    const currentPath = this.context.location.pathname;

    this.context.router.push(`${currentPath}/config`);

    e.stopPropagation();
  }
  handleHideButton(e) {
    core.post('script-exec', {
      command: 'text',
      flags: ['hide', 'soft'],
      params: {}
    });

    e.stopPropagation();
  }
  render() {
    return (
      <Image src='msgbox/buttondecoration.png' x={this.props.x} y={this.props.y} position={this.props.position}>
        <Button src='msgbox/button_01.png' position={menuPos[0]} onClick={this.handleSaveButton.bind(this)} onTap={this.handleSaveButton.bind(this)}/>
        <Button src='msgbox/button_02.png' position={menuPos[1]} onClick={this.handleLoadButton.bind(this)} onTap={this.handleLoadButton.bind(this)}/>
        <Button src='msgbox/button_03.png' position={menuPos[2]} onClick={this.handleSkipButton.bind(this)} onTap={this.handleSkipButton.bind(this)}/>
        <Button src='msgbox/button_04.png' position={menuPos[3]} onClick={this.handleAutoButton.bind(this)} onTap={this.handleAutoButton.bind(this)}/>
        <Button src='msgbox/button_05.png' position={menuPos[4]} onClick={this.handleHistoryButton.bind(this)} onTap={this.handleHistoryButton.bind(this)}/>
        <Button src='msgbox/button_06.png' position={menuPos[5]} onClick={this.handleOptionButton.bind(this)} onTap={this.handleOptionButton.bind(this)}/>
        <Button src='msgbox/button_07.png' position={menuPos[6]} onClick={this.handleHideButton.bind(this)} onTap={this.handleHideButton.bind(this)}/>
      </Image>
    );
  }
}

