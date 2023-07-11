import { ITask } from './types/tasks'

const baseUrl = 'http://localhost:8080'

export const getAllToDos = async (): Promise<ITask[]> => {
  const response = await fetch(`${baseUrl}/tasks`)
  const todos = await response.json()
  return todos
}
