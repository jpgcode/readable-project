import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import Blog from '../Blog/Blog'
import CategoryDetail from '../CategoryDetail/CategoryDetail'
import PostDetail from '../PostDetail/PostDetail'
import PostForm from '../PostForm/PostForm'

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/posts/edit/:id" component={PostForm} />
          <Route path="/posts/add" component={PostForm} />
          <Route path="/:categoryPath/:id" component={PostDetail} />
          <Route path="/:id" component={CategoryDetail} />
          <Route exact path="/" component={Blog} />
        </Switch>
      </div>
    );
  }
}

export default App
