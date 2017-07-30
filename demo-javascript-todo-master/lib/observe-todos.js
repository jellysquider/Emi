import { todos } from './client'
export default (query, onvalue, onerror) => {
  const { sort, tags, status } = query
  let collection = todos
  let filter

  if (sort) {
    collection = collection.order({ [sort]: 'asc' })
  }

  if (tags && tags.length > 0) {
    filter = {
      and: [
        {
          or: tags.map(tag => ({ tags: { 'arr-cnt': tag } })),
        },
      ],
    }
  }

  switch (status) {
    case 'completed': {
      if (filter) {
        filter.and.push({ done: true })
      } else {
        filter = { done: true }
      }
      break
    }
    case 'incompleted': {
      if (filter) {
        filter.and.push({ done: false })
      } else {
        filter = { done: false }
      }
      break
    }
    default:
      break
  }

  if (filter) {
    return collection.filter(filter).subscribe(onvalue, onerror)
  }
  return collection.subscribe(onvalue, onerror)
}
