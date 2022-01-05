import { React, Component, components, ui } from 'avg-core';

const { Image } = components;
const { Button } = ui;

export default class Title extends Component {
  static contextTypes = {
    router: React.PropTypes.any
  }
  static propTypes = {
    children: React.PropTypes.any
  }
  jumpTo(path) {
    this.context.router.push(path);
  }
  render() {
    return (
      <Image src='common/bg.png'>
        <Button src={'title/start.png'} position={[211, 524]} onClick={() => this.jumpTo('/story')} onTap={() => this.jumpTo('/story')}/>
        <Button src={'title/load.png'} position={[447, 524]} onClick={() => this.jumpTo('/title/load')} onTap={() => this.jumpTo('/title/load')}/>
        <Button src={'title/option.png'} position={[683, 524]} onClick={() => this.jumpTo('/title/option')} onTap={() => this.jumpTo('/title/option')}/>
        <Button src={'title/info.png'} position={[919, 524]} onClick={() => this.jumpTo('/title/info')} onTap={() => this.jumpTo('/title/info')}/>
        { this.props.children }
      </Image>
    );
  }
}
