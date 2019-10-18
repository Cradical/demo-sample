import React, { Component } from 'react'
import { Button } from 'reactstrap'

import UsageLimitModal from './UsageLimitModal'

export default class HomePage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      exceededStorage: false,
      exceededBandwidth: false,
    }
  }

  renderModal() {
    return <UsageLimitModal props={this.props} state={this.state} />
  }

  render() {
    return (
      <div>
        <h1>This is the Home Page!! </h1>
        <Button color='info'>Simulate Storage Modal</Button>
      </div>
    )
  }
}
