import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
import iconoBasura from '../Icons/icono-basura.png'
import iconoLapiz from '../Icons/icono-lapiz.png'
import {useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export const Profesionales = () => {

    const [profesionales,setProfesionales] = useState([])
    const [editar,setEditar] = useState(false)
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)


    const [profesional_id, setProfesionalID] = useState("")
    const [nombre_profesional,setNombre] = useState("")
    const [apellido_profesional,setApellido] = useState("")
    const [especialidad_profesional,setEspecialidad] = useState("")
    const [descripcion_profesional, setDescripcion] = useState("")
    const [fecha_ingreso_profesional, setFechaIngreso] = useState("") 
    const [activo_profesional,setActivo] = useState(1)
    const [imagen_profesional, setImagenProfesional] = useState("")

    const [loading, setLoading] = useState(false);


    const obtenerProfesionales = async () =>{
        setLoading(true)
        const response = await axios.get("http://localhost:8000/profesionales")
        setProfesionales(response.data)
        setLoading(false)
    }

    const handleClickEditar = (profesional_id, nombre_profesional, apellido_profesional, especialidad_profesional, descripcion_profesional, fecha_ingreso_profesional, activo_profesional, imagen_profesional) =>{
        setEditar(true)
        setProfesionalID(profesional_id)
        setNombre(nombre_profesional)
        setApellido(apellido_profesional)
        setEspecialidad(especialidad_profesional)
        setDescripcion(descripcion_profesional)
        const fechaFormateada = new Date(fecha_ingreso_profesional).toISOString().split("T")[0];
        setFechaIngreso(fechaFormateada);
        setActivo(activo_profesional)
        setImagenProfesional(imagen_profesional)
    }

    const handleClickActualizar = async () =>{
        const response = await axios.put("http://localhost:8000/profesionales/" + profesional_id,{
            nombre_profesional,
            apellido_profesional,
            especialidad_profesional,
            descripcion_profesional,
            fecha_ingreso_profesional,
            activo_profesional,
            imagen_profesional
        })
            if(response.status == 200){
                limpiarCampos()
                obtenerProfesionales()
                setEditar(false)
        }

    }

const handleClickEliminar = async (profesional_id) => {
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
        const response = await axios.delete(`http://localhost:8000/profesionales/${profesional_id}`);
        
        if (response.status === 200) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
          obtenerProfesionales()
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

    const handleClickCancelar = () => setEditar(false)

    const handleClickConfirmar = async () =>{
        const response = await axios.post("http://localhost:8000/profesionales/",{
            nombre_profesional,
            apellido_profesional,
            especialidad_profesional,
            descripcion_profesional,
            fecha_ingreso_profesional,
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
        setShow(false)
    }

    const handleClickCrearProfesional = () => setShow(true)


    const limpiarCampos = () =>{
        setNombre("")
        setApellido("")
        setEspecialidad("")
        setDescripcion("")
        setFechaIngreso("")
        setActivo("")
        setImagenProfesional("")
    }

    useEffect(()=> {obtenerProfesionales()},[])

  return (
    <>
        <article className="contenedor-padre">

            <h2 style={{padding: '1rem', backgroundColor: '#343a40', color: 'white', border : '1px solid black', borderRadius : '10px'}}>Profesionales</h2>
            {loading ?
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
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Imagen</td>
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Nombre</td>
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Apellido</td>
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Especialidad</td>
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Descripcion</td>
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Fecha de ingreso</td>
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Activo</td>
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Opciones</td>
                    </tr>
                </thead>
                <tbody>
                    {
                    !loading && profesionales.length > 0 &&
                    profesionales.map((profesional, indx)=>
                        <tr key={indx}>
                            <td><img src={profesional.imagen_profesional} alt="" width={'60px'} /></td>
                            <td>{profesional.nombre_profesional}</td>
                            <td>{profesional.apellido_profesional}</td>
                            <td>{profesional.especialidad_profesional}</td>
                            <td>{profesional.descripcion_profesional}</td>
                            <td>{profesional.fecha_ingreso_profesional}</td>
                            <td>{profesional.activo_profesional  == 1 ? "Si" : "No"}</td>
                            <td>
                                
                                <div className='div-botones-editar'>
                                <Button variant = 'warning' style={{width : '80px'}} onClick={()=> handleClickEditar(profesional.profesional_id,profesional.nombre_profesional, profesional.apellido_profesional, profesional.especialidad_profesional, profesional.descripcion_profesional, profesional.fecha_ingreso_profesional, profesional.activo_profesional, profesional.imagen_profesional)}><img src={iconoLapiz} width={'22px'}/></Button>
                                <Button variant =  'danger' style={{width : '80px'}} onClick={()=> {handleClickEliminar(profesional.profesional_id)}}><img src={iconoBasura} width={'22px'}/></Button>
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

        {editar ? <article className='contenedor-editar'>
            <h4 style={{padding: '1rem', backgroundColor: '#343a40', color: 'white', border : '1px solid black', borderRadius : '10px'}}>Datos a actualizar</h4>
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
                    <Form.Label>Fecha de ingreso</Form.Label>
                    <Form.Control type='date' value = {fecha_ingreso_profesional} onChange={(e)=>{

                        setFechaIngreso(e.target.value);
                        
                    }}/>
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
            <Button style={{marginTop : '1rem'}} variant = "dark" onClick={handleClickCancelar}>Cancelar</Button>
            </div>
        </article> : <></>}



        <Modal show={show} onHide={handleClose}>
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
                    <Form.Control value = {imagen_profesional} onChange={(e)=> setImagenProfesional(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Fecha de registro</Form.Label>
                    <Form.Control value={fecha_ingreso_profesional} type='date' onChange={(e)=>{
                        const fechaFormateada = new Date(e.target.value).toISOString().split("T")[0];
                        setFechaIngreso(fechaFormateada);
                    }}/>
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
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={()=> handleClickConfirmar()}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal> 
    </>
  )
}
