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


export const Servicios = () => {
    const [servicios,setServicios] = useState([])
    const [editar,setEditar] = useState(false)
    const [show, setShow] = useState(false)
    const [servicio_id, setServicioID] = useState("")
    const [nombre_servicio,setNombre] = useState("")
    const [descripcion_servicio,setDescripcion] = useState("")
    const [duracion_servicio,setDuracion] = useState("")
    const [precio_servicio, setPrecio] = useState("")
    const [loading, setLoading] = useState(false);
    
    const handleClose = () => setShow(false)

    const obtenerServicios = async () =>{
        setLoading(true)
        const response = await axios.get("http://localhost:8000/servicios")
        setServicios(response.data)
        setLoading(false)
    }

    const handleClickEditar = (servicio_id, nombre_servicio, descripcion_servicio , duracion_servicio, precio_servicio) =>{
        setEditar(true)
        setServicioID(servicio_id)
        setNombre(nombre_servicio)
        setDescripcion(descripcion_servicio)
        setDuracion(duracion_servicio)
        setPrecio(precio_servicio)
    }

    const handleClickActualizar = async () =>{
        if(verificarLlenadoDeCampos()){
          const response = await axios.put("http://localhost:8000/servicios/" + servicio_id,{
             nombre_servicio,
             descripcion_servicio,
             duracion_servicio,
             precio_servicio
          })
              if(response){
                  setEditar(false)
                  obtenerServicios()
                  setServicioID("")
                  setNombre("")
                  setDescripcion("")
                  setDuracion("")
                  setPrecio("")
              }
          }else{
            Swal.fire("Llenar todos los campos!");
          }
    }

    const handleClickEliminar = async (servicio_id) => {
        const confirmacion = await Swal.fire({
          title: "Se eliminara el registro de forma permanente!",
          text: "",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí, eliminar!",
        });
      
        if (confirmacion.isConfirmed) {
          try {
            const response = await axios.delete(`http://localhost:8000/servicios/${servicio_id}`);
            
            if (response.status === 200) {
              Swal.fire({
                title: "Registro eliminado!",
                text: "",
                icon: "success"
              });
              obtenerServicios()
            } else {
              Swal.fire({
                title: "Error!",
                text: "",
                icon: "error",
              });
            }
          } catch (error) {
            console.error(error);
            Swal.fire({
              title: "Error!",
              text: "",
              icon: "error",
            });
          }
        }
      };
    
    const handleClickCancelar = () =>{
      limpiarCampos();
      setEditar(false);
    }
    
    const handleClickConfirmar = async () =>{
        if(verificarLlenadoDeCampos()){
            const response = await axios.post("http://localhost:8000/servicios/",{
              nombre_servicio,
              descripcion_servicio,
              duracion_servicio,
              precio_servicio
          })
          if(response.status == 201){
              Swal.fire({
                  position: "top",
                   icon: "success",
                   title: "Nuevo servicios guardado",
                   showConfirmButton: false,
                   timer: 1500,
                 });
              setShow(false)
              obtenerServicios()
          }
          limpiarCampos()
        }else{
          Swal.fire("Llenar todos los campos!");
        }
    }

    const handleClickCrearServicio = () => setShow(true)

    const limpiarCampos = () =>{
        setServicioID("")
        setNombre("")
        setDescripcion("")
        setDuracion("")
        setPrecio("")
    }

    const verificarLlenadoDeCampos = () =>{
      if(nombre_servicio != "" && descripcion_servicio != "" && duracion_servicio != "" && precio_servicio != ""){
        return true
      } 
    }

useEffect(()=> {obtenerServicios()},[])

  return (
    <>
    <NavbarAdministrados/>
        <article className="contenedor-padre">
            <h2>Servicios</h2>
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
                          <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Nombre</td>
                          <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Descripcion</td>
                          <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Duracion</td>
                          <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Precio</td>
                          <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Opciones</td>
                        </tr>
                      </thead>
                    <tbody>
                      {!loading && servicios.length > 0 && servicios.map((servicio, indx)=>
                        <tr key={indx}>
                          <td>{servicio.nombre_servicio}</td>
                          <td>{servicio.descripcion_servicio}</td>
                          <td>{servicio.duracion_servicio}</td>
                          <td>{servicio.precio_servicio}</td>
                          <td>         
                              <div className='div-botones-editar-servicios'>
                                <Button variant = 'warning' onClick={()=> handleClickEditar(servicio.servicio_id,servicio.nombre_servicio, servicio.descripcion_servicio, servicio.duracion_servicio, servicio.precio_servicio)}><img src={iconoLapiz} width={'22px'}/></Button>
                                <Button variant =  'danger' onClick={()=> handleClickEliminar(servicio.servicio_id)}><img src={iconoBasura} /></Button>
                              </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
              }
              <Button className='btn-crear' onClick={()=> handleClickCrearServicio()}>Crear nuevo servicio</Button>
        </article>
        {editar 
          ? 
            <article className='contenedor-editar'>
              <h4 >Datos a actualizar</h4>
              <Form>
                <Form.Group>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control required value={nombre_servicio}  onChange={(e)=>setNombre(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control value={descripcion_servicio} onChange={(e)=>{setDescripcion(e.target.value)}}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Duracion</Form.Label>
                    <Form.Control required type='number' value = {duracion_servicio} onChange={(e)=> setDuracion(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Precio</Form.Label>
                    <Form.Control required value={precio_servicio} onChange={(e)=>{setPrecio(e.target.value)}}/>
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
                <Form.Control value={nombre_servicio} onChange={(e)=> setNombre(e.target.value)}/>
              </Form.Group>

              <Form.Group>
                <Form.Label>Descripcion</Form.Label>
                <Form.Control value = {descripcion_servicio} onChange={(e)=> setDescripcion(e.target.value)}/>
              </Form.Group>

              <Form.Group>
                <Form.Label>Duracion</Form.Label>
                <Form.Control type = 'number' value = {duracion_servicio} onChange={(e)=> setDuracion(e.target.value)}/>
              </Form.Group>

              <Form.Group>
                <Form.Label>Precio</Form.Label>
                <Form.Control value = {precio_servicio} onChange={(e)=> setPrecio(e.target.value)}/>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button style={{display: 'block', width : '10vw', marginLeft : 'auto', marginRight : 'auto'}} variant="primary" onClick={()=> handleClickConfirmar()}>
              Confirmar
            </Button>
            <Button style={{display: 'block', width : '10vw', marginLeft : 'auto', marginRight : 'auto'}} variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
    </>
  )
}
