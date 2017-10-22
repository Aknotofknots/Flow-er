import React, {Component} from 'react';
import CommentForm from './CommentForm';
import {
    Card,
    CardImg,
    CardTitle,
    CardText,
    CardDeck,
    CardBody,
    Col
} from 'reactstrap';


const NewsCardContent = ({articles,
                             user,
                             addComment,
                             removeComment,
                             comments,
                             deleteUser,
                         usercredentials}) => {

    const renderCards = (article) => {

        return (
            <Col style={{marginTop: "10px", marginBottom: "10px"}} key={article.key} xs="12" sm="12" md="6">
                <CardDeck>
                    <Card>
                        <CardImg top width="100%"
                                 src={article.urlToImage}
                                 alt="News Post"/>
                        <CardBody>
                            <CardTitle style={{fontSize: "1rem"}}>{article.title}</CardTitle>
                            <CardText>{article.description}...</CardText>
                            <CommentForm deleteUser={deleteUser}
                                         removeComment={removeComment}
                                         comments={comments}
                                         addComment={addComment}
                                         user={user}
                                         postId={article.key}
                                         url={article.url}
                                         usercredentials={usercredentials}
                            />
                        </CardBody>
                    </Card>
                </CardDeck>
            </Col>
        )

    };


    // this articles are for advertising and
    const landingPageArticles = user ? articles.slice() : articles.slice(0, 4);

    return (landingPageArticles.map(renderCards))

};

export default NewsCardContent;

