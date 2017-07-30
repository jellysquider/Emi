import Badge from './badge'
import Check from './iconCheck'

const STATUS = ['all', 'completed', 'incompleted']

export default ({ selected, onClick }) =>
  <div>
    <h2>Status</h2>
    <ul>
      {STATUS.map(status =>
        <li key={status} onClick={() => onClick(status)}>
          {status}
          {status === selected && <Check />}
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
          padding: 0 0 0 30px;
          margin: 5px 0;
          position: relative;
          cursor: pointer;
          font-size: 1.5rem;
          transition: color .2s ease;
          text-transform: capitalize;
        }
        li:hover {
          color: #CF4647;
        }
        li > :global(.icon) {
          position: absolute;
          left: 0;
        }
        h2 {
          font-size: 1.6rem;
          font-weight: 600;
          margin: 32px 0 20px;
        }
      `}
    </style>
  </div>
