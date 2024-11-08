import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
import { useEffect, useState } from 'react';

export const Profesionales = () => {
    const [profesionales,setProfesionales] = useState([])
    const [editar,setEditar] = useState(false)

    const[show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)


    const [nombre,setNombre] = useState("")
    const [apellido,setApellido] = useState("")
    const [especialidad,setEspecialidad] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [fecha_ingreso, setFechaIngreso] = useState("") 
    const [activo,setActivo] = useState("")


    const obtenerProfesionales = async () =>{
        const response = await axios.get("http://localhost:8000/profesionales")
        setProfesionales(response.data)
    }

    const handleClickEditar = () =>{
        setEditar(true)
    }

    const handleClickActualizar = () =>{}
    

    const handleClickCancelar = () =>{
        setEditar(false)
    }

    useEffect(()=> {obtenerProfesionales()},[])
  return (
    <>
        <article className="contenedor-tabla-botones-hn">
            <h2>Profesionales</h2>
            <Table striped bordered hover variant="dark">
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
                                <Button onClick={()=> handleClickEditar()}>Editar</Button>
                                <Button>Eliminar</Button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <Button onClick={handleShow}>Crear nuevo profesional</Button>
        </article>

        {editar ? <article className='contenedor-editar-profesional'>
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
                    <Form.Label>Especialidad</Form.Label>
                    <Form.Control value = {especialidad}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control value={descripcion}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Fecha de ingreso</Form.Label>
                    <Form.Control value = {fecha_ingreso}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Activo</Form.Label>
                    <Form.Select>
                        <option value=""></option>
                    </Form.Select>
                </Form.Group>
            </Form>
            <Button variant="success" onClick={()=> handleClickActualizar()}>Actualizar</Button>
            <Button variant = "dark" onClick={handleClickCancelar}>Cancelar</Button>
        </article> : <></>}



        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo profesional</Modal.Title>
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
                    <Form.Label>Especialidad</Form.Label>
                    <Form.Control/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control/>
                </Form.Group>


                <Form.Group>
                    <Form.Label>Fecha de registro</Form.Label>
                    <Form.Control/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Activo</Form.Label>
                    <Form.Select>
                       
                    </Form.Select>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    
    </>
  )
}
