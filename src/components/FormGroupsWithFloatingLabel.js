import React from 'react';

const EmailInput = ({ handleInput }) => (
  <label style={styles.label} className="form-group has-float-label">
    <input
      onChange={handleInput}
      required
      style={styles.input}
      contentEditable
      className="form-control"
      type="email"
      name="email"
      placeholder="email@example.com"
    />
    <span>Email</span>
  </label>
);

const PasswordInput = ({ handleInput }) => (
  <label style={styles.label} className="form-group has-float-label">
    <input
      onChange={handleInput}
      required
      className="form-control"
      type="password"
      name="password"
      placeholder="Your super password"
    />
    <span>Password</span>
  </label>
);

const UserNameInput = ({ handleInput }) => (
  <label style={styles.label} className="form-group has-float-label">
    <input
      onChange={handleInput}
      className="form-control"
      type="text"
      name="username"
      placeholder="Your user name"
    />
    <span>Username</span>
  </label>
);

const styles = {
  label: {
    fontSize: '0.75rem'
  }
};

export { EmailInput, PasswordInput, UserNameInput };
