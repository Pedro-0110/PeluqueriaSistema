import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
import iconoBasura from '../Icons/icono-basura.png'
import iconoLapiz from '../Icons/icono-lapiz.png'

import { act, useEffect, useState } from 'react';

export const Profesionales = () => {
    const [profesionales,setProfesionales] = useState([])
    const [editar,setEditar] = useState(false)

    const[show, setShow] = useState(false)
    const handleClose = () => setShow(false)


    const [profesional_id, setProfesionalID] = useState("")
    const [nombre,setNombre] = useState("")
    const [apellido,setApellido] = useState("")
    const [especialidad,setEspecialidad] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [fecha_ingreso, setFechaIngreso] = useState("") 
    const [activo,setActivo] = useState(1)


    const obtenerProfesionales = async () =>{
        const response = await axios.get("http://localhost:8000/profesionales")
        setProfesionales(response.data)
    }

    const handleClickEditar = (profesional_id, nombre, apellido, especialidad, descripcion, fecha_ingreso, activo) =>{
        setEditar(true)
        setProfesionalID(profesional_id)
        setNombre(nombre)
        setApellido(apellido)
        setEspecialidad(especialidad)
        setDescripcion(descripcion)
        const fechaFormateada = new Date(fecha_ingreso).toISOString().split("T")[0];
        setFechaIngreso(fechaFormateada);
        setActivo(activo)
    }

    const handleClickActualizar = async () =>{
        const response = await axios.put("http://localhost:8000/profesionales/" + profesional_id,{
            nombre,
            apellido,
            especialidad,
            descripcion,
            fecha_ingreso,
            activo
        }
    )
            if(response){
                obtenerProfesionales()
                setEditar(false)
                setProfesionalID("")
                setNombre("")
                setApellido("")
                setEspecialidad("")
                setDescripcion("")
                setFechaIngreso("");
                setActivo("")
        }

    }

    const handleClickEliminar = async (profesional_id) =>{
        const response = await axios.delete("http://localhost:8000/profesionales/"+profesional_id)
        if(response){
            obtenerProfesionales()
        }
    }
    
    const handleClickCancelar = () =>{
        setEditar(false)
    }

    const handleClickConfirmar = async () =>{
        const response = await axios.post("http://localhost:8000/profesionales/",{
            nombre,
            apellido,
            especialidad,
            descripcion,
            fecha_ingreso,
            activo
        })
        if(response){
            obtenerProfesionales()
                setProfesionalID("")
                setNombre("")
                setApellido("")
                setEspecialidad("")
                setDescripcion("")
                setFechaIngreso("");
                setActivo(1)
                setShow(false)
        }
    }

    const handleClickCrearProfesional = () =>{
        setProfesionalID("")
        setNombre("")
        setApellido("")
        setEspecialidad("")
        setDescripcion("")
        setFechaIngreso("");
        setActivo("")
        setShow(true)
    }

    useEffect(()=> {obtenerProfesionales()},[])
  return (
    <>
        <article className="contenedor-tabla-botones-hn">
            <h2>Profesionales</h2>
            <div className='contenedor-tabla-profesionales'>

            
            <Table striped bordered hover variant="warning">
                <thead>
                    <tr>
                        <td>Nombre</td>
                        <td>Apellido</td>
                        <td>Especialidad</td>
                        <td>Descripcion</td>
                        <td>Fecha de ingreso</td>
                        <td>Activo</td>
                        <td>Opciones</td>
                    </tr>
                </thead>
                <tbody>
                    {profesionales.map((profesional, indx)=>
                        <tr key={indx}>
                            <td>{profesional.nombre}</td>
                            <td>{profesional.apellido}</td>
                            <td>{profesional.especialidad}</td>
                            <td>{profesional.descripcion}</td>
                            <td>{profesional.fecha_ingreso}</td>
                            <td>{profesional.activo  == 1 ? "Si" : "No"}</td>
                            <td>
                                <img src="" alt="" />
                                <div className='btns-editar-profesional'>
                                <Button variant = 'warning' onClick={()=> handleClickEditar(profesional.profesional_id,profesional.nombre, profesional.apellido, profesional.especialidad, profesional.descripcion, profesional.fecha_ingreso, profesional.activo)}><img src={iconoLapiz} width={'14px'}/></Button>
                                <Button variant =  'danger' onClick={()=> handleClickEliminar(profesional.profesional_id)}><img src={iconoBasura} width={'14px'}/></Button>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            </div>
            <Button className='btn-crear-profesional' onClick={()=> handleClickCrearProfesional()}>Crear nuevo profesional</Button>
        </article>

        {editar ? <article className='contenedor-editar-profesional'>
            <Form>
                <Form.Group>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control value={nombre}  onChange={(e)=>setNombre(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control value={apellido} onChange={(e)=>{setApellido(e.target.value)}}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Especialidad</Form.Label>
                    <Form.Control value = {especialidad} onChange={(e)=>{setEspecialidad(e.target.value)}}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control value={descripcion} onChange={(e)=>{setDescripcion(e.target.value)}}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Fecha de ingreso</Form.Label>
                    <Form.Control type='date' value = {fecha_ingreso} onChange={(e)=>{

                        setFechaIngreso(e.target.value);
                        
                    }}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Activo</Form.Label>
                    <Form.Select onChange={(e) =>{setActivo(e.target.value)}} value={activo}>
                        <option value="1" selected>Activo</option>
                        <option value="0">Desactivo</option>
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
          <Modal.Title>Nuevo profesional</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control value={nombre} onChange={(e)=> setNombre(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control value = {apellido} onChange={(e)=> setApellido(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Especialidad</Form.Label>
                    <Form.Control value = {especialidad} onChange = {(e)=> setEspecialidad(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control value = {descripcion} onChange={(e)=> setDescripcion(e.target.value)}/>
                </Form.Group>


                <Form.Group>
                    <Form.Label>Fecha de registro</Form.Label>
                    <Form.Control value={fecha_ingreso} type='date' onChange={(e)=>{
                        const fechaFormateada = new Date(e.target.value).toISOString().split("T")[0];
                        setFechaIngreso(fechaFormateada);
                    }}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Activo</Form.Label>
                    <Form.Select value={activo} onChange={(e)=> setActivo(e.target.value)}>
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
