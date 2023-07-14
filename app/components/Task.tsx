'use client'

import Modal from './Modal'
import { ITask } from '@/types/tasks'
import { MouseEventHandler } from 'react'
import { LiaEdit, LiaTrashAltSolid } from 'react-icons/lia'
import { observer } from 'mobx-react-lite'
import store from '@/store/TodoStore'
import modalStore from '@/store/ModalStore'

interface TaskProps {
  task: ITask
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = async (
    event
  ): Promise<void> => {
    event.preventDefault()
    await store.fetchTodo(task)
    modalStore.openModal = true
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

      <td className='pl-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-800'>
        <button
          type='button'
          onClick={(event) => {
            handleClick(event), (modalStore.typeModal = 'editTask')
          }}>
          <LiaEdit size={28} className='text-sky-500' />
        </button>
      </td>

      <td className='pl-2 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-800'>
        <button
          type='button'
          onClick={(event) => {
            handleClick(event), (modalStore.typeModal = 'deleteTask')
          }}>
          <LiaTrashAltSolid size={28} className='text-pink-500' />
        </button>
        <Modal />
      </td>
    </tr>
  )
}

export default observer(Task)
