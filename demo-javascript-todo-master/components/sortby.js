import React, { Component } from 'react'

import Check from './iconCheck'
import Arrow from './iconArrow'

const SORT = ['createdAt', 'done', 'priority', 'title']

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
    }
  }

  handleClick = () => {
    this.setState(prev => ({ isOpen: !prev.isOpen }))
  }

  handleItemClick(val) {
    this.handleClick()
    this.props.onClick(val)
  }

  render() {
    const { children, selected, onClick } = this.props
    const { isOpen } = this.state
    return (
      <div className="wrapper">
        <button onClick={this.handleClick}>
          Order By
          <span className="button-selected">
            {selected}
          </span>
          <span className={`arrow ${isOpen && 'arrow-open'}`}>
            <Arrow />
          </span>
        </button>
        {isOpen &&
          <ul>
            {SORT.map(val =>
              <li
                key={val}
                className={selected === val && 'selected'}
                onClick={() => this.handleItemClick(val)}
              >
                {selected === val && <Check />}
                {val}
              </li>
            )}
          </ul>}
        <style jsx>
          {`
            .wrapper {
              position: relative;
            }
            button {
              font-size: 1.5rem;
              border: none;
              background: none;
              cursor: pointer;
              font-weight: 600;
              outline: 0;
              padding-right: 15px;
              color: #444444;
            }
            .button-selected {
              font-weight: 400;
              margin: 0 10px;
              min-width: 100px;
              display: inline-block;
              transition: color .2s ease;
              text-transform: capitalize;
            }
            button:hover .button-selected {
              color: #CF4647;
            }
            .arrow {
              position: absolute;
              width: 15px;
              height: 15px;
              top: 4px;
              right: 0;
              display: inline-block;
              transition: transform .2s ease;
              transform: rotate(-90deg);
            }
            .arrow-open {
              transform: rotate(90deg);
            }
            ul {
              list-style: none;
              margin: 0;
              width: 100%;
              background: #fff;
              box-shadow: 0 20px 70px 0 #E7E2EF;
              padding: 24px 22px;
              position: absolute;
              top: 52px;
              z-index: 1;
            }
            li {
              padding: 0 0 0 30px;
              margin: 5px 0;
              position: relative;
              cursor: pointer;
              font-size: 1.5rem;
              opacity: 0.5;
              transition: opacity .15s ease;
              text-transform: capitalize;
            }
            li:hover {
              opacity: 1;
            }
            li.selected {
              opacity: 1;
            }
            li > :global(.icon) {
              position: absolute;
              left: 0;
            }
          `}
        </style>
      </div>
    )
  }
}
