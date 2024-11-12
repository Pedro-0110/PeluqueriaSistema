import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
import iconoBasura from '../Icons/icono-basura.png'
import iconoLapiz from '../Icons/icono-lapiz.png'

import { useEffect, useState } from 'react'

export const Galeria = () => {

    const[editar,setEditar] = useState(false)
    const[galerias,setGalerias] = useState([])
    const[profesionales,setProfesionales] = useState([])

    const[imagen_id, setImagenID] = useState("")
    const[profesional_id, setProfesionalID] = useState("")
    const[url_imagen, setUrlImagen] = useState("")
    const[descripcion, setDescripcion] = useState("")
    const[fecha_subida, setFechaSubida] = useState("")

    const[show, setShow] = useState(false)
    const handleClose = () => setShow(false)


    const obtenerGalerias = async () =>{
        const response = await axios.get("http://localhost:8000/galeria")
        setGalerias(response.data)
    }

    const obtenerNombresIDsProfesionales = async () =>{
        const response = await axios.get("http://localhost:8000/profesionales/nombres")
        setProfesionales(response.data)
    }

    const handleClickEditar = (imagen_id,profesional_id, url_imagen, descripcion, fecha_subida) =>{
        setEditar(true)
        setImagenID(imagen_id)
        setProfesionalID(profesional_id)
        setUrlImagen(url_imagen)
        setDescripcion(descripcion)
        const fechaFormateada = new Date(fecha_subida).toISOString().split("T")[0];
        setFechaSubida(fechaFormateada);
   

    }

    const handleClickEliminar = async(url_imagen) =>{
        const response = await axios.delete("http://localhost:8000/galeria/"+ url_imagen)
        if(response){
            obtenerGalerias()
        }
    }

    const handleClickActualizar = async () =>{
        const response = await axios.put("http://localhost:8000/galeria/" + imagen_id,{
            profesional_id,
            url_imagen,
            descripcion,
            fecha_subida
        })
        if(response){
            obtenerGalerias()
        }
    }

    const handleClickCancelar = () =>{
        setEditar(false)
        setShow(false)

    }

    const handleClickCrear = () =>{
        setShow(true)
    }

    const handleClickConfirmar = async () =>{
        const response = await axios.post("http://localhost:8000/galeria/",{
            profesional_id,
            url_imagen,
            descripcion,
            fecha_subida
        })
        if(response){
            obtenerGalerias()
        }
    }

    useEffect(()=> {obtenerGalerias()},[])
    useEffect(()=>{obtenerNombresIDsProfesionales()},[])

  return (
    <>
        <article className='contenedor-padre'>
        <h2 style={{padding: '1rem', backgroundColor: '#343a40', color: 'white', border : '1px solid black', borderRadius : '10px'}}>Galeria</h2>
        <div className="contenedor-tabla">

            <Table striped bordered hover variant="link" >
                <thead >
                    <tr>
                        <td style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Img</td>
                        <td style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Descripcion</td>
                        <td style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Profesional</td>
                        <td style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Fecha de subida</td>
                        <td style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Opciones</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        galerias.map((galeria,index) => 
                            <tr key={index}>
                                <td style={{ textAlign: 'center'}}><img src={galeria.url_imagen} alt="" width={'60px'} /></td>
                                <td>{galeria.descripcion}</td>
                                <td>{galeria.nombre} {galeria.apellido}</td>
                                <td>{galeria.fecha_subida}</td>
                                <td>
                                    <div className='div-botones-editar'>
                                    
                                    <Button variant='warning' style={{backgroundColor : '#ffc107'}} onClick={()=>{handleClickEditar(galeria.imagen_id, galeria.profesional_id, galeria.url_imagen, galeria.descripcion, galeria.fecha_subida)}}><img src= {iconoLapiz} width={'22px'}/></Button>
                                    <Button variant='danger' style={{backgroundColor : '#dc3545'}} onClick={()=>{handleClickEliminar(galeria.imagen_id)}}><img src= {iconoBasura} width={'22px'}/></Button>
                                    </div>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </div>

            <Button variant='success' style={{backgroundColor: '#007bff'}} className='btn-crear' onClick={()=> handleClickCrear()}>Crear nueva imagen</Button> 

        </article>
        {editar ? 
            <article className="contenedor-editar">
            <h4 style={{padding: '1rem', backgroundColor: '#343a40', color: 'white', border : '1px solid black', borderRadius : '10px'}}>Datos a actualizar</h4>
            <Form>
                <Form.Group>
                    <Form.Label>URL imagen</Form.Label>
                    <Form.Control onChange={(e)=> setUrlImagen(e.target.value)} value={url_imagen} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control onChange={(e)=> setDescripcion(e.target.value)} value={descripcion}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Profesional</Form.Label>
                    <Form.Select value={profesional_id} onChange={(e)=> setProfesionalID(e.target.value)}>
                        {profesionales.map((profesional, index)=>
                            <option key={index} value={profesional.profesional_id}>{profesional.nombre} {profesional.apellido}</option>
                        )}
                    </Form.Select>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Fecha subida</Form.Label>
                    <Form.Control value={fecha_subida} type='date' onChange={(e)=>{
                        const fechaFormateada = new Date(e.target.value).toISOString().split("T")[0];
                        setFechaSubida(fechaFormateada);
                    }}/>
                </Form.Group>

            </Form>
            <div className='div-botones-editar'>
            <Button style={{marginTop : '1rem'}} variant="success" onClick={()=>{handleClickActualizar()}}>Actualizar</Button>
            <Button style={{marginTop : '1rem', backgroundColor : '#6c757d'}} onClick={handleClickCancelar}>Cancelar</Button>
            </div>
            </article> : <></>}



            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nueva imagen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group>
                    <Form.Label>URL imagen</Form.Label>
                    <Form.Control onChange={(e)=> setUrlImagen(e.target.value)} value={url_imagen}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control onChange={(e)=> setDescripcion(e.target.value)} value={descripcion}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Profesional</Form.Label>
                    <Form.Select value={profesional_id} onChange={(e)=> setProfesionalID(e.target.value)}>
                        {profesionales.map((profesional, index)=>
                            <option key={index} value={profesional.profesional_id}>{profesional.nombre} {profesional.apellido}</option>
                        )}
                    </Form.Select>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Fecha subida</Form.Label>
                    <Form.Control type = 'date' onChange={(e)=>{
                        const fechaFormateada = new Date(e.target.value).toISOString().split("T")[0];
                        setFechaSubida(fechaFormateada);
                    }} value={fecha_subida}/>
                </Form.Group>

            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClickCancelar}>
            Cancelar
          </Button>
          <Button style={{backgroundColor: '#28a745'}} onClick={handleClickConfirmar} >
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>


    </>
  )
}
