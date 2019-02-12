import * as actions from '../actions/actions';
import { bindActionCreators } from 'redux';

export function mapStateToProps(state) {
  return {
    user: state.user,
    articles: state.articles,
    comments: state.comments,
    notifications: state.notifications
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}
