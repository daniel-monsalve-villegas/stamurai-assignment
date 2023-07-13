import { getAllToDos } from '@/api'
import { ITask } from '@/types/tasks'
import { makeObservable, observable, runInAction } from 'mobx'

class TodoStore {
  todoList: ITask[] = []
  status: any = 'initial'

  constructor() {
    makeObservable(this, {
      todoList: observable,
      status: observable,
    })
  }

  setTodoList(todoList: ITask[]) {
    this.todoList = todoList
  }

  getTodos = async (): Promise<ITask[]> => {
    try {
      const todos = await getAllToDos()
      runInAction(() => {
        this.todoList = todos
      })
      return todos
    } catch (error) {
      runInAction(() => {
        this.status = error
      })
      throw error
    }
  }
}

const store = new TodoStore()
export default store
