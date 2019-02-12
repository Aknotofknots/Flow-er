import React, { Component } from 'react';
import { Form, Button } from 'reactstrap';
import { EmailInput, PasswordInput } from './FormGroupsWithFloatingLabel';
import VideoGameAsset from 'react-icons/lib/md/videogame-asset';

class LoginForm extends Component {
  state = {
    email: '',
    password: ''
  };

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  signIn = e => {
    e.preventDefault();

    const { email, password } = this.state;
    const { user, userLogin } = this.props;

    userLogin({
      email,
      password,
      user
    });
  };

  render() {
    const { isOpen } = this.props;

    const form = isOpen ? (
      <Form onSubmit={this.signIn}>
        <EmailInput handleInput={this.handleInput} />
        <PasswordInput handleInput={this.handleInput} />
        <Button type="submit" outline color="danger" size="sm">
          Login <VideoGameAsset />
        </Button>
      </Form>
    ) : (
      <Form inline onSubmit={this.signIn}>
        <EmailInput handleInput={this.handleInput} />
        <PasswordInput handleInput={this.handleInput} />
        <Button
          type="submit"
          style={this.styles.button}
          outline
          color="danger"
          size="sm"
        >
          Login <VideoGameAsset style={this.styles.typography} />
        </Button>
      </Form>
    );

    return form;
  }

  styles = {
    button: {
      marginLeft: '5px'
    },

    typography: {
      fontSize: '2rem'
    }
  };
}

export default LoginForm;
