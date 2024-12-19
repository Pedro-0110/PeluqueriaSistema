import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './administrador.css'
// import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { NavBarPrincipal } from './ComponentesCliente/NavBarPrincipal.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

   
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </StrictMode>
)
