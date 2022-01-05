import { React, Component, components } from 'avg-core';

const { Text } = components;

export default class Textbutton extends Component {
  static propTypes = {
    ...Text.propTypes,
    hoverColor: React.PropTypes.number,
    clickColor: React.PropTypes.number
  }
  static defaultProps = {
    idleColor: 0x666666,
    hoverColor: 0x62a7d7,
    clickColor: 0xa1c4dc
  }
  constructor(props) {
    super(props);

    this.state = {
      style: {
        fill: this.props.idleColor
      }
    };
  }
  changeColor(color) {
    this.setState({
      style: {
        ...this.state.style,
        fill: color
      }
    });
  }
  handleMousedown(e) {
    this.changeColor(this.props.clickColor);
    this.props.onMousedown && this.props.onMousedown(e);
  }
  handleTouchstart(e) {
    this.changeColor(this.props.clickColor);
    this.props.onTouchstart && this.props.onTouchstart(e);
  }
  handleMouseup(e) {
    this.changeColor(this.props.hoverColor);
    this.props.onMouseup && this.props.onMouseup(e);
  }
  handleTouchend(e) {
    this.changeColor(this.props.idleColor);
    this.props.onTouchend && this.props.onTouchend(e);
  }
  handleOver(e) {
    this.changeColor(this.props.hoverColor);
    this.props.onMouseover && this.props.onMouseover(e);
  }
  handleOut(e) {
    this.changeColor(this.props.idleColor);
    this.props.onMouseout && this.props.onMouseout(e);
  }
  render() {
    return (
      <Text {...this.props} style={{ ...(this.props.style || {}), ...this.state.style }} buttonMode={true}
        onMousedown={this.handleMousedown.bind(this)} onMouseup={this.handleMouseup.bind(this)}
        onTouchstart={this.handleTouchstart.bind(this)} onTouchend={this.handleTouchend.bind(this)}
        onMouseover={this.handleOver.bind(this)} onMouseout={this.handleOut.bind(this)}
      />
    );
  }
}
