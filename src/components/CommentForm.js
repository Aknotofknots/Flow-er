import React, {Component} from 'react';
import {Collapse, Card, Button, CardBody} from 'reactstrap';
import {connect} from 'react-redux';
import Avatar from 'react-icons/lib/md/person-pin'

import * as storeConfiguration from '../store/config/store_configuration';
import ToggleButton from './ToggleButton';


class CommentForm extends Component {

    state = {

        collapse: false
    };

    toggle = () => {

        this.setState({collapse: !this.state.collapse})

    };

    renderComments = (comment, index) => {

        const {
            removeComment,
            deleteUser,
            postId,
            user,
        } = this.props;

        if (postId === comment.postId) {

            return (
                <div className="comment" key={index}>
                    <p>
                        {
                            user.role === 'Administrator' ?
                                <span>
                                    <button className="username" onClick={() => {deleteUser(comment.user)}}>
                                    <strong> <Avatar/> {`delete ${comment.user}'s account`} </strong>
                                    </button>
                                    <button className="username" onClick={() => {this.props.actions.changeUserPrivileges(comment.user)}}>{`demote/promote ${comment.user}`}</button>
                                </span>
                                :
                                <strong><Avatar/> {comment.user}:</strong>
                        }
                        <br/>
                        <span>{comment.text}</span>
                        {
                            user.username === comment.user || user.role === 'Administrator' ?
                                <button
                                    onClick={() => {
                                        removeComment(comment)
                                    }}
                                    id="remove" className="mx-2" style={{
                                    color: "red",
                                    background: "none",
                                    border: "0",
                                    outline: "none"
                                }}> &times;
                                </button> :
                                <button
                                    id="remove" className="mx-2" style={{
                                    color: "red",
                                    background: "none",
                                    border: "0",
                                    outline: "none"
                                }}>
                                </button>
                        }
                    </p>
                </div>
            )
        }
    };


    handleSubmit = (e) => {

        e.preventDefault();

        const comment = this.refs.comment.value;
        const {postId, user} = this.props;
        const {addComment} = this.props.actions;
        const commentForm = this.refs.commentForm;

        addComment({

            text: comment,
            user: user.username,
            postId: postId

        });

        commentForm.reset()

    };


    render() {

        const {
            url,
            comments,
            user,
        } = this.props;

        return (
            <div>
                <span>
                <Button className="mx-0" color="success" outline size="sm" href={url}>Link to article</Button>
                <ToggleButton className="mx-auto" user={user} toggle={this.toggle}/>
                </span>
                <Collapse isOpen={this.state.collapse}>
                    <Card style={{marginTop: "20px"}}>
                        <CardBody>
                            <form className="comment-form" ref="commentForm" onSubmit={this.handleSubmit}>
                                <input type="text" ref="comment" placeholder="You comment goes here..."/>
                            </form>
                            {
                                comments.map(this.renderComments)
                            }
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        )
    }

}

export default connect(storeConfiguration.mapStateToProps, storeConfiguration.mapDispatchToProps)(CommentForm);
