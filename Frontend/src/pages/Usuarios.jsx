import { useEffect, useState } from "react"
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import iconoBasura from '../Icons/icono-basura.png'
import iconoLapiz from '../Icons/icono-lapiz.png'
import iconoVer from '../Icons/icono-ver.png'
import Swal from 'sweetalert2';

export const Usuarios = () => {

    const[usuarios,setUsuarios] = useState([])
    const[roles,setRoles] = useState([])
    const[editar, setEditar] = useState(false)

    const[usuario_id,setUsuarioId] = useState("")
    const[nombre_usuario,setNombre] = useState("")
    const[apellido_usuario,setApellido] = useState("")
    const[direccion_usuario,setDireccion] = useState("")
    const[telefono_usuario,setTelefono] = useState("")
    const[username_usuario, setUsername] = useState("")
    const[fecha_registro_usuario,setFechaRegistro] = useState("")
    const[rol_id, setRolID] = useState()
    const[password_usuario,setPassword] = useState("")
    const[email_usuario, setEmail] = useState("")

    const[show, setShow] = useState(false)

    const [loading, setLoading] = useState(false);

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)


    const [valorBusqueda, setValorBusqueda] = useState("")
    

    const obtenerUsuarios = async () =>{
        setLoading(true)
        const response = await axios.get("http://localhost:8000/usuarios")
       setUsuarios(response.data)
       setLoading(false)
    }

    const obtenerRoles = async () =>{
        const response = await axios.get("http://localhost:8000/roles")
        setRoles(response.data)
    }

    const obtenerBusqueda = async () =>{
        if(valorBusqueda === ""){
            obtenerUsuarios()
        }

        const response = await axios.get(`http://localhost:8000/usuarios/busqueda/${valorBusqueda}/${valorBusqueda}`)
        setUsuarios(response.data)
    }


    const handleClickEditar = (usuario_id, nombre_usuario,
        apellido_usuario,
        email_usuario,
        telefono_usuario, 
        direccion_usuario, 
        username_usuario, 
        password_usuario, 
        rol_id, 
        fecha_registro_usuario) =>{

        setUsuarioId(usuario_id)
        setNombre(nombre_usuario)
        setApellido(apellido_usuario)
        setEmail(email_usuario)
        setTelefono(telefono_usuario)
        setDireccion(direccion_usuario)       
        setUsername(username_usuario)
        setPassword(password_usuario)
        setRolID(rol_id)
        const fechaFormateada = new Date(fecha_registro_usuario).toISOString().split("T")[0];
        setFechaRegistro(fechaFormateada)
        setEditar(true)
    }

