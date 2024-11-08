import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavbarAdministrados } from './Components/NavbarAdministrados';
import { Galeria } from './pages/Galeria';
import { Route, Routes } from 'react-router-dom';
import { Profesionales } from './pages/Profesionales';
import { Usuarios } from './pages/Usuarios';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <>
    <div className='contenedor-navbar-opcion'>
     <NavbarAdministrados/>
      <Routes>
        <Route path='/' element = ''/>
        <Route path='/galeria' element = {<Galeria/>}/>
        <Route path='/profesionales' element = {<Profesionales/>}/>
        <Route path = '/usuarios' element = {<Usuarios/>}/>
        <Route path = '/servicios' element = {<h1>En proceso</h1>}/>
        <Route path = '/reseñas' element = {<h1>En proceso</h1>}/>
        <Route path = '/citas' element = {<h1>En proceso</h1>}/>
        <Route path = '/perfil' element = {<h1>En proceso</h1>}/>
        <Route path = '/redesSociales' element = {<h1>En proceso</h1>}/>
        <Route path = '/horariosDisponibles' element = {<h1>En proceso</h1>}/>
        <Route path='*' element = {<NotFound/>}/>
      </Routes>
     </div>
    </>
  )
}

export default App
