import './Styles/App.css'
import './Styles/cliente.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavbarAdministrados } from './Components/NavbarAdministrados';
import { Galeria } from './pages/Galeria';
import { Route, Routes } from 'react-router-dom';
import { Profesionales } from './pages/Profesionales';
import { Usuarios } from './pages/Usuarios';
import { NotFound } from './pages/NotFound';
import { Servicios } from './pages/Servicios';
import { Reseñas } from './pages/Reseñas';
import { Citas } from './pages/Citas';
import { HorariosDisponibles } from './pages/HorariosDisponibles';
import { Perfil } from './pages/Perfil';
import { NavBarPrincipal } from './ComponentesCliente/NavBarPrincipal';
import { Promociones } from './pages/Promociones';

function App() {
  return (
    <>
     <div className='contenedor-navbar-opcion'>

      <Routes>
      <Route path='/principal' element = {<NavBarPrincipal/>}/>
        <Route path='/galeria' element = {<Galeria/>}/>
        <Route path='/profesionales' element = {<Profesionales/>}/>
        <Route path='/promociones' element = {<Promociones/>}/>
        <Route path = '/usuarios' element = {<Usuarios/>}/>
        <Route path = '/servicios' element = {<Servicios/>}/>
        <Route path = '/reseñas' element = {<Reseñas/>}/>
        <Route path = '/citas' element = {<Citas/>}/>
        <Route path = '/perfil' element = {<Perfil/>}/>
        <Route path = '/redesSociales' element = {<h1>En proceso</h1>}/>
        <Route path = '/horariosDisponibles' element = {<HorariosDisponibles/>}/>
        <Route path='*' element = {<NotFound/>}/>
      </Routes>
     </div> 

    </>
  )
}

export default App
