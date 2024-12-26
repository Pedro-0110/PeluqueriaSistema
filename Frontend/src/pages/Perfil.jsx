import axios from 'axios';
import {useEffect, useState} from 'react'

import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import { NavbarAdministrados } from '../Components/NavbarAdministrados';

export const Perfil = () => {

    const[administradores, setAdministradores] = useState([])
    const[usuario_id, setUsuarioID] = useState("")
    const[editar,setEditar] = useState(false)
    const[administrador,setAdministrador] = useState([])
    const[username_usuario, setUsername] = useState("Pedro01")
    const[password_usuario, setPassword] = useState("")
    const[nombre_usuario, setNombre] = useState("")
    const[apellido_usuario, setApellido] = useState("")
    const[telefono_usuario, setTelefono] = useState("")

    const obtenerAdministradores = async () =>{
      const response = await axios.get("http://localhost:8000/usuarios/administradores")
      setAdministradores(response.data)
    }

    const obtenerAdministrador = async() =>{
      const response = await axios.get("http://localhost:8000/usuarios/administradores/" + usuario_id)
      console.log(response.data)
      setAdministrador(response.data[0])
    }

  

    const handleClickVerificar = async () =>{
      if(password_usuario != ""){
        const response = await axios.post(`http://localhost:8000/usuarios/sesionadmin/`,{
          username_usuario,
          password_usuario
        })
        if(response.data[0].valor === 1){
          setEditar(true)
          setNombre(response.data[0].nombre_usuario)
          setApellido(response.data[0].apellido_usuario)
          setTelefono(response.data[0].telefono_usuario)
        }
      }
    }

    const handleGuardarCambios = async() =>{
      const response = await axios.put(`http://localhost:8000/usuarios/` + usuario_id,{
        nombre_usuario,
        apellido_usuario,
        username_usuario,
        password_usuario,
        telefono_usuario,
        rol_id : 1
      })
      if(response.status == 201){
        alert('Modificado')
      }
    }

    useEffect(()=> {obtenerAdministradores()},[])
    useEffect(()=> {obtenerAdministrador()},[editar])

  return (
    <>

    <NavbarAdministrados/>
      <div className='contenedor-perfil'>
    
        {editar 
        ? 
          <article className='contenedor-editar-administrador'>
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
              <Form.Label>Telefono</Form.Label>
              <Form.Control value = {telefono_usuario} onChange={(e)=> setTelefono(e.target.value)}/>
            </Form.Group>

            <>
            <div className='btns-administrador-editar'>
            <Button variant = 'dark' onClick={() => {setEditar(false), setPassword("")}}>Regresar sin modificar</Button>  <Button variant='primary' onClick={handleGuardarCambios}>Guardar y regresar</Button>
            </div>
            </>

          </article> 

        : 
        <article className='contenedor-imagen-administrador'>
        <Image src="https://i.etsystatic.com/36512112/r/il/3f098c/4274900077/il_fullxfull.4274900077_dg5t.jpg" rounded width={'250px'} height={'300px'}/>
        <Form.Control style={{marginTop : '1rem', fontSize : '18px'}} type='password' placeholder='Ingresar contraseña' onChange={(e)=> {setPassword(e.target.value)}} value={password_usuario}/>
        <Button onClick={handleClickVerificar}>Verificar</Button>
      </article>}
      </div>  
    </>
  )
}