import { todos } from './client'

export default async ({
  title,
  createdAt,
  description,
  priority,
  tags,
  done = false,
}) => {
  await todos.newDocument().mutate({
    title,
    description,
    createdAt,
    priority,
    tags,
    done,
  })
}
