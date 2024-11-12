import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
import iconoBasura from '../Icons/icono-basura.png'
import iconoLapiz from '../Icons/icono-lapiz.png'
import {useEffect, useState } from 'react';

export const Servicios = () => {
    const [servicios,setServicios] = useState([])
    const [editar,setEditar] = useState(false)

    const[show, setShow] = useState(false)
    const handleClose = () => setShow(false)

    const [servicio_id, setServicioID] = useState("")
    const [nombre,setNombre] = useState("")
    const [descripcion,setDescripcion] = useState("")
    const [duracion,setDuracion] = useState("")
    const [precio, setPrecio] = useState("")


    const obtenerServicios = async () =>{
        const response = await axios.get("http://localhost:8000/servicios")
        setServicios(response.data)
    }

    const handleClickEditar = (servicio_id, nombre, descripcion , duracion, precio) =>{
        setEditar(true)
        setServicioID(servicio_id)
        setNombre(nombre)
        setDescripcion(descripcion)
        setDuracion(duracion)
        setPrecio(precio)
    }

    const handleClickActualizar = async () =>{
        const response = await axios.put("http://localhost:8000/servicios/" + servicio_id,{
           nombre,
           descripcion,
           duracion,
           precio
        }
    )
            if(response){
                obtenerServicios()
                setEditar(false)
                setServicioID("")
                setNombre("")
                setDescripcion("")
                setDuracion("")
                setPrecio("")
        }

    }

    const handleClickEliminar = async (servicio_id) =>{
        const response = await axios.delete("http://localhost:8000/servicios/"+servicio_id)
        if(response){
            obtenerServicios()
        }
    }
    
    const handleClickCancelar = () =>{
        setEditar(false)
    }

    const handleClickConfirmar = async () =>{
        const response = await axios.post("http://localhost:8000/servicios/",{
            nombre,
            descripcion,
            duracion,
            precio
        })
        if(response){
            obtenerServicios()
                setServicioID("")
                setNombre("")
                setDescripcion("")
                setDuracion("")
                setPrecio("")
                setShow(false)
        }
    }

    const handleClickCrearServicio = () =>{
        setShow(true)
        setNombre("")
        setDescripcion("")
        setDuracion("")
        setPrecio("")
    }



useEffect(()=> {obtenerServicios()},[])

  return (
    <>
        <article className="contenedor-padre">
            <h2 style={{padding: '1rem', backgroundColor: '#343a40', color: 'white', border : '1px solid black', borderRadius : '10px'}}>Servicios</h2>
            <div className='contenedor-tabla'>

            <Table striped bordered hover variant="link">
                <thead>
                    <tr>
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Nombre</td>
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Descripcion</td>
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Duracion</td>
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Precio</td>
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Opciones</td>
                    </tr>
                </thead>
                <tbody>
                    {servicios.map((servicio, indx)=>
                        <tr key={indx}>
                            <td>{servicio.nombre}</td>
                            <td>{servicio.descripcion}</td>
                            <td>{servicio.duracion}</td>
                            <td>{servicio.precio}</td>
                            <td>
                                
                                <div className='div-botones-editar'>
                                <Button variant = 'warning' onClick={()=> handleClickEditar(servicio.servicio_id,servicio.nombre, servicio.descripcion, servicio.duracion, servicio.precio)}><img src={iconoLapiz} width={'22px'}/></Button>
                                <Button variant =  'danger' onClick={()=> handleClickEliminar(servicio.servicio_id)}><img src={iconoBasura} width={'22px'}/></Button>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            </div>
            <Button className='btn-crear' onClick={()=> handleClickCrearServicio()}>Crear nuevo servicio</Button>
        </article>

        {editar ? <article className='contenedor-editar'>
            <h4 style={{padding: '1rem', backgroundColor: '#343a40', color: 'white', border : '1px solid black', borderRadius : '10px'}}>Datos a actualizar</h4>
            <Form>
                <Form.Group>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control value={nombre}  onChange={(e)=>setNombre(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control value={descripcion} onChange={(e)=>{setDescripcion(e.target.value)}}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Duracion</Form.Label>
                    <Form.Control type='number' value = {duracion} onChange={(e)=> setDuracion(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Precio</Form.Label>
                    <Form.Control value={precio} onChange={(e)=>{setPrecio(e.target.value)}}/>
                </Form.Group>
            </Form>

            <div className='div-botones-editar'>
            <Button style={{marginTop : '1rem'}} variant="success" onClick={()=> handleClickActualizar()}>Actualizar</Button>
            <Button style={{marginTop : '1rem'}} variant = "dark" onClick={handleClickCancelar}>Cancelar</Button>
            </div>
        </article> : <></>}



        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo servicio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control value={nombre} onChange={(e)=> setNombre(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control value = {descripcion} onChange={(e)=> setDescripcion(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Duracion</Form.Label>
                    <Form.Control type = 'number' value = {duracion} onChange={(e)=> setDuracion(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Precio</Form.Label>
                    <Form.Control value = {precio} onChange={(e)=> setPrecio(e.target.value)}/>
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
