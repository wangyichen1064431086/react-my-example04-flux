import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import CommentActions from '../actions/CommentActions';

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

class CommentList extends React.Component { //MARK: CommentList成为一个与数据请求无关的展示型组件
  componentDidMount() {
    CommentActions.loadComment();//MARK: Q: 怎样才能从服务器中获取已有的评论数据呢？ A: 在CommentAction中已经定义了从服务器获取数据的loadComment方法，直接在CommentList组件中调用该方法即可。
  }
  render() {
    const list = this.props.comment;
    return (
      <ul className="comment-box">
        {list.map((entry, i) => (
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
}




export default CommentList;

