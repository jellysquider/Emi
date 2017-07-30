import { todos } from './client'

export default async (id, update) => {
  await todos.document(id).merge(update)
}
