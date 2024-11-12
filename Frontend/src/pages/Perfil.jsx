import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';

export const Perfil = () => {
    const[administradores, setAdministradores] = useState([])
    const[usuario_id, setUsuarioID] = useState("")
    const[editar,setEditar] = useState(false)
    const[administrador,setAdministrador] = useState([])

    const[username, setUsername] = useState("")
    const[password, setPassword] = useState("")
    const[nombre, setNombre] = useState("")
    const[apellido, setApellido] = useState("")
    const[telefono, setTelefono] = useState("")
    const[email, setEmail] = useState("")


    const obtenerAdministradores = async () =>{
      const response = await axios.get("http://localhost:8000/usuarios/administradores")
      setAdministradores(response.data)
    }

    const obtenerAdministrador = async() =>{
      const response = await axios.get("http://localhost:8000/usuarios/administradores/" + usuario_id)
      console.log(response.data)
      setAdministrador(response.data[0])

    }

    const handleClickEditar = () =>{
      setEditar(!editar)
      setUsername(administrador.username)
      setPassword(administrador.password)
      setNombre(administrador.nombre)
      setApellido(administrador.apellido)
      setTelefono(administrador.telefono)
      setEmail(administrador.emails)


    }

    useEffect(()=> {obtenerAdministradores()},[])
    useEffect(()=> {obtenerAdministrador()},[editar])

  return (
    <>
    <div className='contenedor-perfil'>
      <article>
        <img src="https://img.freepik.com/vector-premium/pictograma-persona_764382-14126.jpg?semt=ais_hybrid" alt="" width={'200px'} />
        <h2>Administrador</h2>
      </article>

      <article className='inputs-perfil'>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Select onChange={(e)=> setUsuarioID(e.target.value)} value={usuario_id}>
            {administradores.map((admin, index)=>
              <option key={index} value={admin.usuario_id}>{admin.username}</option>
            )}
          </Form.Select>
        </Form.Group>
        <Button variant = 'warning' onClick={()=> handleClickEditar()}>Editar</Button>
      </article>
      {editar ? <article>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control value={username} onChange={(e)=> setUsername(e.target.value)}/>
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control value = {password} onChange = {(e)=> setPassword(e.target.value)}/>
        </Form.Group>

        <Form.Group>
          <Form.Label>Nombre</Form.Label>
          <Form.Control value = {nombre} onChange={(e)=> setNombre(e.target.value)}/>
        </Form.Group>

        <Form.Group>
          <Form.Label>Apellido</Form.Label>
          <Form.Control value = {apellido} onChange={(e)=> setApellido(e.target.value)}/>
        </Form.Group>

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control value = {email} onChange = {(e)=> setEmail(e.target.value)}/>
        </Form.Group>

        <Form.Group>
          <Form.Label>Telefono</Form.Label>
          <Form.Control value = {telefono} onChange={(e)=> setTelefono(e.target.value)}/>
        </Form.Group>
      </article> : <></>}
    </div>  
    </>
  )
}
