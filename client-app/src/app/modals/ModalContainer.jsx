import React from 'react'
import {observer, inject} from 'mobx-react';
import { Modal } from 'semantic-ui-react'

const ModalContainer = ({modalStore: {open, component, header, closeModal}}) => (
  <Modal open={open} onClose={closeModal} size='mini'>
    <Modal.Header>{header}</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        {component}
      </Modal.Description>
    </Modal.Content>
  </Modal>
)

export default inject('modalStore')(observer(ModalContainer));