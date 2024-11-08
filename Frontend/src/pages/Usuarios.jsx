import { useEffect, useState } from "react"
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { NavbarAdministrados } from "../Components/NavbarAdministrados";

export const Usuarios = () => {

    const[usuarios,setUsuarios] = useState([])
    const[roles,setRoles] = useState([])
    const[editar, setEditar] = useState(false)

    const[usuario_id,setUsuarioId] = useState("")
    const[nombre,setNombre] = useState("")
    const[apellido,setApellido] = useState("")
    const[direccion,setDireccion] = useState("")
    const[telefono,setTelefono] = useState("")
    const[username, setUsername] = useState("")
    const[fecha_registro,setFechaRegistro] = useState("")
    const[rol_id, setRolID] = useState(1)

    const[show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const obtenerUsuarios = async () =>{
        const response = await axios.get("http://localhost:8000/usuarios")
       setUsuarios(response.data)
    }

    const obtenerRoles = async () =>{
        const response = await axios.get("http://localhost:8000/usuarios/roles")
        setRoles(response.data)
    }

    const handleClickCrear = () =>{

    }

    const handleClickEditar = (usuario_id,nombre, apellido, direccion, telefono, username, fecha_registro) =>{
        setUsuarioId(usuario_id)
        setNombre(nombre)
        setApellido(apellido)
        setDireccion(direccion)
        setTelefono(telefono)
        setUsername(username)
        setFechaRegistro(fecha_registro)
        setEditar(true)
    }

 const handleClickEliminar = async (usuario_id) =>{

    setEditar(false)
    setUsuarioId("")
    setNombre("")
    setApellido("")
    setDireccion("")
    setTelefono("")
    setUsername("")
    setFechaRegistro("")


    const response = await axios.delete("http://localhost:8000/usuarios/"+usuario_id)
    if(response){
        obtenerUsuarios()
    }
 } 


    const handleClickCancelar = () =>{
        setEditar(false)
        setUsuarioId("")
        setNombre("")
        setApellido("")
        setDireccion("")
        setTelefono("")
        setUsername("")
        setFechaRegistro("")
    }

    const handleClickActualizar = async () =>{
        const response = axios.put("http://localhost:8000/usuarios/" + usuario_id,{
            nombre,
            apellido,
            direccion,
            telefono,
            username,
            fecha_registro,
            rol_id
        })
        if(response){
            obtenerUsuarios()
        }
    }

    useEffect(()=> {obtenerUsuarios()},[])
    useEffect(()=> {obtenerRoles()}, [])

  return (
    <div className="">
    
        <article className="contenedor-general-usuario">

            <div className="div-tabla-usuarios">
            <h2>Usuarios</h2>
            <h3>Buscar usuarios</h3>
            <input type="text" name="" id="" />
            <Table striped bordered hover variant="warning">
                <thead>
                <tr>
                    <td>Nombre</td>
                    <td>Apellido</td>
                    <td>Direccion</td>
                    <td>Telefono</td>
                    <td>Username</td>
                    <td>Fecha de registro</td>
                    <td>Rol</td>
                    <td>Opciones</td>
                </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario,indx) =>
                        <tr key={indx}>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.apellido}</td>
                            <td>{usuario.direccion}</td>
                            <td>{usuario.telefono}</td>
                            <td>{usuario.username}</td>
                            <td>{usuario.fecha_registro}</td>
                            <td>{usuario.nombre}</td>
                            <td>
                                <Button variant = 'warning' onClick={()=> handleClickEditar(usuario.usuario_id,usuario.nombre, usuario.apellido, usuario.direccion, usuario.telefono, usuario.username,usuario.fecha_registro, usuario.nombre
                                )}>Editar</Button>
                                <Button variant = 'danger' onClick={()=> handleClickEliminar(usuario.usuario_id)}>Eliminar</Button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <Button onClick={handleShow}>Crear nuevo usuario</Button>
            </div>

            {editar ? 
            <article className="contenedor-editar-usuario">
            <Form>
                <Form.Group>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control value={nombre}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control value={apellido}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Direccion</Form.Label>
                    <Form.Control value = {direccion}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Telefono</Form.Label>
                    <Form.Control value={telefono}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control value = {username}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Fecha de registro</Form.Label>
                    <Form.Control type="date" value = {fecha_registro}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Rol</Form.Label>
                    <Form.Select>
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                    </Form.Select>
                </Form.Group>
            </Form>
            <Button variant="success" onClick={()=> handleClickActualizar()}>Actualizar</Button>
            <Button variant = "dark" onClick={handleClickCancelar}>Cancelar</Button>
            </article> : <></>}


        </article>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Direccion</Form.Label>
                    <Form.Control/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Telefono</Form.Label>
                    <Form.Control/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Fecha de registro</Form.Label>
                    <Form.Control/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Rol</Form.Label>
                    <Form.Select>
                        {roles.map(rol=>
                            <option value="">{rol.nombre}</option>
                        )}
                    </Form.Select>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
  )
}
