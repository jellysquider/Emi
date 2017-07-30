import NextLink from 'next/link'

import Link from './link'
import ListTags from './listTags'
import ListStatuses from './listStatuses'

export default ({ tags, onTagClick, status, onStatusClick }) =>
  <div className="sidebar">
    <header>
      <NextLink href="/">
        <a className="logo">
          Rapid.io Demo App
        </a>
      </NextLink>
    </header>
    <div className="body">
      <Link className="button" href="/new" prefetch>
        Create Task
      </Link>
      <ListTags selected={tags} onClick={onTagClick} />
      <ListStatuses selected={status} onClick={onStatusClick} />
    </div>

    <style jsx>
      {`
        .sidebar {
          height: 100vh;
          border-right: 1px solid #EEEBF3;
        }
        header {
          display: block;
          height: 80px;
          border-bottom: 1px solid #EEEBF3;
          display: flex;
          align-items: center;
          padding-left: 130px;
        }
        a {
          font-size: 1.8rem;
          font-weight: 500;
          margin: 0;
          padding: 0;
          text-decoration: none;
          color: black;
        }
        .body {
          padding: 42px 36px 42px 130px;
        }
      `}
    </style>
  </div>
