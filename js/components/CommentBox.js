import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import CommentListContainer from './CommentList';
import CommentForm from './CommentForm';

class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: fetch('/api/response.json')
    };
    this.handleSubmitComment = this.handleSubmitComment.bind(this);
  }

  handleSubmitComment(value) {
    console.log('Exect handleSubmit commnet:');
    console.log(value);
    fetch('/api/submit.json', { //TODO: fetch用法待整理
      method: 'POST',
      body:JSON.stringify({value: value}),
      headers: {
        'content-type': 'application/json'
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

  render() {
    return (
      <div>
        <CommentListContainer promise={this.state.comments} />
        <CommentForm onSubmitComment={this.handleSubmitComment} />
      </div>
    )
  }
}

export default CommentBox;