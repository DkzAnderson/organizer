import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createHashRouter, RouterProvider } from 'react-router';
import { ThemeProvider } from './context/ThemeProvider.tsx';
import { UserProvider } from './context/UserProvider.tsx';
import { NotesMain } from './pages/NotesMain.tsx';
import { NewNote } from './components/organizador/NewNote.tsx';
import { NoteList } from './components/organizador/NoteList.tsx';

const router = createHashRouter([
  {
    path: '/',
    element: <App/>,
    children:[
      {
        index: true,
        element: <NoteList/>
      },
      {
        path:'/notes',
        element: <NotesMain/>,
        children: [
          {
            index:true,
            element:<NoteList/>
          },
          {
            path:'/notes/main',
            element: <NoteList/>
          },
          {
            path:'/notes/new',
            element: <NewNote/>
          },
        ]
      }
    ]
  },

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
