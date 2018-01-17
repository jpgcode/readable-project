import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Posts from '../Posts/Posts'
import Header from '../Header/Header'
import Categories from '../Categories/Categories'
import './CategoryDetail.css';

class CategoryDetail extends Component {

    render() {

      const currentCategory = this.props.categories.find(category => category.path === this.props.match.params.id)

        return (
            <div className="category__detail">
                <Categories />
                <Header />
                {currentCategory && (
                    <div>
                        <h2>Category: {currentCategory.name}</h2>
                        <Posts posts={this.props.posts.filter(post => post.category === currentCategory.path)} />
                        <div className="postBtns__wrapper">
                          <Link className="addPost__btn" to="/posts/add">Add post</Link>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

function mapStateToProps ({ posts, categories }) {
    return { posts, categories }
}

export default connect(mapStateToProps)(CategoryDetail)
