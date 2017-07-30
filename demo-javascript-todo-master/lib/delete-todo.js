import { todos } from './client'

export default async id => {
  return await todos.document(id).delete()
}
