import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createHashRouter, Navigate, RouterProvider } from 'react-router';
import { ThemeProvider } from './context/ThemeProvider.tsx';
import { UserProvider } from './context/UserProvider.tsx';
import { NotesMain } from './pages/NotesMain.tsx';
import { NewNote } from './components/organizador/NewNote.tsx';
import { MainList } from './components/organizer/MainList.tsx';
import { Finances } from './pages/Finances.tsx';


const router = createHashRouter([
  {
    path: '/',
    element:  <Navigate to={'notes'}/>,
  },
  {
    path:'/notes',
    element: <NotesMain/>,
    children: [
      {
        index:true,
        element:<MainList/>
      },
      {
        path:'/notes/main',
        element: <MainList/>
      },
      {
        path:'/notes/new',
        element: <NewNote/>
      },
    ]
  },
  {
    path: '/finances',
    children: [
      {
        index: true,
        element: <Finances/>
      },
      {
        path: '/finances/balance',
        element: ''
      },
      {
        path: '/finances/saving',
        element: ''
      },
      {
        path: '/finances/accounts',
        element: ''
      }
    ]
  },
  {
    path: '/test',
    element: <NotesMain/>,
    children: [
      {
        index: true,
        element: <MainList/>
      }
    ]
  }

])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </ThemeProvider>
    </UserProvider>
  </StrictMode>,
)
