import React, { Component } from 'react'
import { Button, Modal, Icon, Form} from 'semantic-ui-react'

class SignupModal extends Component {
  state = {
    modalOpen: false,
    email: null,
    nickname: null,
  }


  handleOpen  = () => this.setState({ modalOpen: true })
  handleClose = () => this.setState({ modalOpen: false })

  handleSignup = () => {
    console.log("signup", this.state.email, this.state.nickname)
  }


  render() {
    return(
      <Modal open={this.state.modalOpen} onClose={this.handleClose} >
        <Modal.Header>Signup</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form>
              <Form.Field required>
                <label>Nickname</label>
                <input placeholder='Nickname' onChange={(e) => {this.setState({nickname: e.target.value})}} />
              </Form.Field>

              <Form.Field required>
                <label>Email</label>
                <input placeholder='Email' onChange={(e) => {this.setState({email: e.target.value})}} />
              </Form.Field>

            </Form>


          </Modal.Description>
        </Modal.Content>

        <Modal.Actions>
          <Button color='green' onClick={this.handleSignup} inverted>
            <Icon name='checkmark'/> Signup
          </Button>

          <Button color='red' onClick={this.handleClose} inverted>
            <Icon name='close'/> Close
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }

}

export default SignupModal
