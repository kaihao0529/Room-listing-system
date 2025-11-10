import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import RoomListing from './Componnets/RoomListing.jsx'
import Home from './Componnets/Home.jsx'
import { Login } from '@mui/icons-material'
import Register from './Componnets/Register.jsx'
import Settings from './Componnets/Settings.jsx'
import Help from './Componnets/Help.jsx'

let router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/Home',
    element: <Home />,
  },
  {
    path: '/roomlisting',
    element: <RoomListing />,
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/Settings',
    element: <Settings />
  },
  {
    path: '/Help',
    element: <Help />
  }


])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
