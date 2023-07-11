import { ITask } from './types/tasks'

const baseUrl = 'http://localhost:8080'

export const getAllToDos = async (): Promise<ITask[]> => {
  const response = await fetch(`${baseUrl}/tasks`, { cache: 'no-store' })
  const todos = await response.json()
  return todos
}

export const addToDo = async (todo: ITask): Promise<ITask> => {
  const response = await fetch(`${baseUrl}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  })
  const newToDo = await response.json()
  return newToDo
}

export const editToDo = async (todo: ITask): Promise<ITask> => {
  const response = await fetch(`${baseUrl}/tasks/${todo.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  })
  const updatedToDo = await response.json()
  return updatedToDo
}
