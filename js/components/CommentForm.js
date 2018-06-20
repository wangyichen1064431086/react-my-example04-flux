import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import CommentActions from '../actions/CommentActions'

class CommentForm extends React.Component {
  static propTypes = {
    onSubmitComment: PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAddComment = this.handleAddComment.bind(this);
  }
  handleChange(e) {
    this.setState({ 
      //Q:Flux不是强调改变数据一定要分发action吗？为什么修改textarea中的值依然用了setState?
      //A:实际上，这是一个设计上的权衡，如果明确地知道某个局部状态不会影响整个应用中的其他部分，也不需要在初始化的时候进行赋值，那么出于简化实现的考虑，可以把这个状态保存在组件中。
      value: e.target.value
    });
  }
  handleAddComment() {
    CommentActions.addComment(this.state.value);
  }
  render() {
    return (
      <div>
        <textarea value={this.state.value} onChange={this.handleChange} />
        <button type="button" className="comment-confirm-btn" onClick={this.handleAddComment}>
          评论
        </button>
      </div>
    );
  }
}

export default CommentForm;