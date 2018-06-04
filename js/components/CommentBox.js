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
    fetch('/api/submit.json', {
      method: 'POST',
      body:JSON.stringify({value: value}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(value => {
      console.log('value:');
      console.log(value);
      if(value.ok) {
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