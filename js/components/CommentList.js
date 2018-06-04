import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

/**
 * @description 得到一个对象，其上含有obj上除了prop以外的所有属性及相应属性值
 * @param {Object} obj 一个含有若干属性的对象
 * @param {String} prop 要除去的属性
 */
/*
function dissoc(obj, prop) {
  let result = {};
  
  for (let p in obj) {
    if (p !== prop) {
      result[p] = obj[p]
    }
  }

  return result;
}
*/
/**NOTE:异步请求的过程每个组件都有可能存在，所以可以把该过程抽象。
 * 使用高阶组件即可以抽象出该过程
 * 通过抽象“容器型组件”,可以集成Model的功能
*/
/*
const Promised = (promiseProp, Wrapped) => class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      value: null
    };
  }

  componentDidMount() {
    this.props.promise.then( 
      response => response.json()
    ).then(
      value => this.setState({
        loading: false,
        value
      })
    ).catch(
      error => this.setState({
        loading: false,
        error
      })
    )
  }

  render() {
    if (this.state.loading) {
      return <span>Loading...</span>
    } else if (this.state.error !== null) {
      return <span>Error:{this.state.error.message} </span>
    } else {
      const propsWithoutThePromise = dissoc(this.props, promiseProp);
      return (
        <Wrapped {...propsWithoutThePromise} {...this.state.value} />
      );
    }
  }
}
*/

function CommentList({comments}) {
  return (
    <ul className="comment-box">
      {comments.map((entry, i) => (
        <li key={`response-${i}`} className="comment-item">
          <p className="comment-item-name">
            {entry.name}
          </p>
          <p className="comment-item-content">
            {entry.content}
          </p>
        </li>
      ))}
    </ul>
  )
}

class CommentListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      value: null
    };
  }

  componentDidMount() {
    this.props.promise.then( 
      // propmise属性为一个fetch请求
      /**
       fetch('/user.json')
       .then(response => response.json())
       .then(data => console.log('parsed json', data))
       .catch(e => console.log(e))
       */
      response => response.json()
    ).then(value => {
        this.setState({
          loading: false,
          value
        });
        console.log(value);
      }
    ).catch(
      error => this.setState({
        loading: false,
        error
      })
    )
  }

  render() {
    if (this.state.loading) {
      return <span>Loading...</span>
    } else if (this.state.error !== null) {
      return <span>Error:{this.state.error.message} </span>
    } else {
      const list = this.state.value.commentList;
      console.log(list);
      return (
        <CommentList comments={list} />
      );
    }
  }
}



export default CommentListContainer;

