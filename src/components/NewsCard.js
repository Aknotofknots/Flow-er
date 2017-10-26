import React, { Component } from "react";
import { Container, Row } from "reactstrap";
import NewsCardContent from "./NewsCardContent";

const NewsCard = ({
  articles,
  user,
  addComment,
  removeComment,
  comments,
  deleteUser
}) => {
  return (
    <Container style={{ borderRadius: "5px" }}>
      <Row>
        <NewsCardContent
          comments={comments}
          removeComment={removeComment}
          addComment={addComment}
          articles={articles}
          user={user}
          deleteUser={deleteUser}
        />
      </Row>
    </Container>
  );
};

export default NewsCard;
