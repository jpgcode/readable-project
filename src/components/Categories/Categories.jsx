import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './Categories.css';

class Categories extends Component {

  render() {

    const { categories } = this.props

    return (
      <div className="blog__categories">
        <h2>Categories</h2>
        <ul>
          {categories.map(category => (
            <li key={category.path}><Link to={`/${category.path}`}>{category.name}</Link></li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ categories }) {
  return { categories }
}

export default connect(mapStateToProps)(Categories)
