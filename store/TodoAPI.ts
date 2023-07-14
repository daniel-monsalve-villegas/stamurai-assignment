import { ITask } from '@/types/tasks'

const baseUrl = 'https://64b0fb06062767bc4825709a.mockapi.io'

export const getAllToDos = async (): Promise<ITask[]> => {
  try {
    const response = await fetch(`${baseUrl}/tasks`, { cache: 'no-store' })
    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`)
    }
    const todos = await response.json()
    return todos
  } catch (error: any) {
    throw new Error(error)
  }
}

export const getToDo = async (id: string): Promise<ITask> => {
  try {
    const response = await fetch(`${baseUrl}/tasks/${id}`)
    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`)
    }
    const todo = await response.json()
    return todo
  } catch (error: any) {
    throw new Error(error)
  }
}

export const addToDo = async (todo: ITask): Promise<ITask> => {
  try {
    const response = await fetch(`${baseUrl}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    })
    if (response.status !== 201) {
      throw new Error(`Error! status: ${response.status}`)
    }
    const newToDo = await response.json()
    return newToDo
  } catch (error: any) {
    throw new Error(error)
  }
}

export const editToDo = async (todo: ITask): Promise<ITask> => {
  try {
    const response = await fetch(`${baseUrl}/tasks/${todo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    })
    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`)
    }
    const updatedToDo = await response.json()
    return updatedToDo
  } catch (error: any) {
    throw new Error(error)
  }
}

export const deleteToDo = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${baseUrl}/tasks/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`)
    }
  } catch (error: any) {
    throw new Error(error)
  }
}
