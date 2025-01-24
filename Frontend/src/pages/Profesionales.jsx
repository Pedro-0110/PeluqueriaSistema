import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';

import axios from 'axios'
import {useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import iconoBasura from '../Icons/icono-basura.png'
import iconoLapiz from '../Icons/icono-lapiz.png'
import { NavbarAdministrados } from '../Components/NavbarAdministrados';


export const Profesionales = () => {

    const [profesionales,setProfesionales] = useState([])
    const [editar,setEditar] = useState(false)
    const [showModalAgregar, setShowModalAgregar] = useState(false)
    const [profesional_id, setProfesionalID] = useState("")
    const [nombre_profesional,setNombre] = useState("")
    const [apellido_profesional,setApellido] = useState("")
    const [especialidad_profesional,setEspecialidad] = useState("")
    const [descripcion_profesional, setDescripcion] = useState("")
    const [activo_profesional,setActivo] = useState(1)
    const [imagen_profesional, setImagenProfesional] = useState("")
    const [loading, setLoading] = useState(false);
    
    const handleCloseModalAgregar = () => setShowModalAgregar(false)

    const obtenerProfesionales = async () =>{
        setLoading(true)
        const response = await axios.get("http://localhost:8000/profesionales")
        setProfesionales(response.data)
        setLoading(false)
    }

    const handleClickEditar = (profesional_id, nombre_profesional, apellido_profesional, especialidad_profesional, descripcion_profesional, activo_profesional, imagen_profesional) =>{
        setEditar(true)
        setProfesionalID(profesional_id)
        setNombre(nombre_profesional)
        setApellido(apellido_profesional)
        setEspecialidad(especialidad_profesional)
        setDescripcion(descripcion_profesional)
        setActivo(activo_profesional)
        setImagenProfesional(imagen_profesional)
    }

    const handleClickActualizar = async () =>{
        if(verificarLlenadoDeCampos()){
            const response = await axios.put("http://localhost:8000/profesionales/" + profesional_id,{
                nombre_profesional,
                apellido_profesional,
                especialidad_profesional,
                descripcion_profesional,
                activo_profesional,
                imagen_profesional
            })
            if(response.status == 200){
                Swal.fire({
                    position: "top",
                     icon: "success",
                     title: "Registro actualizado!",
                     showConfirmButton: false,
                     timer: 1500
                   });
                limpiarCampos()
                obtenerProfesionales()
                setEditar(false)
            }
        }else{
            Swal.fire("Llenar todos los campos!");
        }
    }
    
    const handleClickEliminar = async (profesional_id) => {
        const confirmacion = await Swal.fire({
            title: "Se eliminara el registro de forma permanente!",
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!",
            });
  
        if (confirmacion.isConfirmed) {
            try {
                const response = await axios.delete(`http://localhost:8000/profesionales/${profesional_id}`);
        
                if (response.status === 200) {
                    Swal.fire({
                        position: "top",
                         icon: "success",
                         title: "Registro eliminado!",
                         showConfirmButton: false,
                         timer: 1500
                       });
                obtenerProfesionales()
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: "",
                        icon: "error",
                })}}
            catch (error) {
                console.error(error);
                Swal.fire({
                    title: "Error!",
                    text: "",
                    icon: "error",
                });
                }
            }
    };

    const handleClickCancelarEdicion = () =>{
        limpiarCampos()
        setEditar(false)
    }

    const handleClickConfirmar = async () =>{
        if(verificarLlenadoDeCampos()){
            const response = await axios.post("http://localhost:8000/profesionales/",{
                nombre_profesional,
                apellido_profesional,
                especialidad_profesional,
                descripcion_profesional,
                activo_profesional,
                imagen_profesional
            })
            if(response.status === 200){
                Swal.fire({
                    position: "top",
                     icon: "success",
                     title: "Nuevo profesional guardado",
                     showConfirmButton: false,
                     timer: 1500
                   });
                limpiarCampos()
                obtenerProfesionales()
            }
            setShowModalAgregar(false)
        }else{
            Swal.fire("Llenar todos los campos!");
        }
}

    const handleClickCrearProfesional = () => setShowModalAgregar(true)

    const limpiarCampos = () =>{
        setNombre("")
        setApellido("")
        setEspecialidad("")
        setDescripcion("")
        setActivo("")
        setImagenProfesional("")
    }

    const verificarLlenadoDeCampos = () =>{
        if(nombre_profesional != "" && apellido_profesional != "" && especialidad_profesional !="" && descripcion_profesional != "" && imagen_profesional != ""  && activo_profesional != ""){
            return true
        }
    }

    useEffect(()=> {obtenerProfesionales()},[])

  return (
    <>
    <NavbarAdministrados/>
        <article className="contenedor-padre">

            <h2>Profesionales</h2>
                {loading 
                ?
                    <div className="text-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                    </div>
                :
                    <div className='contenedor-tabla'>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <td>Imagen</td>
                                    <td>Nombre</td>
                                    <td>Apellido</td>
                                    <td>Especialidad</td>
                                    <td>Descripcion</td>
                                    <td>Fecha de registro</td>
                                    <td>Activo</td>
                                    <td>Opciones</td>
                                </tr>
                            </thead>
                            <tbody>
                                {!loading && profesionales.length > 0 && profesionales.map((profesional, indx)=>
                                    <tr key={indx}>
                                        <td><img src={profesional.imagen_profesional} alt="" width={'120px'} style={{borderRadius: '10px'}} /></td>
                                        <td>{profesional.nombre_profesional}</td>
                                        <td>{profesional.apellido_profesional}</td>
                                        <td>{profesional.especialidad_profesional}</td>
                                        <td>{profesional.descripcion_profesional}</td>
                                        <td>{new Date(profesional.fecha_registro_profesional).toLocaleDateString('es-AR', { year: '2-digit', month: '2-digit', day: '2-digit' })} </td>
                                        <td>{profesional.activo_profesional  == 1 ? "Si" : "No"}</td>
                                        <td>
                                            <div className='div-botones-editar-profesionales'>
                                                <Button variant = 'warning' onClick={()=> handleClickEditar(profesional.profesional_id,profesional.nombre_profesional, profesional.apellido_profesional, profesional.especialidad_profesional, profesional.descripcion_profesional, profesional.activo_profesional, profesional.imagen_profesional)}><img src={iconoLapiz}/></Button>
                                                <Button variant =  'danger' onClick={()=> {handleClickEliminar(profesional.profesional_id)}}><img src={iconoBasura}/></Button>
                                            </div>
                                        </td>
                                    </tr>
                                    )}
                            </tbody>
                        </Table>
                    </div>
                }
                <Button className='btn-crear' onClick={()=> handleClickCrearProfesional()}>Crear nuevo profesional</Button>
        </article>

        {editar 
            ? 
                <article className='contenedor-editar'>
                    <h4>Datos a actualizar</h4>
                    <Form>
                        <Form.Group>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control required value={nombre_profesional}  onChange={(e)=>setNombre(e.target.value)}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control required value={apellido_profesional} onChange={(e)=>{setApellido(e.target.value)}}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Especialidad</Form.Label>
                            <Form.Control value = {especialidad_profesional} onChange={(e)=>{setEspecialidad(e.target.value)}}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Descripcion</Form.Label>
                            <Form.Control value={descripcion_profesional} onChange={(e)=>{setDescripcion(e.target.value)}}/>
                        </Form.Group>


                        <Form.Group>
                            <Form.Label>Imagen</Form.Label>
                            <Form.Control value={imagen_profesional} onChange={(e)=>{setImagenProfesional(e.target.value)}}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Activo</Form.Label>
                            <Form.Select onChange={(e) =>{setActivo(e.target.value)}} value={activo_profesional}>
                                <option value="1" selected>Activo</option>
                                <option value="0">Desactivo</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>

                    <div className='div-botones-editar'>
                        <Button style={{marginTop : '1rem'}} variant="success" onClick={()=> handleClickActualizar()}>Actualizar</Button>
                        <Button style={{marginTop : '1rem'}} variant = "dark" onClick={handleClickCancelarEdicion}>Cancelar</Button>
                    </div>
                </article> 
            : 
                <></>
        }
        <Modal show={showModalAgregar} onHide={handleCloseModalAgregar}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo profesional</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control value={nombre_profesional} onChange={(e)=> setNombre(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control value = {apellido_profesional} onChange={(e)=> setApellido(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Especialidad</Form.Label>
                    <Form.Control value = {especialidad_profesional} onChange = {(e)=> setEspecialidad(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control value = {descripcion_profesional} onChange={(e)=> setDescripcion(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Imagen</Form.Label>
                    <Form.Control type='url'onChange={(e)=> setImagenProfesional(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Activo</Form.Label>
                    <Form.Select value={activo_profesional} onChange={(e)=> setActivo(e.target.value)}>
                        <option value="1">Activo</option>
                        <option value="0">Desactivo</option>
                    </Form.Select>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{display: 'block', width : '10vw', marginLeft : 'auto', marginRight : 'auto'}} variant="primary" onClick={()=> handleClickConfirmar()}>
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
