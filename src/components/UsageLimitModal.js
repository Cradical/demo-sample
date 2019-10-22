import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

import NotFound from '../NotFound'
import PrismicReact from 'prismic-reactjs'

export default class UsageLimitModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      doc: null,
      notFound: false,
      modalToggled: false,
      exceededStorage: false,
    }

    this.fetchModalContent = this.fetchModalContent.bind(this)
    this.toggleModalHeader = this.toggleModalHeader.bind(this)
    this.toggleModalCancel = this.toggleModalCancel.bind(this)

    // if (props.props.primsicCtx) {
    //   this.fetchModalContent(this.props.props)
    // }
  }

  componentDidMount() {
    this.props.props.prismicCtx.toolbar()
    // We fetch the page only after it's ready to query the api
    if (this.props.props.prismicCtx) {
      this.fetchModalContent(this.props.props)
    }
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

  toggleModalHeader() {
    this.props.toggleStorageState()
    this.setState({
      doc: null,
    })
  }

  toggleModalCancel() {
    this.props.toggleBandwidthState()
    this.setState({
      doc: null,
    })
  }

  render() {
    const { state, className } = this.props
    if (this.state.doc) {
      return (
        <div data-wio-id={this.state.doc.id}>
          <Modal
            isOpen={state.isModalOpen}
            modalTransition={{ timeout: 700 }}
            backdropTransition={{ timeout: 1300 }}
            toggle={this.props.isModalOpen}
            className={className}
          >
            <ModalHeader toggle={this.toggleModalHeader}>
              {PrismicReact.RichText.asText(this.state.doc.data.modal_title)}
            </ModalHeader>
            <img alt='cover' src={this.state.doc.data.modal_image.url} />
            <ModalBody>
              {PrismicReact.RichText.render(
                this.state.doc.data.modal_message,
                this.props.props.prismicCtx.linkResolver
              )}
            </ModalBody>
            <ModalFooter>
              <Button color='primary' onClick={this.props.isModalOpen}>
                Do Something
              </Button>{' '}
              <Button color='secondary' onClick={this.toggleModalCancel}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      )
    } else if (this.state.notFound) {
      return <NotFound />
    }
    return <h1>Run A User Example</h1>
  }
}
