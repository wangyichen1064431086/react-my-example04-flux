import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import CommentStore from '../stores/CommentStore'
import CommentList from './CommentList';
import CommentForm from './CommentForm';

/* 
 * MARK:这是controller-view
 * controller-view一般是整个应用最顶层的view, 这里不会涉及具体的业务逻辑，主要进行store与React组件（即view层）之间的绑定，定义数据更新及传递的方式。
 * controller-view会调用store暴露的getter以获取存储在其中的数据并设置为自己的state, 在render时以props的形式传递给自己的子组件。
 * 当store响应某个action并更新数据后，会触发一个更新事件，这个更新事件就是在controller-view中进行监听的。当store更新时，controller-view会重新获取store中的数据，然后调用setState方法触发界面重绘。
 */

class CommentBox extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      comment: CommentStore.getComment()//使用store暴露的getCommnent()方法获取数据
    }

    this._onChange = this._onChange.bind(this);

  }

  /*
  handleSubmitComment(value) {
    console.log('Exect handleSubmit commnet:');
    console.log(value);
    fetch('/api/submit.json', { //TODO: fetch用法待整理
      method: 'POST',
      body:  JSON.stringify({value: value}), //待研究，这里body只能是json，必须用JSON.stringify处理
      headers: {
        'content-type': 'application/json'//默认格式为multipart/form-data默认格式
      }
    })
    .then(response => response.json())
    .then(value => {
      console.log('value:');
      console.log(value);
      if(value.ok) {
        console.log('fetch response.json');
        this.setState({
          comments: fetch('/api/response.json')
        });
      }
    });
  }
  */

  _onChange() {
    this.setState({
      comment: CommentStore.getComment()
    })
  }

  componentDidMount() {
    CommentStore.addChangeListener(this._onChange); //绑定this._onChange监听器，即为change事件绑定监听器this._onChange
  }

  componentWillUnmount() {
    CommentStore.removeChangeListener(this._onChange)//解绑this._onChange监听器
  }

  render() {
    return (
      <div>
        <CommentList comment={this.state.comment} />
        <CommentForm />
      </div>
    )
  }
}

export default CommentBox;