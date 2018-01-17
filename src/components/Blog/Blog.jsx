import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Header from '../Header/Header'
import Categories from '../Categories/Categories'
import Posts from '../Posts/Posts'
import './Blog.css';

class Blog extends Component {
  render() {
    return (
      <div className="blog">
        <div className="blog__wrapper">
          <Header />
          <div className="blog__columns">
            <Categories />
            <Posts posts={this.props.posts} />
            <Link className="addPost__btn" to="/posts/add">Add post</Link>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps ({ posts }) {
  return { posts }
}

export default connect(mapStateToProps)(Blog)
