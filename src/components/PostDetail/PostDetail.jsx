import React, { Component } from 'react'

import Moment from 'react-moment'

import { connect } from 'react-redux'
import { deletePost, votePost, addComment, editComment, deleteComment, voteComment } from '../../actions'
import { Link } from 'react-router-dom'

import Header from '../Header/Header'
import './PostDetail.css'

class PostDetail extends Component {

  state = {
    validForm: true,
    authorText: '',
    commentText: '',
    editComment: null
  }

  onEditComment = (comment) => {
    this.commentInput.focus()
    this.setState({ editComment: comment.id, commentText: comment.body })
  }

  onCommentChange = (e) => {
    this.setState({ commentText: e.target.value })
  }
  onAuthorChange = (e) => {
    this.setState({ authorText: e.target.value })
  }

  onSubmitComment = (e) => {

    let valid = true

    /**
     * Edit comment
     */
    if (this.state.editComment) {
      if (this.state.commentText) {
        this.props.onEditComment(this.state.editComment, Date.now(), this.state.commentText)
      }
      else {
        valid = false
        this.setState({ validForm: false })
      }
    }
    else {
      if (this.state.commentText && this.state.authorText) {
        this.props.onAddComment({
          id: Math.random().toString(36).substr(2, 9),
          parentId: this.props.match.params.id,
          timestamp: Date.now(),
          body: this.state.commentText,
          author: this.state.authorText
        })
      }
      else {
        this.setState({ validForm: false })
        valid = false
      }
    }

    /**
     * Update form state
     */
    if (valid) {
      this.setState({
        validForm: true,
        authorText: '',
        commentText: '',
        editComment: null
      })
    }

    e.preventDefault()
  }

  render() {

    const postId = this.props.match.params.id
    const currentPost = this.props.posts.find(post => post.id === postId)
    const postComments = this.props.comments.filter(comment => comment.parentId === postId)
    const { editComment } = this.state

    return (
      <div className="post__detail-wrapper">
        <Header />
        {currentPost ? (
          <div className="post__detail">

            <h2>{currentPost.title}</h2>
            <div className="post__metadata">
              <div className="post__author"><em>Author:</em> {currentPost.author}</div>
              <div className="post__timestamp"><em>Date:</em> <Moment format="MMMM Do YYYY" unix>{currentPost.timestamp / 1000}</Moment></div>
              <div className="post__votescore"><em>Score:</em> {currentPost.voteScore}</div>
              <div className="vote__controls">
                <button className="btn" onClick={() => this.props.onPostVote(currentPost, true)}>Up vote</button>
                <button className="btn" onClick={() => this.props.onPostVote(currentPost)}>Down vote</button>
              </div>
            </div>

            <div className="post__body">{currentPost.body}</div>

            <div className="post__tools">
              <Link to={`/posts/edit/${currentPost.id}`}><button className="btn">Edit</button></Link>
              <button className="btn" onClick={() => {
                  this.props.onDeletePost(currentPost.id)
                  this.props.history.push('/')
              }}>Delete</button>
            </div>

            <div className="post__comments">
              <h2>Comments ({postComments.length})</h2>
              {postComments.length > 0 && (
                <ul className="comments__wrapper">
                  {postComments.map(comment => (
                    <li key={comment.id}>
                      <div className="comment__votescore">{comment.body} (Score: {comment.voteScore})</div>
                      <div className="comment__author">{comment.author}</div>
                      <div className="comment__tools">
                        <button className="btn" onClick={() => this.onEditComment(comment)}>Edit</button>
                        <button className="btn" onClick={() => this.props.onDeleteComment(comment.id)}>Delete</button>
                        <button className="btn" onClick={() => this.props.onVoteComment(comment, true)}>Up vote</button>
                        <button className="btn" onClick={() => this.props.onVoteComment(comment)}>Down vote</button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="post__commentForm">
              <form onSubmit={this.onSubmitComment}>

                <h2>{editComment ? 'Edit' : 'Add'} comment</h2>

                {!editComment && (
                  <div className="form__author">
                    <label htmlFor="author">Author:</label>
                    <input id="author" type="text" onChange={this.onAuthorChange} value={this.state.authorText} />
                  </div>
                )}

                <label htmlFor="author">Comment:</label>
                <textarea ref={(input) => { this.commentInput = input }} rows="8" cols="60" onChange={this.onCommentChange} value=
                  {this.state.commentText} ></textarea>

                {!this.state.validForm && (<label className="error">All fields required</label>)}
                <button type="submit" className="form__submit">Submit comment</button>

              </form>
            </div>
          </div>
        ) : <div>404 - The page does not exist!</div>}
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onPostVote: (post, isUpVote) => dispatch(votePost(post, isUpVote)),
    onDeletePost: (id) => dispatch(deletePost(id)),
    onAddComment: (comment) => dispatch(addComment(comment)),
    onEditComment: (id, timestamp, body) => dispatch(editComment(id, timestamp, body)),
    onDeleteComment: (id, body) => dispatch(deleteComment(id)),
    onVoteComment: (comment, isUpVote) => dispatch(voteComment(comment, isUpVote))
  }
}

export default connect(({ posts, comments }) => ({ posts, comments }), mapDispatchToProps)(PostDetail)
