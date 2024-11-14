import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';

export const Perfil = () => {
    const[administradores, setAdministradores] = useState([])
    const[usuario_id, setUsuarioID] = useState("")
    const[editar,setEditar] = useState(false)
    const[administrador,setAdministrador] = useState([])

    const[username_profesional, setUsername] = useState("")
    const[password_profesional, setPassword] = useState("")
    const[nombre_profesional, setNombre] = useState("")
    const[apellido_profesional, setApellido] = useState("")
    const[telefono_profesional, setTelefono] = useState("")
    const[email_profesional, setEmail] = useState("")


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
      setUsername(administrador.username_profesional)
      setPassword(administrador.password_profesional)
      setNombre(administrador.nombre_profesional)
      setApellido(administrador.apellido_profesional)
      setTelefono(administrador.telefono_profesional)
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
              <option key={index} value={admin.usuario_id}>{admin.username_profesional}</option>
            )}
          </Form.Select>
        </Form.Group>
        <Button variant = 'warning' onClick={()=> handleClickEditar()}>Editar</Button>
      </article>
      {editar ? <article>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control value={username_profesional} onChange={(e)=> setUsername(e.target.value)}/>
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control value = {password_profesional} onChange = {(e)=> setPassword(e.target.value)}/>
        </Form.Group>

        <Form.Group>
          <Form.Label>Nombre</Form.Label>
          <Form.Control value = {nombre_profesional} onChange={(e)=> setNombre(e.target.value)}/>
        </Form.Group>

        <Form.Group>
          <Form.Label>Apellido</Form.Label>
          <Form.Control value = {apellido_profesional} onChange={(e)=> setApellido(e.target.value)}/>
        </Form.Group>

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control value = {email_profesional} onChange = {(e)=> setEmail(e.target.value)}/>
        </Form.Group>

        <Form.Group>
          <Form.Label>Telefono</Form.Label>
          <Form.Control value = {telefono_profesional} onChange={(e)=> setTelefono(e.target.value)}/>
        </Form.Group>
      </article> : <></>}
    </div>  
    </>
  )
}
