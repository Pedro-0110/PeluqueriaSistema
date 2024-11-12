import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
import iconoBasura from '../Icons/icono-basura.png'
import iconoLapiz from '../Icons/icono-lapiz.png'
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
    const [estado, setEstado] = useState("")

    const obtenerCitas = async () =>{
        const response = await axios.get("http://localhost:8000/citas")
        setCitas(response.data)
    }

    const handleClickEditar = (cita_id, usuario_id, profesional_id, servicio_id, fecha_cita, estado) =>{
        setEditar(true)
        setCitaID(cita_id)
        setUsuarioID(usuario_id)
        setProfesionalID(profesional_id)
        setServicioID(servicio_id)
        const fechaFormateada = new Date(fecha_cita).toISOString().split("T")[0];
        setFechaCita(fechaFormateada)
        setEstado(estado)
    }

    const handleClickActualizar = async () =>{
        const response = await axios.put("http://localhost:8000/citas/" + cita_id,{
         usuario_id,
         profesional_id, 
         servicio_id, 
         fecha_cita, 
         estado
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
        if(response){
            obtenerCitas()
        }
    }
    
    const handleClickCancelar = () =>{
        setEditar(false)
    }

    const handleClickConfirmar = async () =>{
        const response = await axios.post("http://localhost:8000/citas/",{
         usuario_id,
         profesional_id, 
         servicio_id, 
         fecha_cita, 
         estado
        })
        if(response){
            obtenerCitas()
            setCitaID("")
            setUsuarioID("")
            setProfesionalID("")
            setServicioID("")
            setFechaCita("")
            setEstado("")
            setShow(false)
        }
    }

    const handleClickCrearProfesional = () =>{
            obtenerCitas()
            setCitaID("")
            setUsuarioID("")
            setProfesionalID("")
            setServicioID("")
            setFechaCita("")
            setEstado("")
        setShow(true)
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
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Cita ID</td>
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Usuario ID</td>
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Profesional ID</td>
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Servicio ID</td>
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Fecha</td>
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Estado</td>
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Opciones</td>
                    </tr>
                </thead>
                <tbody>
                    {citas.map((cita, indx)=>
                        <tr key={indx}>
                            <td>{cita.cita_id}</td>
                            <td>{cita.usuario_id}</td>
                            <td>{cita.profesional_id}</td>
                            <td>{cita.servicio_id}</td>
                            <td>{cita.fecha}</td>
                            <td>{cita.estado}</td>
                            <td>
                                
                                <div className='div-botones-editar'>
                                <Button variant='primary'>Confirmar</Button>
                                <Button variant = 'warning' onClick={()=> handleClickEditar(cita.cita_id, cita.usuario_id, cita.profesional_id, cita.servicio_id, cita.fecha, cita.estado)}>editar</Button>
                                <Button variant =  'danger' onClick={()=> handleClickEliminar(cita.cita_id)}>cancelar</Button>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            </div>
            <Button className='btn-crear' onClick={()=> handleClickCrearProfesional()}>Crear nuevo profesional</Button>
        </article>
    
    </>
  )
}
