//node module imports
import React, {Component} from 'react';
import {connect} from 'react-redux'; // this is necessary to be able to provide the store to children components
import {Container} from 'reactstrap';


//custom module imports
import Navigation from './Navigation';
import RegisterForm from './RegisterForm';
import Header from './Header';
import NewsCard from './NewsCard';
import Footer from './Footer';


//css
import '../css/App.css'; //compile css with webpack

//store_config
import * as storeConfiguration from '../store/config/store_configuration';

//.env
require('dotenv').config();


class App extends Component {

    state = {

        email: '',
        password: '',
        user: '',
        root: true,
    };

    componentDidMount() {

        this.props.actions.checkUserStatus();
        this.props.actions.updateDatabaseWithArticles();
        this.props.actions.fetchArticlesAndUpdateState();
        this.props.actions.onCommentRemoved();

        const historyState = {
            page: "main"
        };
        window.history.pushState(historyState, "", "/");
    }

    registerRoute = () => {

        const historyState = {

            page: "register"

        };

        window.history.pushState(historyState, "", 'register');

        this.setState({root: !this.state.root})

    };

    mainRoute = () => {

        const historyState = {

            page: "main"
        };

        window.history.pushState(historyState, "", '/');

        this.setState({root: !this.state.root})

    };


    render() {

        const {root} = this.state;
        const {
            user,
            comments,
            articles,
        } = this.props;

        const {
            registerUser,
            userLogin,
            userLogOut,
            addComment,
            removeComment,
            deleteUserAccount
        } = this.props.actions;

        const route = root ?
            <div className="App">
                <Container>
                    <Navigation userLogOut={userLogOut}
                                userLogin={userLogin}
                                user={user}
                                changeRoute={this.registerRoute}
                    />
                    {
                        user ?
                            <div>
                                <h1 className="text-center">Latest headlines</h1>
                                <hr style={{width: "25%"}} className="border-info"/>
                            </div>
                            :
                            <Header changeRoute={this.registerRoute}/>

                    }

                </Container>
                <NewsCard deleteUser={deleteUserAccount}
                          comments={comments}
                          addComment={addComment}
                          removeComment={removeComment}
                          user={user}
                          articles={articles}
                />
                <Container>
                    <Footer/>
                </Container>
            </div>

            :

            <div className="App">
                <RegisterForm registerUser={registerUser} changeRoute={this.mainRoute}/>
            </div>;

        return (route);
    }
}


// to connect to react-redux we need to use the connects method here (and only here) in the export statement. this is a hiher order function and takes a component to "enhance"
// it so that we can use the store. we NEED to pass the above functions to the connect functions in order for this to work.

export default connect(storeConfiguration.mapStateToProps, storeConfiguration.mapDispatchToProps)(App);
