import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';

import axios from 'axios'
import Swal from 'sweetalert2';
import {useEffect, useState } from 'react';

import iconoCancelar from '../Icons/icono-cancelar.png'
import iconoCancelarColor from '../Icons/icono-cancelar-color.png'
import iconoLapiz from '../Icons/icono-lapiz.png'
import iconoConfirmar from '../Icons/icono-confirmar.png'
import iconoConfirmarColor from '../Icons/icono-confirmar-color.png'
import iconoNada from '../Icons/icono-nada.png'
import iconoPendiente from '../Icons/icono-pendiente.png'
import iconoVer from '../Icons/icono-ver.png'


export const Citas = () => {
    const [citas,setCitas] = useState([])
    const [valorBusqueda, setValorBusqueda] = useState("")
    const [loading, setLoading] = useState(false)
    const [nota,setNota] = useState("sin agregar")
    const [historialCliente, setHistorialCliente] = useState([]) 
    const [showHistorial, setShowHistorial] = useState(false)

    const handleClose = () => setShowHistorial(false);

    const obtenerCitas = async () =>{
        setLoading(true)
        const response = await axios.get("http://localhost:8000/citas")
        setCitas(response.data)
        setLoading(false)
      }


    const handleClickCancelar = async (cita_id) => {
        const confirmacion = await Swal.fire({
          title: "Esta seguro de cancelar la cita?",
          text: "",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, cancelar",
        });
      
        if (confirmacion.isConfirmed) {
          try {
            const response = await axios.put(`http://localhost:8000/citas/cancelar/${cita_id}`);
            
            if (response.status === 200) {
              Swal.fire({
                title: "Cita cancelada exitosamente!",
                text: "",
                icon: "success"
              });
              obtenerCitas()
            } else {
              Swal.fire({
                title: "Error al cancelar la cita!",
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


    const handleClickConfirmarCita = async (cita_id, profesional_id) =>{
       const response = await axios.put(`http://localhost:8000/citas/confirmar/${cita_id}/profesional/${profesional_id}`,{nota})

       if(response.status == 200){
        Swal.fire({
            position: "top",
             icon: "success",
             title: "Cita confirmada",
             showConfirmButton: false,
             timer: 1500
           });
           obtenerCitas()
          }
          }


    const buscarCitaDeUsuario = async () =>{
        if(valorBusqueda === ""){
            obtenerCitas()
        }
        const response = await axios.get(`http://localhost:8000/citas/busqueda/${valorBusqueda}`)
        setCitas(response.data)
        }


    const handleClickVerNotasDeCitasAnteriores = async (usuario_id, profesional_id) =>{
        setShowHistorial(true)
        const response = await axios.get(`http://localhost:8000/citas/historial/${usuario_id}/profesional/${profesional_id}`)
        setHistorialCliente(response.data)   
      }
      

    useEffect(()=> {obtenerCitas()},[])
    useEffect(()=> {buscarCitaDeUsuario()},[valorBusqueda])

  return (
    <>
        <article className="contenedor-padre">
            <h2>Citas</h2>
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">Busqueda de cliente o profesional</InputGroup.Text>

              <Form.Control
                placeholder="Ingrese el nombre o apellido"
                onChange={(e) => setValorBusqueda(e.target.value)
                }
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
          <div className='contenedor-tabla'>
            <Table striped bordered hover variant="dark">
                <thead className="cabeza-tabla">
                    <tr>
                        <td>Cita</td>
                        <td>Usuario</td>
                        <td>Profesional</td>
                        <td>Servicio</td>
                        <td>Fecha</td>
                        <td>Horario</td>
                        <td>Estado</td>
                        <td>Opciones</td>
                        <td>Nota</td>
                        <td>Historial</td>
                    </tr>
                </thead>
                <tbody>
                    {!loading && citas.length > 0 &&citas.map((cita, indx)=>
                        <tr key={indx}>
                            <td>{cita.cita_id}</td>
                            <td>{cita.nombre_usuario} {cita.apellido_usuario}</td>
                            <td>{cita.nombre_profesional} {cita.apellido_profesional}</td>
                            <td>{cita.nombre_servicio}</td>
                            <td>{new Date(cita.fecha_cita).getDay()}/{new Date(cita.fecha_cita).getMonth()}/{new Date(cita.fecha_cita).getFullYear()}</td>
                            <td>{new Date(cita.fecha_cita).getHours()}:{new Date(cita.fecha_cita).getMinutes()}{new Date(cita.fecha_cita).getMinutes()}</td>
                            <td>{cita.estado_cita == 'Confirmada' 
                                ?                               
                                  <><img src={iconoConfirmarColor} alt="" width={'22px'}/></>
                                :
                                  cita.estado_cita == 'Cancelada'
                                ?
                                  <><img src= {iconoCancelarColor} width={'22px'}/></>
                                :
                                  cita.estado_cita == 'Pendiente'
                                ?
                                  <><img src={iconoPendiente} alt="" width={'22px'} /></>
                                :
                                  <></>}
                                  
                            </td>

                            <td> 
                                <div className='div-botones-editar'>
                                  {cita.estado_cita == 'Confirmada' 
                                    ? 
                                      <> <img src={iconoNada} alt="" /></> 
                                    :
                                      cita.estado_cita == 'Cancelada'  
                                    ? 
                                      <> <img src={iconoNada} alt="" /> </>
                                    : 
                                      <>
                                        <Button variant = 'success'  onClick={()=> handleClickConfirmarCita(cita.cita_id, cita.profesional_id)}><img src= {iconoConfirmar} /></Button>
                                        <Button variant='warning' ><img src= {iconoLapiz} /></Button>
                                        <Button variant = 'danger' onClick={()=> handleClickCancelar(cita.cita_id)}><img src={iconoCancelar}/></Button>
                                      </>}
                                </div>
                            </td>

                            <td>
                                {cita.estado_cita === 'Pendiente' 
                                ?
                                  <Form.Control onChange={(e)=> setNota(e.target.value)} as="textarea" rows={3} placeholder='Ingresar nota..'/>
                                :
                                  <></> }
                            </td>

                            <td><Button variant = 'info'  onClick = {()=> handleClickVerNotasDeCitasAnteriores(cita.usuario_id, cita.profesional_id)}><img src={iconoVer} alt=""/></Button></td>
                        </tr>
                    )}
                </tbody>
            </Table>
          </div>}          
        </article>

        <Modal show={showHistorial} onHide={handleClose}size='lg' >
          <Modal.Header closeButton>
            <Modal.Title>Historial</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label htmlFor=""> </label>
            <Table striped bordered hover variant = 'dark' >
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Trabajo</th>
                  <th>Profesional</th>
                  <th>Descripcion</th>
                </tr>
              </thead>
              <tbody>
                {historialCliente.map((historia ,index)=>
                <tr key={index}>
                  <td>{historia.fecha_cita}</td>
                  <td>{historia.nombre_servicio}</td>
                  <td>{historia.nombre_profesional} {historia.apellido_profesional}</td>
                  <td>{historia.nota}</td>
                </tr>
                  )}
              </tbody>
            </Table>
          </Modal.Body>
        </Modal>
    
    </>
  )
}
