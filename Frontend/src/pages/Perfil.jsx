import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';

export const Perfil = () => {
    const[administradores, setAdministradores] = useState([])
    const[usuario_id, setUsuarioID] = useState("")
    const[editar,setEditar] = useState(false)
    const[administrador,setAdministrador] = useState([])

    const[username_usuario, setUsername] = useState("")
    const[password_usuario, setPassword] = useState("")
    const[nombre_usuario, setNombre] = useState("")
    const[apellido_usuario, setApellido] = useState("")
    const[telefono_usuario, setTelefono] = useState("")
    const[email_usuario, setEmail] = useState("")

    const [loading, setLoading] = useState(false);


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
      setEditar(true)
      setUsername(administrador.username_usuario)
      setPassword(administrador.password_usuario)
      setNombre(administrador.nombre_usuario)
      setApellido(administrador.apellido_usuario)
      setTelefono(administrador.telefono_usuario)
      setEmail(administrador.email_usuario)


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
          <Form.Select onChange={(e)=> setUsuarioID(e.target.value)} value={usuario_id} >
            {administradores.map((admin, index)=>
              <option key={index} value={admin.usuario_id}>{admin.nombre_usuario} {admin.apellido_usuario}</option>
            )}
          </Form.Select>
        </Form.Group>
        {editar ? <></>  :  <Button variant = 'warning' onClick={()=> handleClickEditar()}>Editar</Button>}
      </article>
      {editar ? <article>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control value={username_usuario} onChange={(e)=> setUsername(e.target.value)}/>
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control value = {password_usuario} onChange = {(e)=> setPassword(e.target.value)}/>
        </Form.Group>

        <Form.Group>
          <Form.Label>Nombre</Form.Label>
          <Form.Control value = {nombre_usuario} onChange={(e)=> setNombre(e.target.value)}/>
        </Form.Group>

        <Form.Group>
          <Form.Label>Apellido</Form.Label>
          <Form.Control value = {apellido_usuario} onChange={(e)=> setApellido(e.target.value)}/>
        </Form.Group>

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control value = {email_usuario} onChange = {(e)=> setEmail(e.target.value)}/>
        </Form.Group>

        <Form.Group>
          <Form.Label>Telefono</Form.Label>
          <Form.Control value = {telefono_usuario} onChange={(e)=> setTelefono(e.target.value)}/>
        </Form.Group>

        <>  <Button variant = 'secondary' onClick={() => setEditar(false)}>Cancelar</Button>  <Button variant='primary'>Guardar</Button></>
      </article> 
    : <></>}
    </div>  
    </>
  )
}
