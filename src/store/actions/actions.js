import firebase from "../../firebase";
import uuid from "uuid/v5";
import axios from "axios";

function checkUserStatus() {
  return function(dispatch) {
    firebase.auth().onAuthStateChanged(userPresent => {
      if (userPresent) {
        const userUid = userPresent.uid;
        firebase
          .database()
          .ref(`users/${userUid}`)
          .once("value")
          .then(user => {
            dispatch({
              type: "SIGN_IN",
              user: user.val()
            });
          });

        //get all comments once a user logs in and and add the to the redux store
        firebase
          .database()
          .ref("comments")
          .child("newspost")
          .once("value")
          .then(comments => {
            if (comments) {
              let payload = Object.values(comments.val()).map(comment => {
                return comment;
              });

              payload.map(comment => {
                dispatch({
                  type: "ADD_COMMENT",
                  payload: comment
                });
              });
            }
          })
          .catch(error => console.log(error));
      } else {
        dispatch({
          type: "SIGN_OUT",
          user: ""
        });
      }
    });
  };
}

function registerUser(userData) {
  return function(dispatch) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(userData.email, userData.password)
      .then(user => {
        if (userData.role !== "Member" && userData.role !== "Administrator") {
          userData.role = "Member";
        }

        const newUser = {
          email: user.email,
          role: userData.role,
          username: userData.username,
          userPassword: userData.password,
          userUid: user.uid
        };

        firebase
          .database()
          .ref(`users/${user.uid}`)
          .set(newUser);
      })
      .catch(err => console.log(err));
  };
}

function userLogin(userData) {
  return function(dispatch) {
    firebase
      .auth()
      .signInWithEmailAndPassword(userData.email, userData.password)
      .catch(err => {
        console.log(err);
      });
  };
}

function userLogOut() {
  return function(dispatch) {
    firebase
      .auth()
      .signOut()
      .catch(err => {
        console.log(err);
      });
  };
}

function changeUserPrivileges(clickedUsername) {
  return function(dispatch) {
    firebase
      .database()
      .ref("users")
      .once("value", users => {
        const values = Object.values(users.val());
        let uid = "";

        values.filter(user => {
          if (user.username === clickedUsername) {
            let role =
              user.role === "Administrator" ? "Member" : "Administrator";

            firebase
              .database()
              .ref(`users/${user.userUid}/role`)
              .set(role)
              .then(() => {
                window.alert(`you made ${clickedUsername} a(n) ${role}`);
              });
          }
        });
      });
  };
}

function updateDatabaseWithArticles() {
  return function(dispatch) {
    const request = process.env.REACT_APP_NEWS_REQUEST;

    axios(request).then(response => {
      const articles = [...response.data.articles];

      articles.map(article => {
        firebase
          .database()
          .ref(`articles/${uuid(article.url, uuid.URL)}`)
          .set(article);
      });
    });
  };
}

function fetchArticlesAndUpdateState() {
  return function(dispatch) {
    firebase
      .database()
      .ref("articles")
      .limitToLast(12)
      .once("value", articles => {
        const fetchedArticles = Object.values(articles.val());
        const articlesWithKey = [];

        fetchedArticles.map(article => {
          articlesWithKey.push({
            ...article,
            key: uuid(article.url, uuid.URL)
          });
        });

        dispatch({
          type: "ADD_ARTICLES",
          payload: articlesWithKey
        });
      });
  };
}

function addComment(comments) {
  return function(dispatch) {
    const commentId = firebase
      .database()
      .ref("comments")
      .child("newspost")
      .push(comments).key;

    comments.commentId = commentId;

    firebase
      .database()
      .ref("comments")
      .child(`newspost/${comments.commentId}`)
      .set(comments)
      .then(() => {
        dispatch({
          type: "ADD_COMMENT",
          payload: comments
        });
      });
  };
}

function removeComment(comment) {
  return function() {
    firebase
      .database()
      .ref(`comments/newspost/${comment.commentId}`)
      .remove(error => console.log("error", error));
  };
}

function onCommentRemoved() {
  //listen for when a child is removed and update redux state described here : https://github.com/reactjs/redux/issues/2033
  return function(dispatch) {
    firebase
      .database()
      .ref("comments")
      .child("newspost")
      .on("child_removed", removedComment => {
        dispatch({
          type: "REMOVE_COMMENT",
          payload: removedComment.val()
        });
      });
  };
}

function deleteUserAccount(clickedUsername) {
  return function(dispatch) {
    firebase
      .database()
      .ref("users")
      .once("value", users => {
        const values = Object.values(users.val());
        let userInfo = {};

        values.filter(value => {
          if (value.username === clickedUsername) {
            userInfo.email = value.email;
            userInfo.password = value.userPassword;
          }
        });

        firebase
          .auth()
          .signInWithEmailAndPassword(userInfo.email, userInfo.password)
          .then(user => {
            let userUid = user.uid;

            user.delete().then(() => {
              firebase
                .database()
                .ref(`users/${userUid}`)
                .remove();
              window.location.reload();
              window.alert(
                `the user ${clickedUsername} was deleted. please log in again.`
              );
            });
          })
          .catch(error => {
            console.log(error);
          });
      });
  };
}

export {
  changeUserPrivileges,
  deleteUserAccount,
  onCommentRemoved,
  userLogOut,
  userLogin,
  registerUser,
  fetchArticlesAndUpdateState,
  updateDatabaseWithArticles,
  checkUserStatus,
  addComment,
  removeComment
};
