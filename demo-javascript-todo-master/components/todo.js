import Checkbox from './checkbox'
import Priority from './priority'
import Badge from './badge'

export default ({
  onCheckboxClick,
  onTodoClick,
  title,
  description,
  done,
  tags,
  priority,
}) =>
  <div className="todo">
    <div className="left">
      <Checkbox name="done" checked={done} onChange={onCheckboxClick} />
      <div className="text" onClick={onTodoClick}>
        <h2>
          <span className="title">{title}</span>
          {tags &&
            tags.map(val =>
              <Badge type={val} key={val} margin="-4px 0 0 20px">{val}</Badge>
            )}
        </h2>
        <p>{description}</p>
      </div>
    </div>
    <div className="right">
      <Priority priority={priority} />
    </div>
    <style jsx>
      {`
        .todo {
          padding: 26px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #EEEBF3;
        }
        .left {
          display: flex;
          align-items: center;
        }
        .text {
          cursor: pointer;
          margin: 0 30px;
        }
        h2 {
          line-height: 1.3;
          margin-bottom: 8px;
        }
        .title {
          font-weight: 600;
          line-height: 1.3;
          border-bottom: 2px solid #fff;
          transition: border .2s ease;
        }
        h2:hover .title {
          border-bottom: 2px solid #EEEBF3;
        }
      `}
    </style>
  </div>
