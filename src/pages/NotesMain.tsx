import { Outlet } from 'react-router'
import { NavBar } from '../components/navBar/NavBar'

export const NotesMain = () => {


  return (
    <section className='relative flex flex-col w-full min-h-screen bg-[var(--st)] dark:bg-[var(--st)]'>
      <NavBar/>
      <Outlet/>
    </section>
  )
}
