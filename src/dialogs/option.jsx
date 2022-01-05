import { React, Component, components, ui, core } from 'avg-core';
import Slider from '../components/Slider';
import Dialog from './dialog';

const { Text } = components;
const { Checkbox, Button } = ui;

const style = {
  fontFamily: ['微软雅黑', 'PingFang SC'],
  fontSize: 28,
  fontStyle: 'normal',
  lineHeight: 36,
  stroke: '#4c4647',
  strokeThickness: 5,
  fill: '#fff',
};

export default class Config extends Component {
  static contextTypes = {
    router: React.PropTypes.any,
    location: React.PropTypes.any,
  }
  constructor(props) {
    super(props);

    this.state = {
      textSpeedValue: 1,
      autoSpeedValue: 1,
      BGMVolValue: 1,
      seVolValue: 1,
      voiceVolValue: 1
    };
  }
  componentDidMount() {
    this.refresh();
  }
  async refresh() {
    const ctx = {};
    await core.post('script-get-autointerval', ctx);

    this.setState({
      autoSpeedValue: ctx.autoInterval / 3000,
      BGMVolValue: core.plugins.audio.channelVolume('bgm') || 1,
      seVolValue: core.plugins.audio.channelVolume('se') || 1,
      voiceVolValue: core.plugins.audio.channelVolume('voice') || 1,
    });
  }
  handleFullscreenChange(value) {
    if (value) {
      core.plugins.fullscreen.request();
    } else {
      core.plugins.fullscreen.exit();
    }
  }
  handleAutoSpeed(value) {
    core.post('script-set-autointerval', { autoInterval: 3000 * value });
  }
  handleBGMVol(value) {
    core.plugins.audio.channelVolume('bgm', value);
  }
  handleSeVol(value) {
    core.plugins.audio.channelVolume('se', value);
  }
  handleVoiceVol(value) {
    core.plugins.audio.channelVolume('voice', value);
  }
  render() {

    return (
      <Dialog>
        <Button
          src='option/title.png' x={370} y={100} onClick={e => {
            this.context.router.push('/title');
            e.stopPropagation();
          }}
          onTap={e => {
            this.context.router.push('/title');
            e.stopPropagation();
          }}
        />

        <Text text='Auto Interval' position={[170, 200]} style={style} />
        <Slider x={170} y={250} defaultValue={this.state.autoSpeedValue} onChange={this.handleAutoSpeed.bind(this)}/>
        <Text text='BGM Volume' position={[170, 300]} style={style} />
        <Slider x={170} y={350} defaultValue={this.state.BGMVolValue} onChange={this.handleBGMVol.bind(this)}/>
        <Text text='SE Volume' position={[170, 400]} style={style} />
        <Slider x={170} y={450} defaultValue={this.state.seVolValue} onChange={this.handleSeVol.bind(this)}/>
        <Text text='Voice Volume' position={[170, 500]} style={style} />
        <Slider x={170} y={550} defaultValue={this.state.voiceVolValue} onChange={this.handleVoiceVol.bind(this)}/>

        <Text text='Screen' position={[700, 200]} style={style} />
        <Checkbox src='option/screen_full.png' position={[700, 250]} name={'fullscreen'} value={true} defaultChecked={core.plugins.fullscreen.isFullscreen} onChange={this.handleFullscreenChange.bind(this)}/>
        <Checkbox src='option/screen_window.png' position={[900, 250]} name={'fullscreen'} value={false} defaultChecked={!core.plugins.fullscreen.isFullscreen} />
      </Dialog>
    );
  }
}
