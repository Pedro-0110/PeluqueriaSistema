
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

export const NavbarAdministrados = () => {
  return (
    <>
     
      <article className="navegacion-administrador">
            <div className="div-imagen-administrador"><img src="https://scontent.ftuc1-2.fna.fbcdn.net/v/t39.30808-6/470223312_928030019424024_7163923516468459950_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=Qo00ZmzLB3EQ7kNvgEzAC62&_nc_oc=AdiLuMQ65oAFQEv2ScH5UEsSKk-3pbuUq03jQe-5t8-0mlw4syMWcSoqilMqw_gpO2A&_nc_zt=23&_nc_ht=scontent.ftuc1-2.fna&_nc_gid=AzKhBKdPT6NaGKx1AtIqPMH&oh=00_AYAofxhIFFFJyYFLdvD3yERHWun9ksP7S8BbskBsb3QlHA&oe=67947660" alt="" /></div>

            <ul>
                <li><NavLink to="/citas" style={({ isActive }) => ({color: isActive ? '#9fd92b' : 'black'})}> <img width={'26px'} src= {iconoCita} alt="" /> <span>Reservas</span> </NavLink></li>

                <li><NavLink to="/promociones" style={({ isActive }) => ({color: isActive ? '#9fd92b' : 'black'})}> <img width={'26px'} src= {iconoPromocion} alt="" /> <span>Promociones</span> </NavLink></li>

                <li><NavLink to="/galeria" style={({ isActive }) => ({color: isActive ? '#9fd92b' : 'black'})} ><img width={'26px'} src= {iconoImagen} alt="" /><span>Galeria</span></NavLink></li>

                <li><NavLink to="/usuarios" style={({ isActive }) => ({color: isActive ? '#9fd92b' : 'black'})} ><img width={'26px'} src= {iconoUsuarios} alt="" /><span>Usuarios</span></NavLink></li>

                <li><NavLink to="/reseñas" style={({ isActive }) => ({color: isActive ? '#9fd92b' : 'black'})} ><img width={'26px'} src= {iconoComentarios} alt="" /><span>Comentarios</span></NavLink></li>

                <li><NavLink to="/perfil" style={({ isActive }) => ({color: isActive ? '#9fd92b' : 'black'})} ><img width={'26px'} src= {iconoPerfil} alt="" /><span>Administrador</span></NavLink></li>

                <li><NavLink to="/profesionales" style={({ isActive }) => ({color: isActive ? '#9fd92b' : 'black'})} > <img width={'26px'} src= {iconoProfesional} alt="" /><span>Profesionales</span></NavLink></li>
                
                <li><NavLink to="/horariosDisponibles" style={({ isActive }) => ({color: isActive ? '#9fd92b' : 'black'})} ><img width={'26px'} src= {iconoHorario} alt="" /><span>Horarios</span></NavLink></li>
                
                <li><NavLink to="/servicios" style={({ isActive }) => ({color: isActive ? '#9fd92b' : 'black'})} > <img width={'26px'} src= {iconoServicio} alt="" /><span>Servicios</span></NavLink></li>
                
                <li><NavLink to="/principal" style={({ isActive }) => ({color: isActive ? '#9fd92b' : 'black'})}> <img width={'26px'} src= {iconoPuerta} alt="" /><span>Cerrar sesion</span></NavLink></li>
            </ul>
      </article>
  </>
  )
}
