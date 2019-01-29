import {
  observable,
  computed,
  action,
} from 'mobx'

export default class AppState {
  constructor({ count, name } = { count: 0, name: 'zhanglong' }) {
    this.count = count
    this.name = name
  }

  @observable count

  @observable name

  @computed get total() {
    return this.count
  }

  @action add() {
    this.count += 1
  }

  @action changeName(name) {
    debugger  //eslint-disable-line
    this.name = name
  }

  toJson() {
    return {
      count: this.count,
      name: this.name,
    }
  }
}
