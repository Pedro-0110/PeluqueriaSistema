import { NavLink } from "react-router-dom"

export const NavbarAdministrados = () => {
  return (
    <>
        <article className="navegacion-administrador">
            <div className="div-imagen-administrador"><img src="https://cdn-icons-png.flaticon.com/512/78/78948.png" alt="" /></div>
            <ul>
                <li><NavLink to="/citas" style={({ isActive }) => ({
          color: isActive ? 'blue' : 'white'})} >Administrar Citas</NavLink></li>
                <li><NavLink to="/galeria" style={({ isActive }) => ({
          color: isActive ? 'blue' : 'white'})} >Administrar Galeria</NavLink></li>
                <li><NavLink to="/usuarios" style={({ isActive }) => ({
          color: isActive ? 'blue' : 'white'})} >Administrar Usuarios</NavLink></li>
                <li><NavLink to="/reseñas" style={({ isActive }) => ({
          color: isActive ? 'blue' : 'white'})} >Administrar Reseñas</NavLink></li>
                <li><NavLink to="/perfil" style={({ isActive }) => ({
          color: isActive ? 'blue' : 'white'})} >Administrar Perfil</NavLink></li>
                <li><NavLink to="/profesionales" style={({ isActive }) => ({
          color: isActive ? 'blue' : 'white'})} >Administrar Profesionales</NavLink></li>
                <li><NavLink to="/redesSociales" style={({ isActive }) => ({
          color: isActive ? 'blue' : 'white'})} >Administrar Redes Sociales</NavLink></li>
                <li><NavLink to="/horariosDisponibles" style={({ isActive }) => ({
          color: isActive ? 'blue' : 'white'})} >Administrar Horarios disponibles</NavLink></li>
                <li><NavLink to="/servicios" style={({ isActive }) => ({
          color: isActive ? 'blue' : 'white'})} >Administrar Servicios</NavLink></li>
                <li><NavLink to="" style={({ isActive }) => ({
          color: isActive ? 'blue' : 'white'})}>Cerrar secion</NavLink></li>
            </ul>
        </article>
    </>
  )
}
