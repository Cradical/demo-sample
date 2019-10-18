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
    }

    if (props.primsicCtx) {
      this.fetchModalContent()
    }

    console.log('props_for_Modal: ', this.props)
  }

  componentDidUpdate(prevProps) {
    this.props.prismicCtx.toolbar()
    // We fetch the page only after it's ready to query the api
    if (!prevProps.prismicCtx) {
      this.fetchModalContent(this.props)
    }
  }

  fetchModalContent(props) {
    const storageModal = 'storage'
    const bandwidthModal = 'bandwidth'
    let queryParam = ''

    if (this.props.exceededStorage === true) {
      queryParam = storageModal
    } else {
      if (this.props.exceededBandwidth === true) {
        queryParam = bandwidthModal
      }
    }

    if (props.primsicCtx) {
      return props.primsicCtx.api.getByUID(
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

  toggleModal() {
    this.setState(prevState => {
      modalToggled: !prevState.modalToggled
    })
  }

  render() {
    const { buttonLabel, className } = this.props

    if (this.state.doc) {
      return (
        <div data-wio-id={this.state.doc.id}>
          <Button color='danger' onClick={this.toggleModal}>
            {buttonLabel}
          </Button>
          <Modal
            isOpen={this.state.modalToggled}
            modalTransition={{ timeout: 700 }}
            backdropTransition={{ timeout: 1300 }}
            toggle={this.toggleModal}
            className={className}
          >
            <ModalHeader toggle={this.toggleModal}>
              {PrismicReact.RichText.asText(this.state.doc.data.title)}
            </ModalHeader>
            <img alt='cover' src={this.state.doc.data.image.url} />
            <ModalBody>
              {PrismicReact.RichText.render(
                this.state.doc.data.description,
                this.props.prismicCtx.linkResolver
              )}
            </ModalBody>
            <ModalFooter>
              <Button color='primary' onClick={this.toggleModal}>
                Do Something
              </Button>{' '}
              <Button color='secondary' onClick={this.toggleModal}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      )
    } else if (this.state.notFound) {
      return <NotFound />
    }
    return <h1>Loading</h1>
  }
}
