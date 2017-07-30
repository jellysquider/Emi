import React, { Component } from 'react'

import Meta from './meta'
import Sidebar from './sidebar'
import Header from './header'

export default class Page extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sort: 'createdAt',
      tags: [],
      status: 'all',
    }
  }

  handleSortClick = sort => {
    this.setState({ sort }, this.queryUpdated)
  }

  handleTagClick = tag => {
    this.setState(prev => {
      const { tags } = prev
      const index = tags.indexOf(tag)
      index === -1 ? tags.push(tag) : tags.splice(index, 1)
      return { tags }
    }, this.queryUpdated)
  }

  handleStatusClick = status => {
    this.setState({ status }, this.queryUpdated)
  }

  queryUpdated = () => {
    const { onQueryUpdate } = this.props
    if (onQueryUpdate) {
      const { sort, tags, status } = this.state
      onQueryUpdate({ sort, tags, status })
    }
  }

  render() {
    const { children, heading } = this.props
    const { sort, tags, status } = this.state
    return (
      <div className="page">
        <Meta />
        <aside>
          <Sidebar
            tags={tags}
            onTagClick={this.handleTagClick}
            status={status}
            onStatusClick={this.handleStatusClick}
          />
        </aside>
        <main>
          <Header
            heading={heading}
            sort={sort}
            onSortClick={this.handleSortClick}
          />
          <div className="scrollable">
            {children}
          </div>
        </main>
        <style jsx>
          {`
            .page {
              display: flex;
              height: 100vh;
            }
            aside {
              flex: 1;
              max-width: 400px;
            }
            main {
              flex: 3;
              display: flex;
              flex-direction: column;
            }
            .scrollable {
              position: relative;
              flex: 1 1 auto;
              overflow-y: auto;
              -webkit-overflow-scrolling: touch;
            }
          `}
        </style>
      </div>
    )
  }
}
