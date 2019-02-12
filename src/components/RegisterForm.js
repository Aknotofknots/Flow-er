import React, { Component } from 'react';
import {
  Button,
  Container,
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import {
  EmailInput,
  PasswordInput,
  UserNameInput
} from './FormGroupsWithFloatingLabel';

class RegisterForm extends Component {
  state = {
    email: '',
    password: '',
    username: '',
    dropdownOpen: false,
    role: ''
  };

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleClick = e => {
    const role = e.target.textContent;

    this.setState({ role });
  };

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  register = e => {
    e.preventDefault();
    const { registerUser, changeRoute } = this.props;
    const localState = { ...this.state };
    registerUser(localState);

    const registerForm = this.refs.registerForm;
    registerForm.reset();
    setTimeout(changeRoute, 1000);
  };

  render() {
    const { changeRoute } = this.props;
    const { role } = this.state;

    return (
      <Container style={this.styles}>
        <Row>
          <Col className="mx-auto" md="8" lg="8">
            <h1
              style={{ marginBottom: '40px' }}
              className="lead font-weight-bold text-center"
            >
              Become a member today !
            </h1>
            <form ref="registerForm" onSubmit={this.register}>
              <UserNameInput handleInput={this.handleInput} />
              <EmailInput handleInput={this.handleInput} />
              <PasswordInput handleInput={this.handleInput} />

              <Dropdown
                size="sm"
                style={{ marginBottom: '20px' }}
                isOpen={this.state.dropdownOpen}
                toggle={this.toggle}
              >
                <DropdownToggle caret>
                  {role ? role : 'Choose role'}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Choose a role</DropdownItem>
                  <DropdownItem onClick={this.handleClick}>Member</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={this.handleClick}>
                    Administrator
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <Button type="submit" color="danger" block size="md">
                Sign up !
              </Button>
              <hr />
              <a className="text-info brand" onClick={changeRoute}>
                Go back to main page
              </a>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }

  styles = {
    marginTop: '70px'
  };
}

export default RegisterForm;
