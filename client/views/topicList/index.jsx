import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import AppState from '../../store/app_state'

@inject('appState')
@observer
class TopicList extends React.Component {
  constructor() {
    super()
    this.state = {
      name: 'womende',
    }
  }

  componentWillMount() {
    this.setState({
      name: '服务端渲染',
    })
  }

  componentDidMount() {
    console.log(111)
    console.log(this.props)
    const { appState } = this.props
    appState.add()
  }

  bootstrap() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const { appState } = this.props
        appState.add()
        resolve(true)
      })
    })
  }

  render() {
    const { appState } = this.props
    const { name } = this.state
    return (
      <div>
        <a>
          {appState.count}
          ,
          {name}
        </a>
      </div>
    )
  }
}

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState),
}

export default TopicList;
