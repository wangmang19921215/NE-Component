import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import VerifyButton from '../../components/VerifyButton/VeirfyButton'
class App extends React.Component {
  constructor () {
    super()
    this.state = {
      text: '123'
    }
  }

  handleClick = () => {
    return false
  }

  render () {
    const {text} = this.state
    return (
      <div>
        <Link to="/">主页</Link>
        {this.props.children}
        <VerifyButton text={text} times={60} handleClick={() => {}} />
        <div onClick={this.handleClick}>CCCCCC</div>
      </div>
    )
  }
}

export default App
