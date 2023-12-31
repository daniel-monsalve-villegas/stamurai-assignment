import modalStore from '@/store/ModalStore'
import store from '@/store/TodoStore'
import { CATEGORY } from '@/types/tasks'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { ChangeEventHandler, FormEventHandler } from 'react'
import { AiOutlineSave } from 'react-icons/ai'
import { v4 as uuidv4 } from 'uuid'

const Modal: React.FC = () => {
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
    if (modalStore.typeModal === 'newTask') {
      await store.createTodo({
        id: uuidv4(),
        title: store.todo.title,
        description: store.todo.description,
        status: store.todo.status || 'To Do',
      })
    } else if (modalStore.typeModal === 'editTask') {
      await store.updateTodo({
        id: store.todo.id || uuidv4(),
        title: store.todo.title!,
        description: store.todo.description!,
        status: store.todo.status!,
      })
    } else if (modalStore.typeModal === 'deleteTask') {
      await store.removeTodo(store.todo.id)
    }
    store.todo = store.resetTodo()
    modalStore.openModal = false
    router.refresh()
  }

  return (
    <>
    <div
      className={`${
        modalStore.openModal
          ? 'absolute top-0 left-0 flex items-center w-full h-full backdrop-blur'
          : 'd-none'
      }`}>
      <dialog open={modalStore.openModal} className='w-full max-w-sm'>
        <form
          className='border-2 border-black dark:border-white px-8 pt-6 pb-8 mb-4'
          onSubmit={handleSubmit}>
          {modalStore.typeModal === 'deleteTask' ? (
            <div>
              <h3 className='text-lg whitespace-normal border-2 border-b-black border-t-white border-r-white border-l-white  pb-2 mb-3'>
                Would you like to delete this Task permanently?
              </h3>
              <p className='text-md'>
                You will be not able to revert this change.
              </p>
              <div className='flex items-center justify-between pt-4'>
                <button className='relative inline-block px-4 py-2 font-medium group uppercase'>
                  <span className='absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0'></span>
                  <span className='absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black'></span>
                  <span className='relative text-black group-hover:text-white'>
                    yes
                  </span>
                </button>
                <button
                  type='button'
                  className='font-bold px-2 py-1 text-lg text-black underline underline-offset-4 decoration-4 decoration-blue-500 transition duration-200 ease-out hover:bg-blue-500'
                  onClick={() => (modalStore.openModal = false)}>
                  cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
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
                    {modalStore.typeModal === 'editTask'
                      ? 'edit task'
                      : 'save task'}
                    <AiOutlineSave className='ml-2 inline' size={22} />
                  </span>
                </button>
                <button
                  type='button'
                  className='font-bold px-2 py-1 text-lg text-black underline underline-offset-4 decoration-4 decoration-blue-500 transition duration-200 ease-out hover:bg-blue-500'
                  onClick={() => (modalStore.openModal = false)}>
                  close
                </button>
              </div>
            </div>
          )}
        </form>
      </dialog>
    </div>
    </>
  )
}

export default observer(Modal)
