import { editToDo } from '@/store/TodoAPI'
import store from '@/store/TodoStore'
import { CATEGORY } from '@/types/tasks'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { ChangeEventHandler, FormEventHandler } from 'react'
import { AiOutlineSave } from 'react-icons/ai'
import { v4 as uuidv4 } from 'uuid'

interface ModalProps {
  modalOpen: boolean
  setModalOpen: (open: boolean) => boolean | void
  handleSubmitTask: string
}

const Modal: React.FC<ModalProps> = ({
  modalOpen,
  setModalOpen,
  handleSubmitTask,
}) => {
  const router = useRouter()

  const handleInputChange: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (event) => {
    event.preventDefault()
    if (event.target.name === 'title') {
      store.todo.title = event.target.value
    } else if (event.target.name === 'description') {
      store.todo.description = event.target.value
    } else {
      store.todo.status = event.target.value
    }
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    if (handleSubmitTask === 'newTask') {
      await store.createTodo({
        id: uuidv4(),
        title: store.todo.title,
        description: store.todo.description,
        status: store.todo.status || 'To Do',
      })
    } else if (handleSubmitTask === 'editTask') {
      await editToDo({
        id: store.todo.id || uuidv4(),
        title: store.todo.title!,
        description: store.todo.description!,
        status: store.todo.status!,
      })
    }
    store.todo = store.resetTodo()
    setModalOpen(false)
    router.refresh()
  }

  return (
    <div
      className={`${
        modalOpen
          ? 'absolute top-0 left-0 flex items-center w-full h-full backdrop-blur bg-white/30'
          : 'd-none'
      }`}>
      <dialog open={modalOpen} className='w-full max-w-sm'>
        <form
          className='border-2 border-black dark:border-white px-8 pt-6 pb-8 mb-4'
          onSubmit={handleSubmit}>
          <div className='mb-4 '>
            <label
              htmlFor='title'
              className='block text-gray-700 text-sm font-bold capitalize mb-2'>
              {CATEGORY.TITLE}
            </label>

            <input
              id='title'
              type='text'
              name='title'
              value={store.todo.title}
              onChange={handleInputChange}
              className='appearance-none border border-black w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline'
              placeholder='New Task'
              required
            />
          </div>

          <div className='mb-4'>
            <label
              htmlFor='description'
              className='block text-gray-700 text-sm font-bold capitalize mb-2'>
              {CATEGORY.DESCRIPTION}
            </label>

            <input
              id='description'
              type='text'
              name='description'
              value={store.todo.description}
              onChange={handleInputChange}
              className='appearance-none border border-black w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline'
              placeholder='Adding task to solve later'
              required
            />
          </div>

          <div className='mb-6'>
            <label
              htmlFor='status'
              className='block text-gray-700 text-sm font-bold capitalize mb-2'>
              {CATEGORY.STATUS}
            </label>

            <select
              id='status'
              name='status'
              value={store.todo.status}
              onChange={handleInputChange}
              className='appearance-none bg-white border border-black w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline'
              required>
              <option value='To Do'>To Do</option>
              <option value='In Progress'>In Progress</option>
              <option value='Completed'>Completed</option>
            </select>
          </div>
          <div className='flex items-center justify-between'>
            <button className='relative inline-block px-4 py-2 font-medium group uppercase'>
              <span className='absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0'></span>
              <span className='absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black'></span>
              <span className='relative text-black group-hover:text-white'>
                {handleSubmitTask === 'editTask' ? 'edit task' : 'save task'}
                <AiOutlineSave className='ml-2 inline' size={22} />
              </span>
            </button>
            <button
              type='button'
              className='font-bold px-2 py-1 text-lg text-black underline underline-offset-4 decoration-4 decoration-blue-500 transition duration-200 ease-out hover:bg-blue-500'
              onClick={() => setModalOpen(false)}>
              close
            </button>
          </div>
        </form>
      </dialog>
    </div>
  )
}

export default observer(Modal)
