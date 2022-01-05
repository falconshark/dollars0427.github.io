import { React, Component, components, ui, core } from 'avg-core';
import Confirm from '../components/Confirm';
import Dialog from './dialog';

const { Image, Text } = components;
const { Button } = ui;


const style = {
  fontFamily: ['微软雅黑', 'PingFang SC'],
  fontSize: 20,
  fontStyle: 'normal',
  lineHeight: 40,
  fill: '#fff',
};
const numStyle = {
  fontFamily: ['微软雅黑', 'PingFang SC'],
  fontSize: 20,
  fontStyle: 'normal',
  lineHeight: 20,
  fill: '#ffffff',
};


// Button sprite positions
const buttonPos = [[170, 170], [700, 170], [170, 320], [700, 320], [170, 470], [700, 470]];

export default class Load extends Component {
  static contextTypes = {
    router: React.PropTypes.any,
    location: React.PropTypes.any,
  }
  constructor(props) {
    super(props);

    this.state = {
      process: 0,
      vertical: 0,
      data: [],
      confirmText: null,
      confirmCallback: null
    };
  }
  componentDidMount() {
    this.updateList();
  }
  async updateList() {
    const ctx = {};

    await core.post('info-archive', ctx);

    const data = [];
    const keys = Object.keys(ctx.infos);

    for (let i = 0; i < 6; i++) {
      const key = `archive-${i + 1}`;

      if (keys.includes(key)) {
        const info = ctx.infos[key];
        const extra = info.extra || '{}';
        const { title, text, shot } = extra;

        data.push({
          time: (new Date(info.time)).toLocaleString(),
          title,
          text,
          shot,
        });

      } else {
        data.push(null);
      }
    }

    this.setState({ data });
  }
  async handleSave(no) {
    if (!this.state.data[no]) {
      console.log('not found');

      return;
    }

    const ret = await new Promise((resolve, reject) => {
      this.setState({ confirmText: `Load archive No. ${no + 1}?`, confirmCallback: resolve, alpha: 1 });
    });

    if (ret) {
      const name = `archive-${no + 1}`;
      const isStory = this.props.location.pathname.indexOf('/story') !== -1;

      if (isStory) {
        await core.post('load-archive', { name });
        this.context.router.goBack();
      } else {
        this.context.router.replace({
          pathname: '/story',
          state: name,
        });
      }
    }
    this.setState({ confirmText: null, confirmCallback: null, alpha: 1 });
  }
  render() {
    const data = [...this.state.data];

    for (let i = data.length; i < 6; i++) {
      data[i] = null;
    }

    return (
      <Dialog>
        {
          data.map((_value, index) => {

            const value = _value || {};

            return (
              <Button
                src={`saveload/item_bg.png`} key={index}
                onClick={() => this.handleSave(index)} onTap={() => this.handleSave(index)}
                position={buttonPos[index]}
              >
                <Text text={`No. ${String(index + 1)}`} style={numStyle} position={[9, 12]} />
                <Image src={value.shot || ''} x={229} y={12} />
                <Text text={(value.time || '').replace(' ', '\n')} style={style} x={9} y={48} />
              </Button>
            );
          })
        }
        <Confirm title={this.state.confirmText} callback={this.state.confirmCallback} show={!!this.state.confirmText} />
      </Dialog>
    );
  }
}
