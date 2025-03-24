import { Outlet } from 'react-router'

export const NotesMain = () => {


  return (
    <section className='flex flex-col w-full min-h-screen bg-[var(--st)] dark:bg-[var(--st)]'>
      <Outlet/>
    </section>
  )
}
