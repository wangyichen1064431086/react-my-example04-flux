import AppDispatcher from '../dispatcher/AppDispatcher';
import CommentConstants from '../constants/CommentConstants';

const CommentActions = { 
  /*
   * MARK:定义了两个actionCreator，它们套路相同：
   * 1. 在请求前分发一个action
   * 2. 使用fetch发送Ajax请求
   * 3. 在请求响应成功后分发一个action
   * 4. 在请求出现异常时分发一个action 
  */
  loadComment() {
    AppDispatcher.dispatch({ //MARK:dispatch方法用于分发一个action
      type: CommentConstants.LOAD_COMMENT
    });
    fetch('/api/response.json')
      .then(res => res.json())
      .then(value => {
        AppDispatcher.dispatch({
          type: CommentConstants.LOAD_COMMENT_SUCCESS,
          payload: {
            comment: value
          }
        });
      })
      .catch(err => {
        AppDispatcher.dispatch({
          type: CommentConstants.LOAD_COMMENT_ERROR,
          error: err
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
    .then(res => res.json())
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
    .catch(err => {
      AppDispatcher.dispatch({
        type: CommentConstants.ADD_COMMENT_ERROR,
        error: err
      })
    })
  }
}

export default CommentActions;