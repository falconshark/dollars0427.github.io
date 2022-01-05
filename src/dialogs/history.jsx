import { React, Component, components, ui, core } from 'avg-core';

const { Image, Text, Layer } = components;
const { Dialog, Layout, Button } = ui;


const style = {
  fontFamily: ['微软雅黑', 'PingFang SC'],
  fontSize: 22,
  fontStyle: 'normal',
  lineHeight: 42,
  stroke: false,
  strokeThickness: 4,
  fill: '#000',
};
const scrollStyle = {
  backgroundColor: 0x777777,
  backgroundAlpha: 0.5,
  backgroundWidth: 18,
  buttonColor: 0x777777,
  buttonAlpha: 0.7,
  buttonWidth: 14,
};


export default class History extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      vertical: 1
    };
  }
  componentDidMount() {
    this.setState({
      data: core.plugins.history.getData()
    });
  }
  playVoice(file) {
    core.plugins.audio.create('voice', `assets/voice/${file}.mp3`);
  }
  render() {

    return (
      <Dialog width={1280} height={720} dragable={false}>
        <Image src='common/bg.png' />
        <Layout
          baseline={0} direction='vertical' maxWidth={1050} maxHeight={420} vertical={this.state.vertical}
          x={0} y={170} overflowX='hidden' overflowY='scroll' scrollStyle={scrollStyle}
          fillColor={0xffffff} fillAlpha={0} padding={[170, 0, 0, 0]} interval={5} clip={true}
          onScroll={({ vertical }) => this.setState({ vertical })}
        >
        {
          this.state.data.map((value, index) => {
            return (
              <Layer key={index} height={42}>
              {value.name ? <Text text={value.name} style={{ ...style, fill: 0x426ab3 }} x={0} /> : null}
              <Text text={value.text} style={style} x={0} y={value.name ? 30 : 0}/>
              </Layer>
            );
          })
        }
        </Layout>
        <Button
          src='common/return.png' x={170} y={100} onClick={e => {
            this.context.router.goBack();
            e.stopPropagation();
          }}
          onTap={e => {
            this.context.router.goBack();
            e.stopPropagation();
          }}
        />
      </Dialog>
    );
  }
}
