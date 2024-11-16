import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup';
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
    const [valorBusqueda, setValorBusqueda] = useState("")
    const [loading, setLoading] = useState(false);


    const obtenerCitas = async () =>{
        setLoading(true)
        const response = await axios.get("http://localhost:8000/citas")
        setCitas(response.data)
        setLoading(false)
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

    const obtenerBusqueda = async () =>{
        if(valorBusqueda === ""){
            obtenerCitas()
            console.log(citas)
        }
        const response = await axios.get(`http://localhost:8000/citas/busqueda/${valorBusqueda}`)
        setCitas(response.data)
    }

    const handleClickEditar = () =>{}

    useEffect(()=> {obtenerCitas()},[])
    useEffect(()=> {obtenerBusqueda()},[valorBusqueda])
  return (
    <>
        <article className="contenedor-padre">
            <h2 style={{padding: '1rem', backgroundColor: '#343a40', color: 'white', border : '1px solid black', borderRadius : '10px'}}>Citas</h2>

            <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          Busqueda de cliente o profesional
        </InputGroup.Text>
        <Form.Control
          
          placeholder="Ingrese el nombre o apellido"
          onChange={(e) => setValorBusqueda(e.target.value)
          
          }
        />
      </InputGroup>

      {loading ?
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
             :
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
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Nota</td>
                    </tr>
                </thead>
                <tbody>
                    {
                    !loading && citas.length > 0 &&
                    citas.map((cita, indx)=>
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
                                <Button variant = 'success' style={{width : '80px'}} onClick={()=> handleClickConfirmar(cita.cita_id)}><img src= {iconoConfirmar} width={'22px'}/></Button>
                                <Button variant='warning' style={{width : '80px'}} onClick={()=> handleClickEditar()}><img src= {iconoLapiz} width={'22px'}/></Button>
                                <Button variant = 'danger' style={{width : '80px'}} onClick={()=> handleClickCancelar(cita.cita_id)}><img src={iconoCancelar} width={'22px'}/></Button>
                                </>}
                                </div>
                            </td>
                            <td>
                                {cita.estado_cita === 'Pendiente' 
                                ?
                                <Form.Control placeholder='Ingresar nota..'/>
                                :
                                <></> }
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            </div>
}
        </article>
    
    </>
  )
}
