import React, { Component } from 'react';
import { connect } from 'react-redux'

import Moment from 'react-moment'
import sortBy from 'sort-by'

import { Link } from 'react-router-dom'
import { votePost, deletePost } from '../../actions'
import './Posts.css';

class Posts extends Component {

  state = {
    order: '-timestamp'
  }

  filterPosts = (e) => {
    this.setState({
      order: e.target.value
    })
  }

  render() {

    const { posts, onDeletePost, onPostVote } = this.props

    return (
      <div className="blog__posts-wrapper">
        <h2>Posts</h2>

        <label className="orderBy">Order by:</label>
        <select value={this.state.order} onChange={this.filterPosts}>
          <option value="-timestamp">Published Date</option>
          <option value="-voteScore">Vote Score</option>
        </select>

        <div className="blog__posts">
          {posts.length ? (
            posts.sort(sortBy(this.state.order)).map(post => (
              <div className="blog_post" key={post.id}>
                <div className="post__title"><Link to={`/${post.category}/${post.id}`}>{post.title}</Link></div>
                <div className="post__timestamp"><em>Date:</em> <Moment format="MMMM Do YYYY" unix>{post.timestamp / 1000}</Moment></div>
                <div className="post__score"><em>Vote score:</em> {post.voteScore}</div>
                <div className="post__commentNumber"><em>Number of comments:</em> {this.props.comments.filter(comment => comment.parentId === post.id).length}</div>
                <div className="post__author"><em>Author:</em> {post.author}</div>
                <div className="vote__controls">

                  <Link to={`/posts/edit/${post.id}`}><button className="btn">Edit</button></Link>
                  <button className="btn" onClick={() => onDeletePost(post.id)}>Delete</button>
                  <button className="btn" onClick={() => onPostVote(post, true)}>Up vote</button>
                  <button className="btn" onClick={() => onPostVote(post)}>Down vote</button>
                </div>
              </div>
            ))
          ) : <div>There are no posts to show</div>}
        </div>
      </div>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onDeletePost: (id) => dispatch(deletePost(id)),
    onPostVote: (post, isUpVote) => dispatch(votePost(post, isUpVote))
  }
}

export default connect(({comments}) => ({comments}), mapDispatchToProps)(Posts)
