import { React, core, Component, components } from 'avg-core';

const { Image } = components;

export default class Slider extends Component {
  static defaultProps = {
    x: 0,
    y: 0,
    defaultValue: 1
  };
  constructor(props) {
    super(props);

    this.moving = false;

    this.state = {
      x: 20
    };
  }
  componentDidMount() {
    const value = this.props.defaultValue;

    this.setState({
      x: 20 + (460 * value)
    });
  }
  componentWillReceiveProps(nextProps) {
    const value = nextProps.defaultValue;

    this.setState({
      x: 20 + (460 * value)
    });
  }
  handleDown(e) {
    this.moving = true;
    e.stopPropagation();
  }
  handleUp(e) {
    this.moving = false;
    e.stopPropagation();
  }
  handleMove(e) {
    if (this.moving) {
      const x = e.global.x - this.props.x;

      const value = Math.max(Math.min(x, 500 - 20), 20);

      this.setState({
        x: value
      });

      this.props.onChange && this.props.onChange((value - 20) / 460);
    }
    // e.stopPropagation();
  }
  render() {
    return (
      <Image src='option/sliderbar.png' x={this.props.x} y={this.props.y}>
        <Image src='option/sliderblock.png'
               x={this.state.x} y={16} anchor={[0.5, 0.5]}
               onPointerDown={this.handleDown.bind(this)}
               onPointerUp={this.handleUp.bind(this)}
               onPointerUpOutside={this.handleUp.bind(this)}
               onPointerMove={this.handleMove.bind(this)}
        />
      </Image>
    );
  }
}

