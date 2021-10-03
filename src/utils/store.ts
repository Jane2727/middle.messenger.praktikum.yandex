import { Dictionary } from './block';

export class Store {
    private state: Dictionary = {};

    public getState() {
      return this.state;
    }

    public setState(newValue: any) {
      Object.assign(this.state, newValue);
    }
}

export default Store;
