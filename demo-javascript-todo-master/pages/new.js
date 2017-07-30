import React, { Component } from 'react'
import Router from 'next/router'

import Page from '../components/page'
import Link from '../components/link'
import Input from '../components/input'
import Select from '../components/select'
import TagPicker from '../components/tagPicker'
import Checkbox from '../components/checkbox'

import createTodo from '../lib/create-todo'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      priority: 1,
      tags: [],
      done: false,
    }
  }

  handleInputChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value
    this.setState({ [target.name]: value })
  }

  handlePriorityChange = ({ target: { value } }) => {
    this.setState({ priority: Number(value) })
  }

  handleTagsChange = value => {
    const { tags } = this.state
    const index = tags.indexOf(value)
    index === -1 ? tags.push(value) : tags.splice(index, 1)
    this.setState({ tags })
  }

  handleCreateClick = async () => {
    const { title } = this.state

    if (title === '') {
      alert("Title can't be blank")
      return
    }

    try {
      await createTodo({ ...this.state, createdAt: new Date().toISOString() })
      Router.push('/')
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { title, description, priority, tags, done } = this.state
    return (
      <Page heading="Create Task">
        <div className="wrap">
          <Input
            placeholder="Title"
            value={title}
            onChange={this.handleInputChange}
            name="title"
            margin="0 0 40px 0"
          />
          <Input
            placeholder="Description"
            value={description}
            onChange={this.handleInputChange}
            name="description"
            margin="0 0 40px 0"
          />
          <div className="column">
            <Select
              onChange={this.handlePriorityChange}
              value={priority}
              options={[0, 1, 2]}
              margin="0 120px 0 0"
            />
            <TagPicker onClick={this.handleTagsChange} selected={tags} />
          </div>
          <div className="bottom">
            <div className="completed">
              <span>Completed</span>
              <Checkbox
                name="done"
                onChange={this.handleInputChange}
                checked={done}
              />
            </div>
            <div>
              <Link href="/" inverted margin="0 30px 0 0">
                Cancel
              </Link>
              <Link type="button" onClick={this.handleCreateClick}>
                Create
              </Link>
            </div>
          </div>
        </div>
        <style jsx>
          {`
            .wrap {
              margin-top: 40px;
              margin-left: 60px;
              margin-right: 130px;
            }
            .column {
              display: flex;
              align-items: center;
            }
            .bottom {
              margin-top: 60px;
              padding: 60px 0;
              border-top: 1px solid #EEEBF3;
              display: flex;
              justify-content: space-between;
            }
            .completed {
              display: flex;
              align-items: flex-start;
              padding-top: 15px;
            }
            .completed span {
              font-size: 1.8rem;
              margin-right: 10px;
            }
          `}
        </style>
      </Page>
    )
  }
}
