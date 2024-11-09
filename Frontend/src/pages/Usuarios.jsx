import { useEffect, useState } from "react"
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import iconoBasura from '../Icons/icono-basura.png'
import iconoLapiz from '../Icons/icono-lapiz.png'

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
    const[password,setPassword] = useState("")
    const[email, setEmail] = useState("")

    const[show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const obtenerUsuarios = async () =>{
        const response = await axios.get("http://localhost:8000/usuarios")
       setUsuarios(response.data)
    }

    const obtenerRoles = async () =>{
        const response = await axios.get("http://localhost:8000/roles")
        setRoles(response.data)
    }


    const handleClickEditar = (usuario_id, nombre, apellido, email, telefono, direccion, username, password, rol_id, fecha_registro) =>{
        setUsuarioId(usuario_id)
        setNombre(nombre)
        setApellido(apellido)
        setEmail(email)
        setTelefono(telefono)
        setDireccion(direccion)       
        setUsername(username)
        setPassword(password)
        setRolID(rol_id)
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
            email,
            telefono, 
            direccion, 
            username, 
            password, 
            rol_id, 
            fecha_registro

        })
        if(response){
            obtenerUsuarios()
        }
    }

    const handleClickConfirmar = async () =>{
        const response = await axios.post("http://localhost:8000/usuarios/",{
            nombre,
            apellido,
            email,
            telefono, 
            direccion, 
            username, 
            password, 
            rol_id, 
            fecha_registro
            
        })
        if(response){
            obtenerUsuarios()
        }
    }

    useEffect(()=> {obtenerUsuarios()},[])
    useEffect(()=> {obtenerRoles()}, [])

  return (
    <>
        <div className="contenedor-tabla-botones-hn">
            <h2 style={{padding: '1rem', backgroundColor: '#343a40', color: 'white', border : '1px solid black', borderRadius : '10px'}}>Usuarios</h2>
          
            <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          Buscar usuario
        </InputGroup.Text>
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        />
      </InputGroup>

        <article className="contenedor-tabla-profesionales">

           
            <Table striped bordered hover variant="primary">
                <thead>
                <tr>
                    <td style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Nombre</td>
                    <td style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Apellido</td>
                    <td style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Direccion</td>
                    <td style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Telefono</td>
                    <td style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Username</td>
                    <td style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Fecha de registro</td>
                    <td style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Rol</td>
                    <td style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Opciones</td>
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
                                <div className='btns-editar-profesional'>
                                <Button variant = 'warning' onClick={()=> handleClickEditar(usuario.usuario_id,usuario.nombre, usuario.apellido, usuario.direccion, usuario.telefono, usuario.username,usuario.fecha_registro, usuario.nombre
                                )}><img src={iconoLapiz} width={'22px'}/></Button>
                                <Button variant = 'danger' onClick={()=> handleClickEliminar(usuario.usuario_id)}><img src={iconoBasura} width={'22px'}/></Button>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
         </article>

            <Button variant='success' style={{backgroundColor: '#007bff'}} className='btn-crear-profesional' onClick={handleShow}>Crear nuevo usuario</Button>
        </div>

            {editar ? 
            <article className="contenedor-editar-profesional">
            
            <Form>
                <Form.Group>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control value={nombre} onChange={(e) => setNombre(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control value={apellido} onChange = {(e) => setApellido(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control value={email} onChange = {(e) => setEmail(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Telefono</Form.Label>
                    <Form.Control value={telefono} onChange={(e) => setTelefono(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Direccion</Form.Label>
                    <Form.Control value = {direccion} onChange = {(e) => setDireccion(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control value = {username} onChange = {(e) => setUsername(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control value = {password} onChange = {(e)=> setPassword(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Fecha de registro</Form.Label>
                    <Form.Control type="date" value = {fecha_registro} onChange = {(e) => setFechaRegistro(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Rol</Form.Label>
                    <Form.Select onChange = {(e) => setRolID(e.target.value)} value={rol_id}>
                        {
                            roles.map(rol => 
                                <option value={rol.rol_id}>{rol.nombre}</option>
                    
                            )
                        }
                    </Form.Select>
                </Form.Group>
            </Form>
            <div className='btns-editar-profesional'>
            <Button style={{marginTop : '1rem'}} variant="success" onClick={()=> handleClickActualizar()}>Actualizar</Button>
            <Button style={{marginTop : '1rem'}} variant = "dark" onClick={handleClickCancelar}>Cancelar</Button>
            </div>
            </article> : <></>}



        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
                <Form.Group>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control value={nombre} onChange={(e) => setNombre(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control value={apellido} onChange = {(e) => setApellido(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type = 'email' value={email} onChange = {(e) => setEmail(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Telefono</Form.Label>
                    <Form.Control type = 'number' value={telefono} onChange={(e) => setTelefono(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Direccion</Form.Label>
                    <Form.Control value = {direccion} onChange = {(e) => setDireccion(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control value = {username} onChange = {(e) => setUsername(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value = {password} onChange = {(e)=> setPassword(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Fecha de registro</Form.Label>
                    <Form.Control type="date" value = {fecha_registro} onChange = {(e) => setFechaRegistro(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Rol</Form.Label>
                    <Form.Select onChange = {(e) => setRolID(e.target.value)} value={rol_id}>
                        {
                            roles.map(rol => 
                                <option value={rol.rol_id}>{rol.nombre}</option>
                    
                            )
                        }
                    </Form.Select>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button style={{backgroundColor: '#28a745'}} variant="primary" onClick={()=> handleClickConfirmar()}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>

      </>
        
  )
}
