import { React, Component, components, ui } from 'avg-core';

const { Image, Text } = components;
const { Dialog, Button } = ui;

const style = {
  fontFamily: ['微软雅黑', 'PingFang SC'],
  fontSize: 35,
  fontStyle: 'normal',
  lineHeight: 40,
  stroke: '#4c4647',
  strokeThickness: 5,
  fill: '#fff',
};

export default class Confirm extends Component {
  static propTypes = {
    title: React.PropTypes.string,
    show: React.PropTypes.bool,
    callback: React.PropTypes.func,
  }
  handleYes() {
    const callback = this.props.callback;

    callback && callback(true);
  }
  handleNo() {
    const callback = this.props.callback;

    callback && callback(false);
  }
  render() {
    return (
      <Dialog visible={this.props.show} modal buttonMode={false}>
        <Image src={'dialog/bg.png'} />
        <Text text={this.props.title || ''} style={style} x={640} y={280} anchor={[0.5, 0.5]}/>
        <Button src='dialog/ask_yes.png' x={520} y={360} onClick={this.handleYes.bind(this)} onTap={this.handleYes.bind(this)} />
        <Button src='dialog/ask_no.png' x={670} y={360} onClick={this.handleNo.bind(this)} onTap={this.handleNo.bind(this)} />
      </Dialog>
    );
  }
}
