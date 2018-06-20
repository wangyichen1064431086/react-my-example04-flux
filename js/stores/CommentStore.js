import { EventEmitter } from 'events';//Node自带模块events
import assign from 'object-assign';
import AppDispatcher from '../dispatcher/AppDispatcher';
import CommentConstants from '../constants/CommentConstants';
/**
 * MARK:这是Flux ADSV架构模式中的Store
 * store负责保存数据，并定义修改数据的逻辑
 * store会调用dispatcher的register方法将自己注册为一个监听器
 */
let comment = [];
const CommentStore = assign({}, EventEmitter.prototype, {//NOTE:使用assign方法将EventEmitter的功能混入CommentStore中，这样，store就拥有了事件触发和监听的功能,即本来是EventEmitter才有的EventEmitter.emit()和EventEmitter.on()方法，现在在CommentStore内部可以使用this.emit()和this.on()调用这两个方法
  getComment() {
    return comment;
  },
  emitChange() {
    this.emit('change');//分发change事件
  },
  addChangeListener(callback) {
    this.on('change', callback);//监听change事件
  },
  removeChangeListener(callback) {
    this.removeListener(callback);
  }
});

AppDispatcher.register((action) => {
  switch(action.type) {
     /**
      * MARK:注册一个监听器监听action。当dispatcher使用dispatch方法分发一个action时，该监听器就会被调用
      * 在这里，是当dispatcher分发的action的type为'LOAD_COMMENT_SUCCESS'时，获得了此action的payload.comment.commentList数据，用以更新comment;然后调用store注册的监听器emitChange,即触发了change事件
     */
    case CommentConstants.LOAD_COMMENT_SUCCESS: { //MARK:针对LOAD_COMMENT_SUCCESS这个事件类型修改了store中的数据
      comment = action.payload.comment.commentList;
      CommentStore.emitChange();
    }
  }
})
export default CommentStore;