const TodoList = () => {
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
                    Title
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase'>
                    Description
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase'>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-black dark:divide-gray-700'>
                <tr>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-800'>
                    Task 1
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-800'>
                    Task description
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-800'>
                    Done
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-800'>
                    <button
                      className='text-red-400 hover:text-red-600'
                      type='button'>
                      Edit
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TodoList
