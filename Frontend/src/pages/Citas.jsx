import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
import iconoCancelar from '../Icons/icono-cancelar.png'
import iconoLapiz from '../Icons/icono-lapiz.png'
import iconoConfirmar from '../Icons/icono-confirmar.png'
import iconoNada from '../Icons/icono-nada.png'
import iconoPendiente from '../Icons/icono-pendiente.png'
import {useEffect, useState } from 'react';

export const Citas = () => {
    const [citas,setCitas] = useState([])
    const [editar,setEditar] = useState(false)

    const[show, setShow] = useState(false)
    const handleClose = () => setShow(false)

    const [cita_id, setCitaID] = useState("")
    const [usuario_id,setUsuarioID] = useState("")
    const [profesional_id,setProfesionalID] = useState("")
    const [servicio_id,setServicioID] = useState("")
    const [fecha_cita, setFechaCita] = useState("")
    const [estado_cita, setEstado] = useState("")

    const obtenerCitas = async () =>{
        const response = await axios.get("http://localhost:8000/citas")
        setCitas(response.data)
    }

    const handleClickEditar = (cita_id, usuario_id, profesional_id, servicio_id, fecha_cita, estado_cita) =>{
        setEditar(true)
        setCitaID(cita_id)
        setUsuarioID(usuario_id)
        setProfesionalID(profesional_id)
        setServicioID(servicio_id)
        const fechaFormateada = new Date(fecha_cita).toISOString().split("T")[0];
        setFechaCita(fechaFormateada)
        setEstado(estado_cita)
    }

    const handleClickActualizar = async () =>{
        const response = await axios.put("http://localhost:8000/citas/" + cita_id,{
         usuario_id,
         profesional_id, 
         servicio_id, 
         fecha_cita, 
         estado_cita
        }
    )
            if(response){
                obtenerCitas()
                setEditar(false)
                setCitaID("")
                setUsuarioID("")
                setProfesionalID("")
                setServicioID("")
                setFechaCita("")
                setEstado("")
        }

    }

    const handleClickEliminar = async (cita_id) =>{
        const response = await axios.delete(`http://localhost:8000/citas/${cita_id}`)
        if(response.status == 200){
            obtenerCitas()
        }
    }
    
    const handleClickCancelar = async (cita_id) =>{
        let response = confirm("¿Esta seguro que desea cancelar la cita?")
        if(response){
            response = await axios.put(`http://localhost:8000/citas/cancelar/${cita_id}`)
            if(response.status == 200){
                alert("Cita cancelada correctamente!")
                obtenerCitas()
            }
        }
    }

    const handleClickConfirmar = async (cita_id) =>{
       const response = await axios.put(`http://localhost:8000/citas/confirmar/${cita_id}`)
       if(response.status == 200){
        obtenerCitas()
       }
    }

    const limpiarCampos = () =>{
            setCitaID("")
            setUsuarioID("")
            setProfesionalID("")
            setServicioID("")
            setFechaCita("")
            setEstado("")
    }

    useEffect(()=> {obtenerCitas()},[])
  return (
    <>
        <article className="contenedor-padre">
            <h2 style={{padding: '1rem', backgroundColor: '#343a40', color: 'white', border : '1px solid black', borderRadius : '10px'}}>Citas</h2>
            <div className='contenedor-tabla'>

            
            <Table striped bordered hover variant="link">
                <thead>
                    <tr>
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Cita</td>
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Usuario</td>
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Profesional</td>
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Servicio</td>
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Fecha</td>
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Estado</td>
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Opciones</td>
                    </tr>
                </thead>
                <tbody>
                    {citas.map((cita, indx)=>
                        <tr key={indx}>
                            <td>{cita.cita_id}</td>
                            <td>{cita.nombre_usuario} {cita.apellido_usuario}</td>
                            <td>{cita.nombre_profesional} {cita.apellido_profesional}</td>
                            <td>{cita.nombre_servicio}</td>
                            <td>{cita.fecha_cita}</td>
                            <td>{cita.estado_cita == 'Confirmada' 
                                ?                               
                                <><img src={iconoConfirmar} alt="" width={'22px'}/></>
                                :
                                cita.estado_cita == 'Cancelada'
                                ?
                                <><img src= {iconoCancelar} width={'22px'}/></>
                                :
                                cita.estado_cita == 'Pendiente'
                                ?
                                <><img src={iconoPendiente} alt="" width={'22px'} /></>
                                :
                                <></>
                            }</td>
                            <td>
                                
                                <div className='div-botones-editar'>
                                {cita.estado_cita == 'Confirmada' 
                                ? <> <img src={iconoNada} alt="" width={'22px'} /></> 
                                : cita.estado_cita == 'Cancelada' 
                                ? <> <img src={iconoNada} alt="" width={'22px'} /> </>
                                : 
                                <>
                                <Button variant = 'success' onClick={()=> handleClickConfirmar(cita.cita_id)}><img src= {iconoConfirmar} width={'22px'}/></Button>
                                <Button variant='warning' onClick={()=> handleClickEditar()}><img src= {iconoLapiz} width={'22px'}/></Button>
                                <Button variant = 'danger' onClick={()=> handleClickCancelar(cita.cita_id)}><img src={iconoCancelar} width={'22px'}/></Button>
                                </>}
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            </div>
        </article>
    
    </>
  )
}
