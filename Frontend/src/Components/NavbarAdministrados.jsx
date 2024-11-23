import { NavLink } from "react-router-dom"

import iconoComentarios from "../Icons/icono-comentarios.png";
import iconoHorario from "../Icons/icono-horario.png";
import iconoServicio from "../Icons/icono-servicios.png";
import iconoImagen from "../Icons/icono-imagen.png";
import iconoPuerta from "../Icons/icono-puerta.png";
import iconoProfesional from "../Icons/icono-profesional.png";
import iconoUsuarios from "../Icons/icono-usuarios.png";
import iconoPerfil from "../Icons/icono-perfil.png";
import iconoCita from "../Icons/icono-cita.png";

export const NavbarAdministrados = () => {
  return (
    <>
     
      <article className="navegacion-administrador">
            <div className="div-imagen-administrador"><img src="https://i.pinimg.com/736x/a9/40/92/a9409281fa230ecd40b7f6e5f0594159.jpg" alt="" /></div>

            <ul>
                <li><NavLink to="/citas" style={({ isActive }) => ({color: isActive ? '#00ff00' : 'black'})} > <img width={'26px'} src= {iconoCita} alt="" /><span>Citas</span> </NavLink></li>

                <li><NavLink to="/galeria" style={({ isActive }) => ({color: isActive ? '#00ff00' : 'black'})} ><img width={'26px'} src= {iconoImagen} alt="" /><span>Galeria</span></NavLink></li>

                <li><NavLink to="/usuarios" style={({ isActive }) => ({color: isActive ? '#00ff00' : 'black'})} ><img width={'26px'} src= {iconoUsuarios} alt="" /><span>Usuarios</span></NavLink></li>

                <li><NavLink to="/reseñas" style={({ isActive }) => ({color: isActive ? '#00ff00' : 'black'})} ><img width={'26px'} src= {iconoComentarios} alt="" /><span>Comentarios</span></NavLink></li>

                <li><NavLink to="/perfil" style={({ isActive }) => ({color: isActive ? '#00ff00' : 'black'})} ><img width={'26px'} src= {iconoPerfil} alt="" /><span>Perfil</span></NavLink></li>

                <li><NavLink to="/profesionales" style={({ isActive }) => ({color: isActive ? '#00ff00' : 'black'})} > <img width={'26px'} src= {iconoProfesional} alt="" /><span>Profesionales</span></NavLink></li>
                
                <li><NavLink to="/horariosDisponibles" style={({ isActive }) => ({color: isActive ? '#00ff00' : 'black'})} ><img width={'26px'} src= {iconoHorario} alt="" /><span>Horarios</span></NavLink></li>
                
                <li><NavLink to="/servicios" style={({ isActive }) => ({color: isActive ? '#00ff00' : 'black'})} > <img width={'26px'} src= {iconoServicio} alt="" /><span>Servicios</span></NavLink></li>
                
                <li><NavLink to="" style={({ isActive }) => ({color: isActive ? '#00ff00' : 'black'})}> <img width={'26px'} src= {iconoPuerta} alt="" /><span>Cerrar sesion</span></NavLink></li>
            </ul>
      </article>
  </>
  )
}
