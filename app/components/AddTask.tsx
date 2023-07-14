'use client'

import store from '@/store/TodoStore'
import Modal from './Modal'
import { MouseEventHandler, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { observer } from 'mobx-react-lite'

const AddTask = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const handleAddClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault()
    store.todo = store.resetTodo()
    setModalOpen(true)
  }

  return (
    <div className='mt-4'>
      <button
        className='relative inline-block px-4 py-2 font-medium group uppercase'
        type='button'
        onClick={handleAddClick}>
        <span className='absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0'></span>
        <span className='absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black'></span>
        <span className='relative text-black group-hover:text-white'>
          add new task <AiOutlinePlus className='ml-2 inline' size={18} />
        </span>
      </button>

      <Modal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        handleSubmitTask='newTask'
      />
    </div>
  )
}

export default observer(AddTask)
