import React, { Component } from 'react'
import { Button } from 'reactstrap'

import UsageLimitModal from './UsageLimitModal'
import UsageLimitAlert from './UsageLimitAlert'

export default class HomePage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      exceededStorage: false,
      exceededBandwidth: false,
      isModalOpen: false,
      isAlertOpen: false,
    }

    this.toggleStorageState = this.toggleStorageState.bind(this)
    this.toggleBandwidthModal = this.toggleBandwidthModal.bind(this)
    this.toggleBandwidthAlert = this.toggleBandwidthAlert.bind(this)
    this.isModalOpen = this.isModalOpen.bind(this)
    this.renderModal = this.renderModal.bind(this)
    this.isAlertOpen = this.isAlertOpen.bind(this)
  }

  isModalOpen(prevState) {
    this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen,
    }))
  }

  isAlertOpen(prevState) {
    this.setState(prevState => ({
      isAlertOpen: !prevState.isAlertOpen,
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
          toggleBandwidthModal={this.toggleBandwidthModal.bind(this)}
        />
      )
    }

    return null
  }

  renderAlert() {
    if (this.state.exceededStorage || this.state.exceededBandwidth) {
      return (
        <UsageLimitAlert
          props={this.props}
          state={this.state}
          toggleBandwidthModal={this.toggleBandwidthModal.bind(this)}
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

  toggleBandwidthModal() {
    this.isModalOpen()
    this.setState(prevState => ({
      exceededBandwidth: !prevState.exceededBandwidth,
    }))
  }

  toggleBandwidthAlert() {
    this.isAlertOpen()
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
        <Button onClick={this.toggleBandwidthModal} color='info'>
          Simulate Bandwidth Modal
        </Button>
        <br />
        <div>
          <Button onClick={this.toggleBandwidthAlert} color='info'>
            Simulate Bandwidth Alert
          </Button>
        </div>
        {this.renderModal()}
        {this.renderAlert()}
      </div>
    )
  }
}
