import AppStateClass from './app_state'

export const AppState = AppStateClass

export default {
  AppState,
}

export const createStore = (store) => {
  return {
    appState: new AppState(store ? store.appState : undefined),
  }
}
