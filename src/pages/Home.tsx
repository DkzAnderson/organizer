import { Nota } from '../components/organizador/Nota'
import { Notify } from '../toastify/Notify'

export const Home = () => {
    const alert = ()=>{
        Notify('domito', 'error')
    }
  return (
    <div className='flex flex-col w-full min-h-screen items-center justify-center '>
        <Nota/>
    </div>
  )
}
