import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Button
} from 'reactstrap';
import LoginForm from './LoginForm';
import AccountCircle from 'react-icons/lib/md/account-circle';

class Navigation extends React.Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  signOut = () => {
    const { userLogOut } = this.props;
    userLogOut();
    window.location.reload();
  };

  render() {
    const { changeRoute, user, userLogin } = this.props;

    return (
      <Navbar color="faded" light expand="lg">
        <a style={{ fontSize: '2rem' }} className="text-danger brand" href="/">
          Flow:er
        </a>
        <NavbarToggler onClick={this.toggle} className="mr-2" />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {user ? (
              <Button
                onClick={this.signOut}
                size="md"
                className="mt-3"
                outline
                color="danger"
              >
                Log out {user.username} <AccountCircle />
              </Button>
            ) : (
              <NavItem>
                <NavLink className="text-info brand" onClick={changeRoute}>
                  {' '}
                  not a member ? register here.
                </NavLink>
              </NavItem>
            )}
            {user ? null : (
              <LoginForm
                userLogin={userLogin}
                user={user}
                isOpen={this.state.isOpen}
              />
            )}
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default Navigation;
