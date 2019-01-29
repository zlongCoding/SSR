import React from 'react'
import PropTypes from 'prop-types'
import ThemeContext from './context'

class ChildList extends React.PureComponent {
  static contextTypes = {
    propA: PropTypes.string,
  }

  constructor() {
    super()
    this.state = {}
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
  }

  render() {
    const { nameString } = this.props
    const { propA } = this.context
    console.log(propA, nameString)
    return (
      <ThemeContext.Consumer>
        {({ theme }) => (
          <div>
            <div>{theme}</div>
            <div>{nameString}</div>
          </div>
        )}
      </ThemeContext.Consumer>
    )
  }
}

ChildList.propTypes = {
  nameString: PropTypes.arrayOf(PropTypes.number),
}
export default ChildList;
