import { React, Component, components, ui } from 'avg-core';

const { Tween, Image } = components;
const { Dialog: _Dialog, Button } = ui;

export default class Dialog extends Component {
  static contextTypes = {
    router: React.PropTypes.any,
    location: React.PropTypes.any,
  }
  constructor(props) {
    super(props);

    this.state = {
      alpha: 0
    };
  }
  componentDidMount() {
    this.tween.runTween('enter');
  }
  render() {
    const schemas = Tween.builder()
    .scheme('enter')
      .setProperty('main', { x: -1280, alpha: 0 })
      .parallel()
      .moveTo('main', { x: 0 }, 300, Tween.Easing.Cubic.Out)
      .fadeTo('main', 1, 300, Tween.Easing.Cubic.Out)
      .end()
      .callback(null, (a, b, c, finish) => {
        this.setState({ alpha: 1 });
        finish();
      })
    .end()

    .scheme('leave')
      .parallel()
      .moveTo('main', { x: -1280 }, 300, Tween.Easing.Cubic.In)
      .fadeTo('main', 0, 300, Tween.Easing.Cubic.In)
      .end()
      .callback(null, (a, b, c, finish) => {
        this.setState({ alpha: 0 });
        this.context.router.goBack();
        finish();
      })
    .end()

    .getSchemes();

    return (
      <Tween schemes={schemas} ref={tween => (this.tween = tween)}>
        <_Dialog width={1280} height={720} alpha={this.state.alpha} dragable={false} key='main'>
          <Image src='common/bg.png'/>
          { this.props.children }
          <Button
            src='common/return.png' x={170} y={100} onClick={e => {
              this.tween.runTween('leave');
              e.stopPropagation();
            }}
            onTap={e => {
              this.tween.runTween('leave');
              e.stopPropagation();
            }}
          />
        </_Dialog>
      </Tween>
    );
  }
}
