import { CATEGORY } from '@/types/tasks'
import Task from './Task'
import store from '@/store/TodoStore'

const TodoList: React.FC = async () => {
  const tasks = await store.fetchTodos()

  return (
    <div className='flex flex-col'>
      <div className='m-l-5 overflow-x-auto'>
        <div className='p-l-5 min-w-full inline-block align-middle'>
          <div className='overflow-hidden'>
            <table className='min-w-full divide-y divide-black dark:divide-gray-700'>
              <thead>
                <tr>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase'>
                    {CATEGORY.TITLE}
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase'>
                    {CATEGORY.DESCRIPTION}
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase'>
                    {CATEGORY.STATUS}
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-black dark:divide-gray-700'>
                {tasks.map((task) => (
                  <Task key={task.id} task={task} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TodoList
