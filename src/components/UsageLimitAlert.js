import React, { Component } from 'react'
import { Alert } from 'reactstrap'

export default class UsageLimitAlert extends Component {
  constructor(props) {
    super(props)

    this.state = {
      doc: null,
      notFound: false,
      modalToggled: false,
    }

    this.onDismiss = this.onDismiss.bind(this)
  }

  fetchModalContent(props) {
    const storageModal = 'storage'
    const bandwidthModal = 'bandwidth'
    let queryParam = ''
    if (this.props.state.exceededStorage === true) {
      queryParam = storageModal
    } else {
      if (this.props.state.exceededBandwidth === true) {
        queryParam = bandwidthModal
      }
    }

    if (props.prismicCtx) {
      return props.prismicCtx.api.getByUID(
        'modal',
        queryParam,
        {},
        (err, doc) => {
          if (doc) {
            this.setState({ doc })
          } else {
            this.setState({ notFound: !doc })
          }
        }
      )
    }

    return null
  }

  onDismiss() {
    this.props.toggleBandwidthAlert()
    this.setState({
      doc: null,
    })
  }

  render() {
    return (
      <Alert
        color='info'
        isOpen={this.props.isAlertOpen}
        toggle={this.onDismiss}
      >
        I am an alert and I can be dismissed!
      </Alert>
    )
  }
}
