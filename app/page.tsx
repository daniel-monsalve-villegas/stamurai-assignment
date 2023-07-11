import AddTask from './components/AddTask'
import TodoList from './components/TodoList'

const Home = () => {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-24'>
      <div className='text-center my-5 gap-4'>
        <h1 className='text-2xl font-bold overline underline decoration-pink-500'>
          To Do List App
        </h1>
        <AddTask />
      </div>
      <TodoList />
    </main>
  )
}

export default Home
