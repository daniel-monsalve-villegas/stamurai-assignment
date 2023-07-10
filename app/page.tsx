import AddTask from './components/AddTask'

const Home = () => {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='text-center my-5 gap-4'>
        <h1 className='text-2xl font-bold overline underline decoration-pink-500'>To Do List App</h1>
        <AddTask />
      </div>
    </main>
  )
}

export default Home
