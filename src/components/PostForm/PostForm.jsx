import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPost, editPost } from '../../actions'

import Header from '../Header/Header'
import './PostForm.css'

class PostForm extends Component {

  state = {
    validForm: true
  }

  onFormSubmit = (e) => {

    let valid = true
    const id = this.props.match.params.id

    if (id) {
        if (this.titleField.value) {
            this.props.onEditPost(id, this.titleField.value, this.bodyField.value)
        }else {
            this.setState({validForm: false})
            valid = false
        }
    }else {
        if (this.titleField.value && this.categoryField.value) {
            this.props.onAddPost({
                id: Math.random().toString(36).substr(2, 9),
                title: this.titleField.value,
                timestamp: Date.now(),
                body: this.bodyField.value,
                author: this.authorField.value,
                category: this.categoryField.value
            })
        }else {
            this.setState({validForm: false})
            valid = false
        }

    }

    if (valid) this.props.history.push('/')

    e.preventDefault()
}

  render() {

    const { currentPost } = this.props

    return (
      <div className="postForm">
        <Header />
        {(!this.props.match.params.id || currentPost) && (
          <div>
            <h1>{currentPost ? 'Edit' : 'Add'} Post</h1>
            <form onSubmit={this.onFormSubmit}>

                <label htmlFor="title">Title <small>(*required)</small>:</label>
                <input id="title" type="text" ref={(input) => this.titleField = input} defaultValue={currentPost && currentPost.title} />

                <label htmlFor="body">Body:</label>
                <textarea id="body" rows="8" cols="60" ref={(input) => this.bodyField = input} defaultValue={currentPost && currentPost.body} ></textarea>

                {!currentPost && (
                  <div>

                    <label htmlFor="author">Author:</label>
                    <input id="author" type="text" ref={(input) => this.authorField = input} />

                    <label htmlFor="category">Category <small>(*required)</small>:</label>
                    <select id="category" ref={(input) => this.categoryField = input}>
                      <option key="default" value="" >Select Category</option>
                      {this.props.categories.map(category => (
                        <option key={category.path} value={category.path} >{category.name}</option>
                      ))}
                    </select>

                  </div>
                )}

                {!this.state.validForm && (<label className="error">Some values are missing</label>)}

                <button type="submit" className="form__submit">Submit</button>
            </form>
          </div>
        )}

      </div>
    )
  }
}

function mapStateToProps({ posts, categories }, ownProps) {
  return {
    currentPost: posts.find(post => post.id === ownProps.match.params.id),
    categories
  }
}
function mapDispatchToProps(dispatch) {
  return {
    onEditPost: (id, title, body) => dispatch(editPost(id, title, body)),
    onAddPost: (post) => dispatch(addPost(post))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostForm)
