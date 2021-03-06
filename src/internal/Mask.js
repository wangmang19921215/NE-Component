import React, { PropTypes, Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class Mask extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    show: PropTypes.bool
  }
  static defaultProps = {
    show: false
  }

  render() {
    const { show, prefixCls, backgroundColor, ...others } = this.props
    const style = {
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      backgroundColor: backgroundColor || 'rgba(0,0,0,0.5)'
    }
    return (
      <ReactCSSTransitionGroup
        transitionAppear
        transitionAppearTimeout={300}
        transitionEnter={false}
        transitionLeave
        transitionLeaveTimeout={300}
        transitionName='fade'
      >
        {
          show ? <div style={style} {...others} /> : null
        }
      </ReactCSSTransitionGroup>
    )
  }
}

export default Mask
