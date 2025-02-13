import { useEffect, useState } from "react"
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import iconoBasura from '../Icons/icono-basura.png'
import iconoLapiz from '../Icons/icono-lapiz.png'
import Swal from 'sweetalert2';
import { NavbarAdministrador } from "../pages/NavbarAdministrador";

export const Usuarios = () => {

    const[usuarios,setUsuarios] = useState([])
    const[roles,setRoles] = useState([])
    const[editar, setEditar] = useState(false)
    const[usuario_id,setUsuarioId] = useState("")
    const[nombre_usuario,setNombre] = useState("")
    const[apellido_usuario,setApellido] = useState("")
    const[telefono_usuario,setTelefono] = useState("")
    const[username_usuario, setUsername] = useState("")
    const[rol_id, setRolID] = useState("")
    const[password_usuario,setPassword] = useState("")
    const[showModalAgregar, setShowModalAgregar] = useState(false)
    const [loading, setLoading] = useState(false);
    const [valorBusqueda, setValorBusqueda] = useState(" ")

    const handleCloseModalAgregar = () => setShowModalAgregar(false)

    const handleShowModalAgregar = () => setShowModalAgregar(true)

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

    const obtenerBusquedaUsuario = async () =>{
        if(valorBusqueda === ""){
            obtenerUsuarios()
        }
        const response = await axios.get(`http://localhost:8000/usuarios/busqueda/${valorBusqueda}/${valorBusqueda}`)
        setUsuarios(response.data)
    }

    const handleClickEditar = (usuario_id, nombre_usuario,
        apellido_usuario,
        telefono_usuario, 
        username_usuario, 
        password_usuario, 
        rol_id
    ) =>{
        console.log(rol_id)
        setUsuarioId(usuario_id)
        setNombre(nombre_usuario)
        setApellido(apellido_usuario)
        setTelefono(telefono_usuario)    
        setUsername(username_usuario)
        setPassword(password_usuario)
        setRolID(rol_id)
        setEditar(true)
    }

    const handleClickEliminar = async (usuario_id) => {
        const confirmacion = await Swal.fire({
            title: "Se eliminara el registro de forma permanente!",
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!",
            customClass: {
                confirmButton: "custom-confirm-btn",
                cancelButton: "custom-cancel-btn"
              }
        });
  
        if (confirmacion.isConfirmed) {
            try {
                const response = await axios.delete(`http://localhost:8000/usuarios/${usuario_id}`);
        
                if (response.status === 200) {
                    Swal.fire({
                        title: "Registro eliminado!",
                        text: "",
                        icon: "success"
                });
                obtenerUsuarios()
                } else {
                    Swal.fire({
                     title: "Error! No fue posible eliminar el registro",
                    text: "",
                    icon: "error",
                });
                }
            } catch (error) {
                console.error(error);
                Swal.fire({
                  title: "Error! No fue posible eliminar el registro",
                  text: "",
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
        if(verificarLlenadoDeCampos()){
            const response = await axios.put("http://localhost:8000/usuarios/" + usuario_id,{
                nombre_usuario,
                apellido_usuario,
                telefono_usuario,
                username_usuario, 
                password_usuario, 
                rol_id
            })
            if(response.status === 200){

                Swal.fire({
                    title: "Registro actualizado!",
                    text: "",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setEditar(false)
                obtenerUsuarios()
            }
            limpiarCampos()
       }else{
        Swal.fire("Llenar todos los campos!");
       }
}

    const handleClickConfirmar = async () =>{
        if(verificarLlenadoDeCampos()){
            const response = await axios.post("http://localhost:8000/usuarios/",{
                nombre_usuario,
                apellido_usuario,
                telefono_usuario, 
                username_usuario, 
                password_usuario, 
                rol_id
            })
            if(response.status == 201){
                Swal.fire({
                    position: "top",
                     icon: "success",
                     title: "Nuevo usuario guardado",
                     showConfirmButton: false,
                     timer: 1500
                   });
                setShowModalAgregar(false)
                obtenerUsuarios()
            }
            limpiarCampos()
        }else{
            Swal.fire("Llenar todos los campos!");
    }
}

    const limpiarCampos = () => {
        setUsuarioId("")
        setNombre("")
        setApellido("")
        setTelefono("")
        setUsername("")
        setPassword("")
    }

    const verificarLlenadoDeCampos = () =>{
        if(nombre_usuario != "" && apellido_usuario != ""  && telefono_usuario != "" && username_usuario != "" && password_usuario != ""  && rol_id != ""){
            return true
        }
    }

    useEffect(()=> {obtenerUsuarios()},[])
    useEffect(()=> {obtenerBusquedaUsuario()},[valorBusqueda])
    useEffect(()=> {obtenerRoles()}, [])

  return (
    <>
    <NavbarAdministrador/>
        <div className="contenedor-padre">
            <h2>Usuarios</h2>
          
            <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                     Busqueda de usuario
                </InputGroup.Text>
                <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                placeholder=""
                onChange={(e) => setValorBusqueda(e.target.value)}
                />
            </InputGroup>

        {loading 
            ?
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
                                <td>Nombre</td>
                                <td>Apellido</td>
                                <td>Telefono</td>
                                <td>Username</td>
                                <td>Fecha de registro</td>
                                <td>Rol</td>
                                <td>Opciones</td>
                            </tr>
                        </thead>
                        <tbody>
                        {!loading && usuarios.length > 0 && usuarios.map((usuario,indx) =>
                                <tr key={indx}>
                                    <td>{usuario.nombre_usuario}</td>
                                    <td>{usuario.apellido_usuario}</td>
                                    <td>{usuario.telefono_usuario}</td>
                                    <td>{usuario.username_usuario}</td>
                                    <td>{new Date(usuario.fecha_registro_usuario).toLocaleDateString('es-AR', { year: '2-digit', month: '2-digit', day: '2-digit' })} {new Date(usuario.fecha_registro_usuario).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false })}
                                    </td>
                                    <td>{usuario.rol}</td>
                                    <td>
                                        <div className='div-botones-editar-usuarios'>
                                            <Button variant = 'warning'  onClick={()=> handleClickEditar(usuario.usuario_id,usuario.nombre_usuario,
                                            usuario.apellido_usuario,
                                            usuario.telefono_usuario, 
                                            usuario.username_usuario, 
                                            usuario.password_usuario, 
                                            usuario.rol_id
                                            )}><img src={iconoLapiz} /></Button>
                                            <Button variant = 'danger' onClick={()=> handleClickEliminar(usuario.usuario_id)}><img src={iconoBasura} /></Button>
                                        </div>
                                    </td>
                                </tr>
                        )}
                        </tbody>
                    </Table>
                </article>}

            <Button variant='primary' className='btn-crear' onClick={handleShowModalAgregar}>Crear nuevo usuario</Button>
        </div>

            {editar 
            ? 
                <article className="contenedor-editar">
                    <h4>Datos a actualizar</h4>
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
                            <Form.Label>Telefono</Form.Label>
                            <Form.Control value={telefono_usuario} onChange={(e) => setTelefono(e.target.value)}/>
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
                            <Form.Label>Rol</Form.Label>
                            <Form.Select  value={rol_id} onChange = {(e) => setRolID(e.target.value)}>
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
                </article> 
            : <></>}

        <Modal show={showModalAgregar} onHide={handleCloseModalAgregar}>
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
                    <Form.Label>Telefono</Form.Label>
                    <Form.Control type = 'number' value={telefono_usuario} onChange={(e) => setTelefono(e.target.value)}/>
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
          <Button style={{display: 'block', width : '10vw', marginLeft : 'auto', marginRight : 'auto'}} variant="success" onClick={()=> handleClickConfirmar()}>
            Confirmar
          </Button>
          <Button style={{display: 'block', width : '10vw', marginLeft : 'auto', marginRight : 'auto'}} variant="secondary" onClick={handleCloseModalAgregar}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
      </>   
  )
}
