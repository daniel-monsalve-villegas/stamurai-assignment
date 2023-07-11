'use client'

import { addToDo } from '@/api'
import { ITask } from '@/types/tasks'
import { useRouter } from 'next/navigation'
import { ChangeEventHandler, FormEventHandler, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { AiOutlineSave } from 'react-icons/ai'

interface ModalProps {
  modalOpen: boolean
  setModalOpen: (open: boolean) => boolean | void
}

const Modal: React.FC<ModalProps> = ({ modalOpen, setModalOpen }) => {
  const [newTaskValue, setNewTaskValue] = useState<Partial<ITask>>({})
  const router = useRouter()

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault()
    setNewTaskValue({
      ...newTaskValue,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmitNewTask: FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault()
    await addToDo({
      id: uuidv4(),
      title: newTaskValue.title!,
      description: newTaskValue.description!,
      status: 'To Do',
    })
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
          onSubmit={handleSubmitNewTask}>
          <div className='mb-4 '>
            <label
              htmlFor='title'
              className='block text-gray-700 text-sm font-bold mb-2'>
              Title
            </label>

            <input
              id='title'
              type='text'
              name='title'
              value={newTaskValue.title}
              onChange={handleInputChange}
              className='appearance-none border border-black w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline'
              placeholder='New Task'
              required
            />
          </div>

          <div className='mb-6'>
            <label
              htmlFor='description'
              className='block text-gray-700 text-sm font-bold mb-2'>
              Description
            </label>

            <input
              id='description'
              type='text'
              name='description'
              value={newTaskValue.description}
              onChange={handleInputChange}
              className='appearance-none border border-black w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline'
              placeholder='Adding task to solve later'
              required
            />
          </div>

          <div className='flex items-center justify-between'>
            <button className='relative inline-block px-4 py-2 font-medium group uppercase'>
              <span className='absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0'></span>
              <span className='absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black'></span>
              <span className='relative text-black group-hover:text-white'>
                save task <AiOutlineSave className='ml-2 inline' size={22} />
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

export default Modal