const handleClickEliminar = async (usuario_id) => {
    const confirmacion = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
  
    if (confirmacion.isConfirmed) {
      try {
        const response = await axios.delete(`http://localhost:8000/usuarios/${usuario_id}`);
        
        if (response.status === 200) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
          obtenerUsuarios()
        } else {
          Swal.fire({
            title: "Error!",
            text: "Could not delete the file. Please try again.",
            icon: "error",
          });
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: "Error!",
          text: "An error occurred while trying to delete the file.",
          icon: "error",
        });
      }
    }
  };

    const handleClickCancelar = () =>{
        limpiarCampos()
        setEditar(false)
    }

    const handleClickActualizar = async () =>{
        const response = await axios.put("http://localhost:8000/usuarios/" + usuario_id,{
            nombre_usuario,
            apellido_usuario,
            email_usuario,
            telefono_usuario, 
            direccion_usuario, 
            username_usuario, 
            password_usuario, 
            rol_id, 
            fecha_registro_usuario

        })
        if(response.status === 200){
            setEditar(false)
            obtenerUsuarios()
        }
        limpiarCampos()
    }

    const handleClickConfirmar = async () =>{
        const response = await axios.post("http://localhost:8000/usuarios/",{
            nombre_usuario,
            apellido_usuario,
            email_usuario,
            telefono_usuario, 
            direccion_usuario, 
            username_usuario, 
            password_usuario, 
            rol_id, 
            fecha_registro_usuario
            
        })
        if(response.status == 201){
            Swal.fire({
                position: "top",
                 icon: "success",
                 title: "Nuevo usuario guardado",
                 showConfirmButton: false,
                 timer: 1500
               });
            setShow(false)
            obtenerUsuarios()
        }

        limpiarCampos()
    }

    const limpiarCampos = () => {
        setUsuarioId("")
        setNombre("")
        setApellido("")
        setDireccion("")
        setTelefono("")
        setUsername("")
        setFechaRegistro("")
        setPassword("")
        setEmail("")
    }

    useEffect(()=> {obtenerUsuarios()},[])
    useEffect(()=> {obtenerBusqueda()},[valorBusqueda])
    useEffect(()=> {obtenerRoles()}, [])

  return (
    <>
        <div className="contenedor-padre">
            <h2 style={{padding: '0.5rem', backgroundColor: '#343a40', color: 'white', border : '1px solid black', borderRadius : '10px'}}>Usuarios</h2>
          
        <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          Buscar usuario
        </InputGroup.Text>
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          placeholder="Ingrese el nombre o apellido"
          onChange={(e) => setValorBusqueda(e.target.value)}
        />
      </InputGroup>
      {loading ?
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
             :

        <article className="contenedor-tabla">

           
            <Table striped bordered hover variant="dark">
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
                    {
                    !loading && usuarios.length > 0 &&
                    usuarios.map((usuario,indx) =>
                        <tr key={indx}>
                            <td>{usuario.nombre_usuario}</td>
                            <td>{usuario.apellido_usuario}</td>
                            <td>{usuario.direccion_usuario}</td>
                            <td>{usuario.telefono_usuario}</td>
                            <td>{usuario.username_usuario}</td>
                            <td>{usuario.fecha_registro_usuario}</td>
                            <td>{usuario.rol}</td>
                            <td>
                                <div className='div-botones-editar'>
                                <Button variant = 'warning' style={{width : '80px'}} onClick={()=> handleClickEditar(usuario.usuario_id,usuario.nombre_usuario,
            usuario.apellido_usuario,
            usuario.email_usuario,
            usuario.telefono_usuario, 
            usuario.direccion_usuario, 
            usuario.username_usuario, 
            usuario.password_usuario, 
            usuario.rol_id, 
            usuario.fecha_registro_usuario)}><img src={iconoLapiz} width={'22px'}/></Button>
                                <Button variant = 'danger'style={{width : '80px'}} onClick={()=> handleClickEliminar(usuario.usuario_id)}><img src={iconoBasura} width={'22px'}/></Button>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
         </article>
}

            <Button variant='primary' className='btn-crear' onClick={handleShow}>Crear nuevo usuario</Button>
        </div>

            {editar ? 
            <article className="contenedor-editar">
             <h3 style={{padding: '0.5rem', backgroundColor: '#343a40', color: 'white', border : '1px solid black', borderRadius : '10px'}}>Datos a actualizar</h3>
            <Form>
                <Form.Group>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control required value={nombre_usuario} onChange={(e) => setNombre(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control required value={apellido_usuario} onChange = {(e) => setApellido(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control required value={email_usuario} onChange = {(e) => setEmail(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Telefono</Form.Label>
                    <Form.Control value={telefono_usuario} onChange={(e) => setTelefono(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Direccion</Form.Label>
                    <Form.Control value = {direccion_usuario} onChange = {(e) => setDireccion(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control required value = {username_usuario} onChange = {(e) => setUsername(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control required value = {password_usuario} onChange = {(e)=> setPassword(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Fecha de registro</Form.Label>
                    <Form.Control type="date" value = {fecha_registro_usuario} onChange = {(e) => {
                        const fechaFormateada = new Date(e.target.value).toISOString().split("T")[0]
                        setFechaRegistro(fechaFormateada)
                    }}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Rol</Form.Label>
                    <Form.Select required onChange = {(e) => setRolID(e.target.value)} value={rol_id}>
                        {
                            roles.map((rol, index) => 
                                <option key={index} value={rol.rol_id}>{rol.nombre}</option>
                    
                            )
                        }
                    </Form.Select>
                </Form.Group>
            </Form>
            <div className='div-botones-editar'>
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
                    <Form.Control value={nombre_usuario} onChange={(e) => setNombre(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control value={apellido_usuario} onChange = {(e) => setApellido(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type = 'email' value={email_usuario} onChange = {(e) => setEmail(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Telefono</Form.Label>
                    <Form.Control type = 'number' value={telefono_usuario} onChange={(e) => setTelefono(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Direccion</Form.Label>
                    <Form.Control value = {direccion_usuario} onChange = {(e) => setDireccion(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control value = {username_usuario} onChange = {(e) => setUsername(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value = {password_usuario} onChange = {(e)=> setPassword(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Fecha de registro</Form.Label>
                    <Form.Control type="date" value = {fecha_registro_usuario} onChange = {(e) => setFechaRegistro(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Rol</Form.Label>
                    <Form.Select onChange = {(e) => setRolID(e.target.value)} value={rol_id}>
                        {
                            roles.map((rol, index) => 
                                <option key = {index} value={rol.rol_id}>{rol.nombre}</option>
                    
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
          <Button variant="success" onClick={()=> handleClickConfirmar()}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>

      </>
        
  )
}
