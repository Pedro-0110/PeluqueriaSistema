import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import iconoBasura from '../Icons/icono-basura.png'
import {useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export const Reseñas = () => {
    const [resenas,setResenas] = useState([])

    const [loading, setLoading] = useState(false);

    const obtenerResenas = async () =>{
        setLoading(true)
        const response = await axios.get("http://localhost:8000/resenas")
        setResenas(response.data)
        setLoading(false)
    }

    const handleClickEliminar = async (resena_id) => {
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
            const response = await axios.delete(`http://localhost:8000/resenas/${resena_id}`);
            
            if (response.status === 200) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
              obtenerResenas()
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

    useEffect(()=>{obtenerResenas()},[])

  return (
    <>
        <article className="contenedor-padre">
            <h2 style={{padding: '1rem', backgroundColor: '#343a40', color: 'white', border : '1px solid black', borderRadius : '10px'}}>Reseñas</h2>
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
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Reseña ID</td>
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Usuario</td>
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Username</td>
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Profesional</td>
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Fecha de la Cita</td>
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Comentario</td>
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Puntuacion</td>
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Fecha de la reseña</td>
                        <td  style={{backgroundColor: '#343a40', fontWeight : '700', textAlign: 'center', color: 'white'}}>Opcion</td>
                                        
                    </tr>
                </thead>
                <tbody>
                    {
                    !loading && resenas.length > 0 &&
                    resenas.map((resena, indx)=>
                        <tr key={indx}>
                            <td>{resena.reseña_id}</td>
                            <td>{resena.nombre_usuario}{resena.apellido_usuario}</td>
                            <td>{resena.username_usuario}</td>
                            <td>{resena.nombre_profesional}{resena.apellido_profesional}</td>
                            <td>{resena.fecha_cita}</td>
                            <td>{resena.comentario}</td>
                            <td>{resena.puntuacion}</td>
                            <td>{resena.fecha_reseña}</td>
                            <td>
                            
                                <div className='div-botones-editar'>
                                <Button variant =  'danger' onClick={()=> handleClickEliminar(resena.reseña_id)} style={{width : '100px'}}><img src={iconoBasura} width={'26px'} height={'26px'}/></Button>
                                </div>
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
