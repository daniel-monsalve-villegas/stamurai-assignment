import { addToDo, deleteToDo, editToDo, getAllToDos, getToDo } from './TodoAPI'
import { ITask } from '@/types/tasks'
import { makeAutoObservable, runInAction } from 'mobx'
import { v4 as uuidv4 } from 'uuid'

class TodoStore {
  todoList: ITask[] = []
  todo: ITask = this.resetTodo()
  state: string = 'pending'

  resetTodo() {
    return {
      id: uuidv4(),
      title: '',
      description: '',
      status: 'To Do',
    }
  }

  constructor() {
    makeAutoObservable(this)
  }

  fetchTodos = async (): Promise<ITask[]> => {
    this.todoList = []
    this.state = 'pending'
    try {
      const todos = await getAllToDos()
      runInAction(() => {
        this.todoList = todos
        this.state = 'done'
      })
      return todos
    } catch (error) {
      runInAction(() => {
        this.state = 'error'
      })
      throw error
    }
  }

  fetchTodo = async (todoRcv: ITask): Promise<ITask> => {
    this.state = 'pending'
    try {
      const todoFetch = await getToDo(todoRcv.id)
      runInAction(() => {
        this.todo = todoFetch
        this.state = 'done'
      })
      return todoFetch
    } catch (error) {
      runInAction(() => {
        this.state = 'error'
      })
      throw error
    }
  }

  createTodo = async (todoRcv: ITask): Promise<ITask> => {
    this.state = 'pending'
    try {
      const newTodo = await addToDo(todoRcv)
      runInAction(() => {
        this.todo = this.resetTodo()
        this.state = 'done'
      })
      return newTodo
    } catch (error) {
      runInAction(() => {
        this.state = 'error'
      })
      throw error
    }
  }

  updateTodo = async (todoRcv: ITask): Promise<ITask> => {
    this.state = 'pending'
    try {
      const updatedTodo = await editToDo(todoRcv)
      runInAction(() => {
        this.todo = this.resetTodo()
        this.state = 'done'
      })
      return updatedTodo
    } catch (error) {
      runInAction(() => {
        this.state = 'error'
      })
      throw error
    }
  }

  removeTodo = async (id: string): Promise<void> => {
    this.state = 'pending'
    try {
      const removedTodo = await deleteToDo(id)
      runInAction(() => {
        this.todo = this.resetTodo()
        this.state = 'done'
      })
      return removedTodo
    } catch (error) {
      runInAction(() => {
        this.state = 'error'
      })
      throw error
    }
  }
}

const store = new TodoStore()
export default store
