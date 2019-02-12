import React from 'react';
import { Button } from 'reactstrap';
import Comment from 'react-icons/lib/md/comment';

const ToggleButton = ({ toggle, user }) => {
  const button = user ? (
    <Button onClick={toggle} color="dark" outline size="sm">
      Comments <Comment />
    </Button>
  ) : (
    <Button disabled onClick={toggle} color="dark" outline size="sm">
      Comment ( members only ) <Comment />
    </Button>
  );

  return button;
};

export default ToggleButton;
