import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader' //eslint-disable-line
import App from './views/App'
import { createStore } from './store/store'

const initState = window.__INITIAL__STATE__ || {} //eslint-disable-line
const render = (Component) => {
  const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate
  renderMethod(
    <AppContainer>
      <Provider {...createStore(initState)}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./views/App.jsx', () => {
    const NextApp = require('./views/App.jsx').default //eslint-disable-line
    render(NextApp)
  })
}
