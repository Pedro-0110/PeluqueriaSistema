import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import iconoBasura from '../Icons/icono-basura.png'
import {useEffect, useState } from 'react';

export const Reseñas = () => {
    const [resenas,setResenas] = useState([])

    const obtenerResenas = async () =>{
        const response = await axios.get("http://localhost:8000/resenas")
        setResenas(response.data)
    }

    const handleClickEliminar = async (resena_id) =>{
        const response = await axios.delete("http://localhost:8000/resenas/"+resena_id)
        if(response){
            obtenerResenas()
        }
    }

    useEffect(()=>{obtenerResenas()},[])

  return (
    <>
        <article className="contenedor-padre">
            <h2 style={{padding: '1rem', backgroundColor: '#343a40', color: 'white', border : '1px solid black', borderRadius : '10px'}}>Reseñas</h2>
            <div className='contenedor-tabla'>

            <Table striped bordered hover variant="link">
                <thead>
                    <tr>
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Reseña ID</td>
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Usuario</td>
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Username</td>
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Profesional</td>
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Fecha de la Cita</td>
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Servicio</td>
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Comentario</td>
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Puntuacion</td>
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Fecha de la reseña</td>
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Opcion</td>
                                        
                    </tr>
                </thead>
                <tbody>
                    {resenas.map((resena, indx)=>
                        <tr key={indx}>
                            <td>{resena.reseña_id}</td>
                            <td>{resena.nombre_usuario}{resena.apellido_usuario}</td>
                            <td>{resena.username}</td>
                            <td>{resena.nombre_profesional}{resena.apellido_profesional}</td>
                            <td>{resena.fecha_cita}</td>
                            <td>{resena.nombre_servicio}</td>
                            <td>{resena.comentario}</td>
                            <td>{resena.puntuacion}</td>
                            <td>{resena.fecha_reseña}</td>
                            <td>
                            
                                <div className='div-botones-editar'>
                                <Button variant =  'danger' onClick={()=> handleClickEliminar(resena.reseña_id)}><img src={iconoBasura} width={'22px'}/></Button>
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
