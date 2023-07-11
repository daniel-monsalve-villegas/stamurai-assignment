'use client'

import Modal from './Modal'
import { CATEGORY, ITask } from '@/types/tasks'
import { ChangeEventHandler, FormEventHandler, useState } from 'react'
import { LiaEdit, LiaTrashAltSolid } from 'react-icons/lia'
import { AiOutlineSave } from 'react-icons/ai'
import { deleteToDo, editToDo } from '@/api'
import { useRouter } from 'next/navigation'

interface TaskProps {
  task: ITask
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false)
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)
  const [taskToEdit, setTaskToEdit] = useState<Partial<ITask>>({
    title: task.title,
    description: task.description,
    status: task.status,
  })
  const router = useRouter()

  const handleInputChange: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (event) => {
    event.preventDefault()
    setTaskToEdit({
      ...taskToEdit,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmitEditTask: FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault()
    await editToDo({
      id: task.id,
      title: taskToEdit.title!,
      description: taskToEdit.description!,
      status: taskToEdit.status!,
    })
    setTaskToEdit({ title: '', description: '', status: '' })
    setOpenModalEdit(false)
    router.refresh()
  }

  const handleDeleteTask = async (id: string) => {
    await deleteToDo(id)
    setOpenModalEdit(false)
    router.refresh()
  }

  return (
    <tr key={task.id}>
      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-800'>
        {task.title}
      </td>
      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-800'>
        {task.description}
      </td>
      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-800'>
        {task.status}
      </td>
      <td className='flex gap-1 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-800'>
        <LiaEdit
          onClick={() => setOpenModalEdit(true)}
          cursor='pointer'
          size={28}
          className='text-sky-500'
        />

        <Modal modalOpen={openModalEdit}>
          <form
            className='border-2 border-black dark:border-white px-8 pt-6 pb-8 mb-4'
            onSubmit={handleSubmitEditTask}>
            <div className='mb-4 '>
              <label
                htmlFor='title'
                className='block text-gray-700 text-sm font-bold mb-2'>
                {CATEGORY.TITLE}
              </label>

              <input
                id='title'
                type='text'
                name='title'
                value={taskToEdit.title}
                onChange={handleInputChange}
                className='appearance-none border border-black w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline'
                placeholder='New Task'
                required
              />
            </div>

            <div className='mb-4'>
              <label
                htmlFor='description'
                className='block text-gray-700 text-sm font-bold mb-2'>
                {CATEGORY.DESCRIPTION}
              </label>

              <input
                id='description'
                type='text'
                name='description'
                value={taskToEdit.description}
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
                defaultValue={taskToEdit.status}
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
                  edit task <AiOutlineSave className='ml-2 inline' size={22} />
                </span>
              </button>
              <button
                type='button'
                className='font-bold px-2 py-1 text-lg text-black underline underline-offset-4 decoration-4 decoration-blue-500 transition duration-200 ease-out hover:bg-blue-500'
                onClick={() => setOpenModalEdit(false)}>
                close
              </button>
            </div>
          </form>
        </Modal>
        <LiaTrashAltSolid
          cursor='pointer'
          size={28}
          className='text-pink-500'
          onClick={() => setOpenModalDelete(true)}
        />

        <Modal modalOpen={openModalDelete}>
          <div className='border-2 border-black p-4'>
            <h3 className='text-lg whitespace-normal border-2 border-b-black border-t-white border-r-white border-l-white  pb-2 mb-3'>
              Would you like to delete this Task permanently?
            </h3>
            <p className='text-md'>
              You will be not able to revert this change.
            </p>
            <div className='flex items-center justify-between pt-4'>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className='relative inline-block px-4 py-2 font-medium group uppercase'>
                <span className='absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0'></span>
                <span className='absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black'></span>
                <span className='relative text-black group-hover:text-white'>
                  yes
                </span>
              </button>
              <button
                type='button'
                className='font-bold px-2 py-1 text-lg text-black underline underline-offset-4 decoration-4 decoration-blue-500 transition duration-200 ease-out hover:bg-blue-500'
                onClick={() => setOpenModalDelete(false)}>
                cancel
              </button>
            </div>
          </div>
        </Modal>
      </td>
    </tr>
  )
}

export default Task
