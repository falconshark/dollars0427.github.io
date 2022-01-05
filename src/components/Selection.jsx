import { React, Component, components, core, ui } from 'avg-core';

const { Layer, Text } = components;
const { Button } = ui;

const style = {
  fontFamily: ['微软雅黑', 'PingFang SC'],
  fontSize: 30,
  lineHeight: 30,
  fill: '#fff',
};

class Textbutton extends Component {
  render() {
    return (
      <Button
        {...this.props}
        src={'selection_bar.png'} x={this.props.x} y={this.props.y} anchor={[0,0]}
        onClick={this.props.onClick} onTap={this.props.onTap} lite={false}
      >
        <Text text={this.props.text} style={style} x={271} y={49} anchor={this.props.anchor} />
      </Button>
    );
  }
}

export default class Selection extends Component {
  static contextTypes = {
    router: React.PropTypes.any,
  }
  constructor(props) {
    super(props);

    this.handleScriptExec = this.handleScriptExec.bind(this);
    this.handleArchiveSave = this.handleArchiveSave.bind(this);
    this.handleArchiveLoad = this.handleArchiveLoad.bind(this);

    this.state = {
      selections: [],
      enabled: false
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
    if (ctx.command === 'selection') {
      this.setState({
        selections: ctx.params.FL,
        enabled: true
      });
    }
    await next();
  }
  async handleArchiveSave(ctx, next) {
    ctx.data.selection = this.state;
    await next();
  }
  async handleArchiveLoad(ctx, next) {
    this.setState(ctx.data.selection);
    await next();
  }
  gotoChapter(name) {
    this.setState({
      selections: [],
      enabled: false
    }, () => this.context.router.push(`/story/${name}`))
  }
  render() {

    const length = this.state.selections.length;
    let selectionPos;

    if (length === 1) {
      selectionPos = [[360, 200]];
    } else if (length === 2) {
      selectionPos = [[360, 150], [360, 250]];
    } else if (length === 3) {
      selectionPos = [[360, 80], [360, 200], [360, 320]];
    }

    return (
      <Layer visible={this.state.enabled}>
        {
          this.state.selections.map((item, i) => {
            return <Textbutton text={item[1]} anchor={[0.5, 0.5]} x={selectionPos[i][0]} y={selectionPos[i][1]} key={i}
              onClick={() => this.gotoChapter(item[0])}
              onTap={() => this.gotoChapter(item[0])}
            />;
          })
        }
      </Layer>
    );
  }
}
