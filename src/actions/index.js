import * as ReadableAPI from '../utils/ReadableAPI'

export const GET_CATEGORIES = 'GET_CATEGORIES'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_VOTE_POST = 'RECEIVE_VOTE_POST'
export const RECEIVE_EDIT_POST = 'RECEIVE_EDIT_POST'
export const RECEIVE_ADD_POST = 'RECEIVE_ADD_POST'
export const RECEIVE_DELETE_POST = 'RECEIVE_DELETE_POST'

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const RECEIVE_VOTE_COMMENT = 'RECEIVE_VOTE_COMMENT'
export const RECEIVE_EDIT_COMMENT = 'RECEIVE_EDIT_COMMENT'
export const RECEIVE_ADD_COMMENT = 'RECEIVE_ADD_COMMENT'
export const RECEIVE_DELETE_COMMENT = 'RECEIVE_DELETE_COMMENT'

/**
 * Get categories
 * @param {*} categories
 */
export const receiveCategories = categories => ({
  type: GET_CATEGORIES,
  categories
})
export const getCategories = () => dispatch => (
  ReadableAPI.getCategories()
    .then(data => dispatch(receiveCategories(data.categories)))
)


/**
 * Get posts
 * @param {*} posts
 */
export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
})
export const getPosts = () => dispatch => (
  ReadableAPI.getPosts()
    .then(posts => dispatch(receivePosts(posts)))
)


/**
 * Add post
 * @param {*} post
 * @param {*} newPost
 */
export const receiveAddPost = (post) => ({
  type: RECEIVE_ADD_POST,
  post
})
export const addPost = (newPost) => dispatch => (
  ReadableAPI.addPost(newPost)
    .then(post => dispatch(receiveAddPost(post)))
)


/**
 * Edit post
 * @param {*} post
 */
export const receiveEditPost = (post) => ({
  type: RECEIVE_EDIT_POST,
  post
})
export const editPost = (id, title, body) => dispatch => (
  ReadableAPI.editPost(id, title, body)
    .then(post => dispatch(receiveEditPost(post)))
)


/**
 * Delete post
 * @param {*} id
 */
export const receiveDeletePost = (id) => ({
  type: RECEIVE_DELETE_POST,
  id
})
export const deletePost = (id) => dispatch => (
  ReadableAPI.deletePost(id)
    .then(data => dispatch(receiveDeletePost(id)))
)

/**
 * Vote Post
 * @param {*} post
 * @param {*} isUpVote
 */
export const receiveVotePost = (post, isUpVote) => ({
  type: RECEIVE_VOTE_POST,
  post,
  isUpVote
})
export const votePost = (post, isUpVote) => dispatch => (
  ReadableAPI.votePost(post.id, isUpVote)
      .then(data => dispatch(receiveVotePost(post, isUpVote)))
)

/**
 * Get comments
 * @param {*} comments
 */
export const receiveComments = comments => ({
  type: RECEIVE_COMMENTS,
  comments
})
export const getComments = () => dispatch => (
  ReadableAPI.getPosts()
    .then(posts => {
      const req = posts.map(post => ReadableAPI.getPostComments(post.id))
      return Promise.all(req)
        .then(responses => {
          return dispatch(receiveComments([].concat.apply([], responses)))
        })
    })
)

/**
 * Vote post comment
 * @param {*} comment
 * @param {*} isUpVote
 */
export const receiveVoteComment = (comment, isUpVote) => ({
  type: RECEIVE_VOTE_COMMENT,
  comment,
  isUpVote
})
export const voteComment = (comment, isUpVote) => dispatch => (
  ReadableAPI.voteComment(comment.id, isUpVote)
      .then(data => dispatch(receiveVoteComment(comment, isUpVote)))
)

/**
 * Add comment
 * @param {*} comment
 * @param {*} isUpVote
 */
export const receiveAddComment = (comment, isUpVote) => ({
  type: RECEIVE_ADD_COMMENT,
  comment
})
export const addComment = (newComment) => dispatch => (
  ReadableAPI.addComment(newComment)
      .then(comment => dispatch(receiveAddComment(comment)))
)

/**
 * Edit comment
 * @param {*} comment
 * @param {*} isUpVote
 */
export const receiveEditComment = (comment, isUpVote) => ({
  type: RECEIVE_EDIT_COMMENT,
  comment
})
export const editComment = (id, timestamp, body) => dispatch => (
  ReadableAPI.editComment(id, timestamp, body)
      .then(comment => dispatch(receiveEditComment(comment)))
)


/**
 * Delete comment
 * @param {*} id
 */
export const receiveDeleteComment = (id) => ({
  type: RECEIVE_DELETE_COMMENT,
  id
})
export const deleteComment = (id) => dispatch => (
  ReadableAPI.deleteComment(id)
      .then(data => dispatch(receiveDeleteComment(id)))
)
