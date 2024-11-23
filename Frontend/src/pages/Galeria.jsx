import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
import iconoBasura from '../Icons/icono-basura.png'
import iconoLapiz from '../Icons/icono-lapiz.png'
import iconoVer from '../Icons/icono-ver.png'
import Swal from 'sweetalert2';

import { useEffect, useState } from 'react'

export const Galeria = () => {

    const[editar,setEditar] = useState(false)
    const[galerias,setGalerias] = useState([])
    const[profesionales,setProfesionales] = useState([])

    const [loading, setLoading] = useState(false);

    const[imagen_id, setImagenID] = useState("")
    const[profesional_id, setProfesionalID] = useState("")
    const[url_imagen, setUrlImagen] = useState("")
    const[descripcion_imagen, setDescripcion] = useState("")
    const[fecha_subida_imagen, setFechaSubida] = useState("")

    const [showImagen, setShowImagen] = useState(false);
    const [imagen, setImagen] = useState("")

    const[show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleCloseImagen = () => setShowImagen(false)


    const obtenerGalerias = async () =>{
        setLoading(true)
        const response = await axios.get("http://localhost:8000/galeria")
        setGalerias(response.data)
        setLoading(false)
    }

    const obtenerNombresIDsProfesionales = async () =>{
        const response = await axios.get("http://localhost:8000/profesionales/nombres")
        setProfesionales(response.data)
    }

    const handleClickEditar = (imagen_id,profesional_id, url_imagen, descripcion_imagen, fecha_subida_imagen) =>{
        setEditar(true)
        setImagenID(imagen_id)
        setProfesionalID(profesional_id)
        setUrlImagen(url_imagen)
        setDescripcion(descripcion_imagen)
        const fechaFormateada = new Date(fecha_subida_imagen).toISOString().split("T")[0];
        setFechaSubida(fechaFormateada);
    }

    const handleClickEliminar = async (imagen_id) => {
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
            const response = await axios.delete(`http://localhost:8000/galeria/${imagen_id}`);
            
            if (response.status === 200) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              obtenerGalerias()
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

    const handleClickActualizar = async () =>{
        const response = await axios.put("http://localhost:8000/galeria/" + imagen_id,{
            profesional_id,
            url_imagen,
            descripcion_imagen,
            fecha_subida_imagen
        })
        if(response.status == 200){
            limpiarCampos()
            setEditar(false)
            obtenerGalerias()
        }
    }

    const handleClickCancelar = () =>{
        setEditar(false)
        setShow(false)

    }

    const handleClickCrear = () => setShow(true)
  

    const handleClickConfirmar = async () =>{

        const response = await axios.post("http://localhost:8000/galeria/",{
            profesional_id,
            url_imagen,
            descripcion_imagen,
            fecha_subida_imagen
        })
        if(response.status == 201){
            limpiarCampos()
            setShow(false)

            Swal.fire({
               position: "top",
                icon: "success",
                title: "Nueva imagen guardada!",
                showConfirmButton: false,
                timer: 1500
              });
            obtenerGalerias()
        }
    }


    const handleClickVisualizar = async (imagen_id) =>{
        setShowImagen(true)
        const response = await axios.get(`http://localhost:8000/galeria/${imagen_id}`)
        if(response.status === 200){
            setImagen(response.data[0])
        }
    }

    const limpiarCampos = () => {
    setImagenID("")
    setProfesionalID("")
    setUrlImagen("")
    setDescripcion("")
    setFechaSubida("")
    }

    useEffect(()=> {obtenerGalerias()},[])
    useEffect(()=>{obtenerNombresIDsProfesionales()},[])

  return (
    <>
        <article className='contenedor-padre'>
        <h2 style={{padding: '1rem', backgroundColor: '#343a40', color: 'white', border : '1px solid black', borderRadius : '10px'}}>Galeria</h2>
        {loading ?
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
             :
        <div className="contenedor-tabla">

             

            <Table striped bordered hover variant="dark" >
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
                        !loading && galerias.length > 0 &&
                        galerias.map((galeria,index) => 
                            <tr key={index}>
                                <td style={{ textAlign: 'center'}}><img src={galeria.url_imagen} alt="" width={'60px'} /></td>
                                <td>{galeria.descripcion_imagen}</td>
                                <td>{galeria.nombre_profesional} {galeria.apellido_profesional}</td>
                                <td>{galeria.fecha_subida_imagen}</td>
                                <td>
                                    <div className='div-botones-editar'>
                                    <Button variant='info' style={{width : '80px'}} onClick={()=>{handleClickVisualizar(galeria.imagen_id)}}><img src= {iconoVer} width={'22px'}/></Button>
                                    <Button variant='warning' style={{width : '80px'}} onClick={()=>{handleClickEditar(galeria.imagen_id, galeria.profesional_id, galeria.url_imagen, galeria.descripcion_imagen, galeria.fecha_subida_imagen)}}><img src= {iconoLapiz} width={'22px'}/></Button>
                                    <Button variant='danger' style={{width : '80px'}} onClick={()=>{handleClickEliminar(galeria.imagen_id)}}><img src= {iconoBasura} width={'22px'}/></Button>
                                    </div>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </div>
    }

            <Button variant='primary' className='btn-crear' onClick={()=> handleClickCrear()}>Crear nueva imagen</Button> 

        </article>
        {editar ? 
            <article className="contenedor-editar">
            <h4 style={{padding: '1rem', backgroundColor: '#343a40', color: 'white', border : '1px solid black', borderRadius : '10px'}}>Datos a actualizar</h4>
            <Form>
                <Form.Group>
                    <Form.Label>URL imagen</Form.Label>
                    <Form.Control required onChange={(e)=> setUrlImagen(e.target.value)} value={url_imagen} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control onChange={(e)=> setDescripcion(e.target.value)} value={descripcion_imagen}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Profesional</Form.Label>
                    <Form.Select value={profesional_id} onChange={(e)=> setProfesionalID(e.target.value)}>
                        {profesionales.map((profesional, index)=>
                            <option key={index} value={profesional.profesional_id}>{profesional.nombre_profesional} {profesional.apellido_profesional}</option>
                        )}
                    </Form.Select>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Fecha subida</Form.Label>
                    <Form.Control value={fecha_subida_imagen} type='date' onChange={(e)=>{
                        const fechaFormateada = new Date(e.target.value).toISOString().split("T")[0];
                        setFechaSubida(fechaFormateada);
                    }}/>
                </Form.Group>

            </Form>
            <div className='div-botones-editar'>
            <Button style={{marginTop : '1rem'}} variant="success" onClick={()=>{handleClickActualizar()}}>Actualizar</Button>
            <Button style={{marginTop : '1rem'}} variant = "secondary" onClick={handleClickCancelar}>Cancelar</Button>
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
                    <Form.Control onChange={(e)=> setDescripcion(e.target.value)} value={descripcion_imagen}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Profesional</Form.Label>
                    <Form.Select value={profesional_id} onChange={(e)=> setProfesionalID(e.target.value)}>
                        {profesionales.map((profesional, index)=>
                            <option key={index} value={profesional.profesional_id}>{profesional.nombre_profesional} {profesional.apellido_profesional}</option>
                        )}
                    </Form.Select>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Fecha subida</Form.Label>
                    <Form.Control type = 'date' onChange={(e)=>{
                        const fechaFormateada = new Date(e.target.value).toISOString().split("T")[0];
                        setFechaSubida(fechaFormateada);
                    }} value={fecha_subida_imagen}/>
                </Form.Group>

            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClickCancelar}>
            Cancelar
          </Button>
          <Button variant = "success" onClick={handleClickConfirmar} >
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal className='modal-imagen' show={showImagen} onHide={handleCloseImagen}>
        <Modal.Header closeButton>
          <Modal.Title>{imagen.nombre_profesional} {imagen.apellido_profesional}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

         <div className='div-modal-imagen'>
            <img src={imagen.url_imagen} alt="" />
         </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
