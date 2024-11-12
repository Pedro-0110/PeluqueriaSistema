import { NavLink } from "react-router-dom"
import iconoComentarios from "../Icons/icono-comentarios.png";
import iconoHorario from "../Icons/icono-horario.png";
import iconoServicio from "../Icons/icono-servicios.png";
import iconoRedes from "../Icons/icono-redes-sociales.png";
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
            <div className="div-imagen-administrador"><img width={'14vw'} src="https://i.etsystatic.com/13221305/r/il/e05e10/2306760305/il_fullxfull.2306760305_bvyi.jpg" alt="" />
            </div>
            <ul>
                <li><NavLink to="/citas" style={({ isActive }) => ({
          color: isActive ? '#00ff00' : 'black'})} > <img width={'26px'} src= {iconoCita} alt="" /><span>Citas</span> 
    </NavLink></li>
                <li><NavLink to="/galeria" style={({ isActive }) => ({color: isActive ? '#00ff00' : 'black'})} ><img width={'26px'} src= {iconoImagen} alt="" /><span>Galeria</span></NavLink></li>
                <li><NavLink to="/usuarios" style={({ isActive }) => ({
          color: isActive ? '#00ff00' : 'black'})} ><img width={'26px'} src= {iconoUsuarios} alt="" /><span>Usuarios</span></NavLink></li>
                <li><NavLink to="/reseñas" style={({ isActive }) => ({
          color: isActive ? '#00ff00' : 'black'})} ><img width={'26px'} src= {iconoComentarios} alt="" /><span>Comentarios</span></NavLink></li>
                <li><NavLink to="/perfil" style={({ isActive }) => ({
          color: isActive ? '#00ff00' : 'black'})} ><img width={'26px'} src= {iconoPerfil} alt="" /><span>Perfil</span></NavLink></li>
                <li><NavLink to="/profesionales" style={({ isActive }) => ({
          color: isActive ? '#00ff00' : 'black'})} > <img width={'26px'} src= {iconoProfesional} alt="" /><span>Profesionales</span></NavLink></li>
                <li><NavLink to="/redesSociales" style={({ isActive }) => ({
          color: isActive ? '#00ff00' : 'black'})} > <img width={'26px'} src= {iconoRedes} alt="" /><span>Redes sociales</span></NavLink></li>
                <li><NavLink to="/horariosDisponibles" style={({ isActive }) => ({
          color: isActive ? '#00ff00' : 'black'})} ><img width={'26px'} src= {iconoHorario} alt="" /><span>Horarios</span></NavLink></li>
                <li><NavLink to="/servicios" style={({ isActive }) => ({
          color: isActive ? '#00ff00' : 'black'})} > <img width={'26px'} src= {iconoServicio} alt="" /><span>Servicios</span></NavLink></li>
                <li><NavLink to="" style={({ isActive }) => ({
          color: isActive ? '#00ff00' : 'black'})}> <img width={'26px'} src= {iconoPuerta} alt="" /><span>Cerrar secion</span></NavLink></li>
            </ul>
        </article>
    </>
  )
}
