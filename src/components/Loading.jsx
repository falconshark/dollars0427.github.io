import { React, Component, components } from 'avg-core';
const { Layer, Text } = components;

export default class Loading extends Component {
  render() {
    return (
      <Layer fillColor={0xffffff} fillAlpha={0.7}>
        <Text
          text={`${String(this.props.progress).padStart(4)}%`}
          style={{ fill: '#7e4e3e', fontFamily: ['微软雅黑', 'PingFang SC'] }}
          position={[630, 510]} anchor={[0.5, 0.5]}
        />
      </Layer>
    );
  }
}

