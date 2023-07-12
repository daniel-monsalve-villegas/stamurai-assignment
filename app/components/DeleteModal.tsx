import { deleteToDo } from '@/api'
import { ITask } from '@/types/tasks'
import { useRouter } from 'next/navigation'

interface DeleteModalProps {
  modalOpen: boolean
  setModalOpen: (open: boolean) => boolean | void
  task: ITask
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  modalOpen,
  setModalOpen,
  task,
}) => {
  const router = useRouter()

  const handleDeleteTask = async (id: string) => {
    await deleteToDo(id)
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
        <div className='border-2 border-black p-4'>
          <h3 className='text-lg whitespace-normal border-2 border-b-black border-t-white border-r-white border-l-white  pb-2 mb-3'>
            Would you like to delete this Task permanently?
          </h3>
          <p className='text-md'>You will be not able to revert this change.</p>
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
              onClick={() => setModalOpen(false)}>
              cancel
            </button>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default DeleteModal
