import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  render() {
    return (
      <div>
        <textarea value={this.state.value} onChange={this.handleChange} />
        <button className="comment-confirm-btn" onClick={this.props.onSubmitComment.bind(this, this.state.value)}>
          评论
        </button>
      </div>
    );
  }
}

export default CommentForm;