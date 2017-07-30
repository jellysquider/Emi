import Router from 'next/router'

import Todo from './todo'

export default ({ todos, onCheckboxClick, onTodoClick }) => {
  if (!todos.length) {
    return (
      <div>
        <p>There are no tasks matching this criteria.</p>
        <style jsx>{`
          div {
            position: absolute;
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          p {
            font-size: 2.2rem;
            padding: 0 30px;
          }
        `}</style>
      </div>
    )
  }

  return (
    <div>
      {todos.map(todo =>
        <Todo
          key={todo.id}
          {...todo.body}
          onCheckboxClick={() => onCheckboxClick(todo.id, todo.body.done)}
          onTodoClick={() => Router.push(`/edit?id=${todo.id}`)}
        />
      )}
      <style jsx>{`
        div {
          margin-left: 60px;
          margin-right: 130px;
        }
      `}</style>
    </div>
  )
}
