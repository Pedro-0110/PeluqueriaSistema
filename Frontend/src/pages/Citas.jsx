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
              text: "An error occurred while trying to delete the file.",
              icon: "error",
            });
          }
        }
      };

    const handleClickConfirmar = async (cita_id) =>{
       const response = await axios.put(`http://localhost:8000/citas/confirmar/${cita_id}`,{nota})

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

    const obtenerBusqueda = async () =>{
        if(valorBusqueda === ""){
            obtenerCitas()
        }
        const response = await axios.get(`http://localhost:8000/citas/busqueda/${valorBusqueda}`)
        setCitas(response.data)
        }

    const handleClickVerHistorialCitas = async (usuario_id) =>{
        setShowHistorial(true)
        const response = await axios.get(`http://localhost:8000/citas/historial/${usuario_id}`)
        setHistorialCliente(response.data)   
      }

    useEffect(()=> {obtenerCitas()},[])
    useEffect(()=> {obtenerBusqueda()},[valorBusqueda])

  return (
    <>
        <article className="contenedor-padre">
            <h2 style={{padding: '1rem', backgroundColor: '#343a40', color: 'white', border : '1px solid black', borderRadius : '10px'}}>Citas</h2>

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
                <thead>
                    <tr>
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Cita</td>
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Usuario</td>
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Profesional</td>
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Servicio</td>
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Fecha</td>
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Estado</td>
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Opciones</td>
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Nota</td>
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Historial</td>
                    </tr>
                </thead>
                <tbody>
                    {!loading && citas.length > 0 &&citas.map((cita, indx)=>
                        <tr key={indx}>
                            <td>{cita.cita_id}</td>
                            <td>{cita.nombre_usuario} {cita.apellido_usuario}</td>
                            <td>{cita.nombre_profesional} {cita.apellido_profesional}</td>
                            <td>{cita.nombre_servicio}</td>
                            <td>{cita.fecha_cita}</td>
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
                                      <> <img src={iconoNada} alt="" width={'22px'} /></> 
                                    :
                                      cita.estado_cita == 'Cancelada'  
                                    ? 
                                      <> <img src={iconoNada} alt="" width={'22px'} /> </>
                                    : 
                                      <>
                                        <Button variant = 'success' style={{width : '80px'}} onClick={()=> handleClickConfirmar(cita.cita_id)}><img src= {iconoConfirmar} width={'24px'}/></Button>
                                        <Button variant='warning' style={{width : '80px'}}><img src= {iconoLapiz} width={'24px'}/></Button>
                                        <Button variant = 'danger' style={{width : '80px'}} onClick={()=> handleClickCancelar(cita.cita_id)}><img src={iconoCancelar} width={'24px'}/></Button>
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

                            <td><Button variant = 'info' style={{width : '80px'}} onClick = {()=> handleClickVerHistorialCitas(cita.usuario_id)}><img src={iconoVer} alt="" width={'24px'}/></Button></td>
                        </tr>
                    )}
                </tbody>
            </Table>
          </div>}
          
        </article>


        <Modal show={showHistorial} onHide={handleClose} >
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
