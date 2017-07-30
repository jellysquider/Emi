import Badge from './badge'
import Check from './iconCheck'

const TAGS = ['home', 'work', 'other']

export default ({ selected, onClick }) =>
  <div>
    <h2>Tags</h2>
    <ul>
      {TAGS.map(tag =>
        <li key={tag} className={tag} onClick={() => onClick(tag)}>
          {tag}
          {selected.includes(tag) && <Check />}
        </li>
      )}
    </ul>

    <style jsx>
      {`
        ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        li {
          padding: 0;
          margin: 10px 0;
          clear: both;
          cursor: pointer;
          font-size: 1.5rem;
          position: relative;
          transition: color .2s ease;
          text-transform: capitalize;
        }
        li:hover {
          color: #CF4647;
        }
        li:before {
          width: 10px;
          height: 10px;
          content: '';
          border-radius: 100%;
          display: inline-block;
          margin-right: 20px;
        }
        li.other:before {
          background-color: #95E16F;
        }
        li.work:before {
          background-color: #CF4647;
        }
        li.home:before {
          background-color: #3F91EB;
        }
        li :global(.icon) {
          float: right;
        }
        h2 {
          font-size: 1.6rem;
          font-weight: 600;
          margin: 32px 0 20px;
        }
      `}
    </style>
  </div>
