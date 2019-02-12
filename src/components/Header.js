import React from 'react';
import { Jumbotron, Button } from 'reactstrap';

const Header = ({ changeRoute }) => (
  <Jumbotron className="text-center bg-warning">
    <h1 className="display-5">
      The latest gaming and digital entertainment news
    </h1>
    <hr style={{ width: '25%' }} className="border-primary border-light" />
    <div className="py-5">
      <p className="h6">
        Brought to you straight from one of the biggest sources for digital
        entertainment - IGN
      </p>
      <p className="lead">
        Join the community and become a <em className="text-danger">Flow:er</em>
      </p>
      <Button onClick={changeRoute} outline color="danger" size="md">
        Learn more
      </Button>
    </div>
  </Jumbotron>
);

export default Header;
