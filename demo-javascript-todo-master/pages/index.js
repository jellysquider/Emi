import React, { Component } from 'react'

import Page from '../components/page'
import Header from '../components/header'
import TodoList from '../components/todolist'
import Loader from '../components/loader'

import observeTodos from '../lib/observe-todos'
import updateTodo from '../lib/update-todo'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      todos: [],
    }
  }

  componentDidMount() {
    const defaultQuery = { sort: 'createdAt' }

    try {
      this.todos = observeTodos(defaultQuery, todos =>
        this.setState({ todos, loading: false })
      )
    } catch (err) {
      console.log(err)
    }
  }

  componentWillUnmount() {
    this.todos.unsubscribe()
  }

  handleQueryUpdate = query => {
    this.todos.unsubscribe()
    try {
      this.todos = observeTodos(query, todos =>
        this.setState({ todos, loading: false })
      )
    } catch (err) {
      console.log(err)
    }
  }

  handleCheckboxClick = async (id, done) => {
    this.setState(prev => ({
      todos: prev.todos.map(todo => {
        if (todo.id === id) {
          todo.body.done = !todo.body.done
        }
        return todo
      }),
    }))

    await updateTodo(id, { done: !done })
  }

  render() {
    const { todos, loading } = this.state

    return (
      <Page heading="Tasks" onQueryUpdate={this.handleQueryUpdate}>
        {loading
          ? <Loader />
          : <TodoList
              todos={todos}
              onCheckboxClick={this.handleCheckboxClick}
            />}
      </Page>
    )
  }
}
