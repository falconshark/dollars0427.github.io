import { React, Component, components, core } from 'avg-core';

const { Image, Text } = components;

const style = {
  fontFamily: ['微软雅黑', 'PingFang SC'],
  fontSize: 36,
  fontStyle: 'normal',
  lineHeight: 18,
  dropShadow: false,
  dropShadowDistance: 2.5,
  // strokeThickness: 4,
  fill: '#B0E0E6',
};

export default class Namebox extends Component {
  constructor(props) {
    super(props);

    this.handleScriptExec = this.handleScriptExec.bind(this);
    this.handleArchiveSave = this.handleArchiveSave.bind(this);
    this.handleArchiveLoad = this.handleArchiveLoad.bind(this);

    this.state = {
      text: '',
    };
  }
  componentDidMount() {
    core.use('script-exec', this.handleScriptExec);
    core.use('save-archive', this.handleArchiveSave);
    core.use('load-archive', this.handleArchiveLoad);
  }
  componentWillUnmount() {
    core.unuse('script-exec', this.handleScriptExec);
    core.unuse('save-archive', this.handleArchiveSave);
    core.unuse('load-archive', this.handleArchiveLoad);
  }
  async handleScriptExec(ctx, next) {
    if (ctx.command === '*') {
      const raw = ctx.params.raw;
      const start = raw.indexOf('【');
      const end = raw.indexOf('】');
      let name = '';

      if (start > -1 && end > -1) {
        name = raw.substring(start + 1, end);
        ctx.params.raw = raw.substr(end + 1) || '';
        this.setState({ text: name });
      }
    }
    await next();
  }
  async handleArchiveSave(ctx, next) {
    ctx.data.namebox = {
      text: this.state.text,
    };
    await next();
  }
  async handleArchiveLoad(ctx, next) {
    const text = ctx.data.namebox ? ctx.data.namebox.text : '';

    this.setState({ text });
    await next();
  }
  render() {
    return (
      <Text style={style} visible={!!this.state.text} x={this.props.x || 0} y={this.props.y || 0} text={this.state.text}/>
    );
  }
}
