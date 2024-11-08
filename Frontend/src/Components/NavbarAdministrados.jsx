import { NavLink } from "react-router-dom"

export const NavbarAdministrados = () => {
  return (
    <>
        <article className="navegacion-administrador">
            <div className="div-imagen-administrador"><img src="https://cdn-icons-png.flaticon.com/512/78/78948.png" alt="" /></div>
            <ul>
                <li><NavLink to="/citas" style={({ isActive }) => ({
          color: isActive ? 'green' : 'white'})} >  <span> Citas</span> 
    <img src="/Frontend/Icons/icono-profesional.png" alt="" /></NavLink></li>
                <li><NavLink to="/galeria" style={({ isActive }) => ({
          color: isActive ? 'green' : 'white'})} ><span> Galeria</span> 
    <img src="/Frontend/Icons/icono-imagen.png" alt="" /></NavLink></li>
                <li><NavLink to="/usuarios" style={({ isActive }) => ({
          color: isActive ? 'green' : 'white'})} > Usuarios</NavLink></li>
                <li><NavLink to="/reseñas" style={({ isActive }) => ({
          color: isActive ? 'green' : 'white'})} > Reseñas</NavLink></li>
                <li><NavLink to="/perfil" style={({ isActive }) => ({
          color: isActive ? 'green' : 'white'})} > Perfil</NavLink></li>
                <li><NavLink to="/profesionales" style={({ isActive }) => ({
          color: isActive ? 'green' : 'white'})} > Profesionales</NavLink></li>
                <li><NavLink to="/redesSociales" style={({ isActive }) => ({
          color: isActive ? 'green' : 'white'})} > Redes Sociales</NavLink></li>
                <li><NavLink to="/horariosDisponibles" style={({ isActive }) => ({
          color: isActive ? 'green' : 'white'})} > Horarios disponibles</NavLink></li>
                <li><NavLink to="/servicios" style={({ isActive }) => ({
          color: isActive ? 'green' : 'white'})} > Servicios</NavLink></li>
                <li><NavLink to="" style={({ isActive }) => ({
          color: isActive ? 'green' : 'white'})}>Cerrar secion</NavLink></li>
            </ul>
        </article>
    </>
  )
}
