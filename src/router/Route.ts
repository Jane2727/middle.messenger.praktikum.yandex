import { Dictionary } from '../utils/block';

const isEqual = (lhs: string, rhs: string) => lhs === rhs;

const render = (query: string, block: any) => {
  const root: HTMLElement | null = document.getElementById('root');
  if (root) root.innerHTML = block.transformToString();
};

export interface IRoute {
  navigate(pathname: string): void;
  leave(): void;
  match(pathname: string): boolean;
  render(): void;
}

class Route {
  _pathname: string;

  _blockClass: any;

  _block: null | Dictionary;

  _props: Dictionary;

  constructor(pathname: string, view: Dictionary, props: Dictionary) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.remove();
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    this._block = new this._blockClass(this._props.context);
    render(this._props.rootQuery, this._block);
  }
}

export default Route;
