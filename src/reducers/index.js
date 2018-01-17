import { combineReducers } from 'redux'

import {
  RECEIVE_COMMENTS,
  RECEIVE_VOTE_POST,
  RECEIVE_EDIT_POST,
  RECEIVE_ADD_POST,
  RECEIVE_DELETE_POST,
  RECEIVE_VOTE_COMMENT,
  RECEIVE_ADD_COMMENT,
  RECEIVE_EDIT_COMMENT,
  RECEIVE_DELETE_COMMENT,
  GET_CATEGORIES,
  RECEIVE_POSTS
} from '../actions'

/**
 * Categories
 * @param {*} state
 * @param {*} action
 */
const categories = (state = [], action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories
    default:
      return state
  }
}

/**
 * Posts
 * @param {*} state
 * @param {*} action
 */
const posts = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_VOTE_POST:
      action.post.voteScore = action.isUpVote ? action.post.voteScore + 1 : action.post.voteScore - 1
      return state.map(post => {
        return post.id === action.post.id ? action.post : post
      })
    case RECEIVE_EDIT_POST:
      return state.map(post => {
        return post.id === action.post.id ? action.post : post
      })
    case RECEIVE_ADD_POST:
      return [
        ...state,
        action.post
      ]
    case RECEIVE_DELETE_POST:
      return state.filter(post => post.id !== action.id)
    case RECEIVE_POSTS:
      return action.posts
    default:
      return state
  }
}

/**
 * Comments
 * @param {*} state
 * @param {*} action
 */
const comments = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_VOTE_COMMENT:
      action.comment.voteScore = action.isUpVote ? action.comment.voteScore + 1 : action.comment.voteScore - 1
      return state.map(comment => {
        return comment.id === action.comment.id ? action.comment : comment
      })
    case RECEIVE_EDIT_COMMENT:
      return state.map(comment => {
        return comment.id === action.comment.id ? action.comment : comment
      })
    case RECEIVE_ADD_COMMENT:
      return [
        ...state,
        action.comment
      ]
    case RECEIVE_DELETE_COMMENT:
      return state.filter(comment => comment.id !== action.id)
    case RECEIVE_COMMENTS:
      return action.comments
    default:
      return state
  }
}

export default combineReducers({
  categories,
  posts,
  comments
})
