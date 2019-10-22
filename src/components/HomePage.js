import React, { Component } from 'react'
import { Button } from 'reactstrap'

import UsageLimitModal from './UsageLimitModal'

export default class HomePage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      exceededStorage: false,
      exceededBandwidth: false,
      isModalOpen: false,
    }

    this.toggleStorageState = this.toggleStorageState.bind(this)
    this.toggleBandwidthState = this.toggleBandwidthState.bind(this)
    this.isModalOpen = this.isModalOpen.bind(this)
    this.renderModal = this.renderModal.bind(this)
  }

  isModalOpen(prevState) {
    this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen,
    }))
  }

  renderModal() {
    if (this.state.exceededStorage || this.state.exceededBandwidth) {
      return (
        <UsageLimitModal
          props={this.props}
          state={this.state}
          isModalOpen={this.isModalOpen.bind(this)}
          toggleStorageState={this.toggleStorageState.bind(this)}
          toggleBandwidthState={this.toggleBandwidthState.bind(this)}
        />
      )
    }

    return null
  }

  toggleStorageState(prevState) {
    this.isModalOpen()
    this.setState(prevState => ({
      exceededStorage: !prevState.exceededStorage,
    }))
  }

  toggleBandwidthState() {
    this.isModalOpen()
    this.setState(prevState => ({
      exceededBandwidth: !prevState.exceededBandwidth,
    }))
  }

  render() {
    return (
      <div>
        <h1>Home Page for user account!! </h1>
        <Button onClick={this.toggleStorageState} color='info'>
          Simulate Storage Modal
        </Button>
        <br />
        <Button onClick={this.toggleBandwidthState} color='info'>
          Simulate Bandwidth Modal
        </Button>
        {this.renderModal()}
      </div>
    )
  }
}
