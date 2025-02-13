
import {NavLink} from 'react-router-dom'
import iconoComentarios from "../Icons/icono-comentarios.png";
import iconoHorario from "../Icons/icono-horario.png";
import iconoServicio from "../Icons/icono-servicios.png";
import iconoImagen from "../Icons/icono-imagen.png";
import iconoPuerta from "../Icons/icono-puerta.png";
import iconoProfesional from "../Icons/icono-profesional.png";
import iconoUsuarios from "../Icons/icono-usuarios.png";
import iconoPerfil from "../Icons/icono-perfil.png";
import iconoCita from "../Icons/icono-cita.png";
import iconoPromocion from "../Icons/icono-promocion.png";
import logoPeluqueria from "../Icons/logo2-peluqueria.jpeg"

export const NavbarAdministrador = () => {
  return (
    <>
     
      <article className="navegacion-administrador">
            <div className="div-imagen-administrador"><img src={logoPeluqueria} alt="" /></div>

            <ul>
                <li><NavLink to="/citas" style={({ isActive }) => ({color: isActive ? '#9fd92b' : 'black'})}> <img width={'26px'} src= {iconoCita} alt="" /> <span>Reservas</span> </NavLink></li>

                <li><NavLink to="/promociones" style={({ isActive }) => ({color: isActive ? '#9fd92b' : 'black'})}> <img width={'26px'} src= {iconoPromocion} alt="" /> <span>Promociones</span> </NavLink></li>

                <li><NavLink to="/galeria" style={({ isActive }) => ({color: isActive ? '#9fd92b' : 'black'})} ><img width={'26px'} src= {iconoImagen} alt="" /><span>Galeria</span></NavLink></li>

                <li><NavLink to="/usuarios" style={({ isActive }) => ({color: isActive ? '#9fd92b' : 'black'})} ><img width={'26px'} src= {iconoUsuarios} alt="" /><span>Usuarios</span></NavLink></li>

                <li><NavLink to="/reseñas" style={({ isActive }) => ({color: isActive ? '#9fd92b' : 'black'})} ><img width={'26px'} src= {iconoComentarios} alt="" /><span>Reseñas</span></NavLink></li>

                {/* <li><NavLink to="/perfil" style={({ isActive }) => ({color: isActive ? '#9fd92b' : 'black'})} ><img width={'26px'} src= {iconoPerfil} alt="" /><span>Administrador</span></NavLink></li> */}

                <li><NavLink to="/profesionales" style={({ isActive }) => ({color: isActive ? '#9fd92b' : 'black'})} > <img width={'26px'} src= {iconoProfesional} alt="" /><span>Profesionales</span></NavLink></li>
                
                <li><NavLink to="/horariosDisponibles" style={({ isActive }) => ({color: isActive ? '#9fd92b' : 'black'})} ><img width={'26px'} src= {iconoHorario} alt="" /><span>Horarios</span></NavLink></li>
                
                <li><NavLink to="/servicios" style={({ isActive }) => ({color: isActive ? '#9fd92b' : 'black'})} > <img width={'26px'} src= {iconoServicio} alt="" /><span>Servicios</span></NavLink></li>
                
                <li><NavLink to="/principal" style={({ isActive }) => ({color: isActive ? '#9fd92b' : 'black'})}> <img width={'26px'} src= {iconoPuerta} alt="" /><span>Cerrar sesion</span></NavLink></li>
            </ul>
      </article>
  </>
  )
}
