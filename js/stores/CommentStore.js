import { EventEmitter } from 'events';
import assign from 'object-assign';
import AppDispatcher from '../dispatcher/AppDispatcher';
import CommentConstants from '../constants/CommentConstants';

const CommentStore = assign({}, EventEmitter.prototype, {//NOTE:使用assign方法将EventEmitter的功能混入CommentStore中，这样，store就拥有了事件触发和监听的功能
  getComment() {
    return comment;
  },
  emitChange() {
    this.emit('change');
  },
  addChangeListener(callback) {
    this.on('change', callback);
  },
  removeChangeListener(callback) {
    this.removeListener(callback);
  }
});

AppDispatcher.register((action) => {
  switch(action.type) {
    case CommentConstants.LOAD_COMMENT_SUCCESS: { //MARK:针对LOAD_COMMENT_SUCCESS这个事件类型修改了store中的数据
      comment = action.payload.comment.commentList;
      CommentStore.emitChange();
    }
  }
})
export default CommentStore;