import AppDispatcher from '../dispatcher/AppDispatcher';
import CommentConstants from '../constants/CommentConstants';

const CommentActions = {
  loadComment() {
    AppDispatcher.dispatch({
      type: CommentConstants.LOAD_COMMENT
    });
    fetch('/api/response.json')
      .then((res) => {
        AppDispatcher.dispatch({
          type: CommentConstants.LOAD_COMMENT_SUCCESS,
          payload: {
            comment: value
          }
        });
      })
      .catch((err) => {
        AppDispatcher.dispatch({
          type: CommentConstants.LOAD_COMMENT_SUCCESS,
          payload: {
            comment: value
          }
        });
      });
  },

  addComment(text) {
    AppDispatcher.dispatch({
      type: CommentConstants.ADD_COMMENT
    });

    fetch('/api/submit.json', {
      method: 'POST',
      body: JSON.stringify({
        value: encodeURI(text)
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      return res.json();
    })
    .then(value => {
      if (value.ok) {
        AppDispatcher.dispatch({
          type: CommentConstants.ADD_COMMENT_SUCCESS,
          payload: {
            comment: value
          }
        });
        this.loadComment()
      }
    })
  }
}