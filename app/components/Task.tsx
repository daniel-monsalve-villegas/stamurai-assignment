'use client'

import Modal from './Modal'
import { ITask } from '@/types/tasks'
import { MouseEventHandler, useState } from 'react'
import { LiaEdit, LiaTrashAltSolid } from 'react-icons/lia'
import { observer } from 'mobx-react-lite'
import store from '@/store/TodoStore'

interface TaskProps {
  task: ITask
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)

  const handleClick: MouseEventHandler<SVGElement> = async (
    event
  ): Promise<void> => {
    event.preventDefault()
    await store.fetchTodo(task)
    return setModalOpen(true)
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
        <LiaEdit
          cursor='pointer'
          size={28}
          className='text-sky-500'
          onClick={handleClick}
        />
        <Modal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          handleSubmitTask='editTask'
        />
      </td>

      <td className='pl-2 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-800'>
        <LiaTrashAltSolid
          cursor='pointer'
          size={28}
          className='text-pink-500'
          onClick={handleClick}
        />
        <Modal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          handleSubmitTask='deleteTask'
        />
      </td>
    </tr>
  )
}

export default observer(Task)
