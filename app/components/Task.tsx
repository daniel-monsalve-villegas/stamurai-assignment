'use client'

import Modal from './Modal'
import { ITask } from '@/types/tasks'
import { useState } from 'react'
import { LiaEdit, LiaTrashAltSolid } from 'react-icons/lia'
import DeleteModal from './DeleteModal'
import { observer } from 'mobx-react-lite'

interface TaskProps {
  task: ITask
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)

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
          onClick={() => setModalOpen(true)}
          cursor='pointer'
          size={28}
          className='text-sky-500'
        />
        <Modal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          handleSubmitTask='editTask'
          task={task}
        />

        <LiaTrashAltSolid
          cursor='pointer'
          size={28}
          className='text-pink-500'
          onClick={() => setOpenModalDelete(true)}
        />
        <DeleteModal
          modalOpen={openModalDelete}
          setModalOpen={setOpenModalDelete}
          task={task}
        />
      </td>
    </tr>
  )
}

export default observer(Task)
