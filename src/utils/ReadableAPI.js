
const api = "http://localhost:3001"

// Generate a unique token for storing data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

/**
 * GET /categories
 * Get all of the categories available for the app. List is found in categories.js. Feel free to extend this list as you desire.
 */
export const getCategories = () =>
  fetch(`${api}/categories/`, { headers })
    .then(res => res.json())


/**
 * GET /:category/posts
 * Get all of the posts for a particular category.
 */
export const getCategoryPosts = (categoryId) =>
  fetch(`${api}/${categoryId}/posts`, { headers })
    .then(res => res.json())

/**
 * GET /posts
 * Get all of the posts. Useful for the main page when no category is selected.
 */
export const getPosts = () =>
  fetch(`${api}/posts/`, { headers })
    .then(res => res.json())

//
/**
 * GET /posts/:id
 * Get the details of a single post.
 */
export const getPost = (id) =>
  fetch(`${api}/posts/${id}`, { headers })
    .then(res => res.json())

//
/**
 * POST /posts
 * Add a new post.
 */
export const addPost = (post) =>
  fetch(`${api}/posts`, {
      method: 'POST',
      headers: {
      ...headers,
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
  }).then(res => res.json())


/**
 * PUT /posts/:id
 * Edit the details of an existing post.
 */
export const editPost = (id, title, body) =>
  fetch(`${api}/posts/${id}`, {
      method: 'PUT',
      headers: {
      ...headers,
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, body })
  }).then(res => res.json())


/**
 * Vote post
 * @param {*} id
 * @param {*} isUpVote
 */
export const votePost = (id, isUpVote) =>
fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: {
    ...headers,
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: isUpVote ? 'upVote' : 'downVote' })
}).then(res => res.json())

/**
 * DELETE /posts/:id
 * Sets the deleted flag for a post to 'true'.
 * Sets the parentDeleted flag for all child comments to 'true'.
 */
export const deletePost = (id) =>
  fetch(`${api}/posts/${id}`, {
      method: 'DELETE',
      headers: {
      ...headers,
      'Content-Type': 'application/json'
      }
  }).then(res => res.json())

/**
 * GET /posts/:id/comments
 * Get all the comments for a single post.
 */
export const getPostComments = (postId) =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
      .then(res => res.json())

/**
 * POST /comments
 * Add a comment to a post.
 */
export const addComment = (comment) =>
fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
    ...headers,
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
}).then(res => res.json())


/**
 * PUT /comments/:id
 * Edit the details of an existing comment.
 */
export const editComment = (id, timestamp, body) =>
fetch(`${api}/comments/${id}`, {
    method: 'PUT',
    headers: {
    ...headers,
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({ timestamp, body })
}).then(res => res.json())

/**
 * DELETE /comments/:id
 * Sets a comment's deleted flag to true.
 */
export const deleteComment = (id) =>
fetch(`${api}/comments/${id}`, {
    method: 'DELETE',
    headers: {
    ...headers,
    'Content-Type': 'application/json'
    }
}).then(res => res.json())

/**
 * Vote comment
 */

export const voteComment = (id, isUpVote) =>
fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: {
    ...headers,
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: isUpVote ? 'upVote' : 'downVote' })
}).then(res => res.json())
