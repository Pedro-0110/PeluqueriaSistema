import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'

import axios from 'axios'
import {useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import iconoBasura from '../Icons/icono-basura.png'

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
            const response = await axios.delete(`http://localhost:8000/resenas/${resena_id}`);
            
            if (response.status === 200) {
              Swal.fire({
                title: "Registro eliminado!",
                text: "",
                icon: "success"
              });
              obtenerResenas()
            } else {
              Swal.fire({
                title: "Error!",
                text: "",
                icon: "",
              });
            }
          } catch (error) {
            console.error(error);
            Swal.fire({
              title: "Error!",
              text: "",
              icon: "",
            });
          }
        }
      };

    useEffect(()=>{obtenerResenas()},[])

  return (
    <>
      <article className="contenedor-padre">
          <h2 style={{padding: '1rem', backgroundColor: '#343a40', color: 'white', borderRadius : '10px'}}>Reseñas</h2>
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
                        <td>Usuario</td>
                        <td>Comentario</td>
                        <td>Puntuacion</td>
                        <td>Fecha de la reseña</td>
                        <td>Profesional</td>
                        <td>Opcion</td>
                                        
                      </tr>
                    </thead>
                    <tbody>
                      {!loading && resenas.length > 0 && resenas.map((resena, indx)=>
                          <tr key={indx}>
                              <td>{resena.nombre_usuario}{resena.apellido_usuario}</td>
                              <td>{resena.comentario}</td>
                              <td>{resena.puntuacion}</td>
                              <td>{resena.fecha_reseña}</td>
                              <td>{resena.nombre_profesional}{resena.apellido_profesional}</td>
                              <td>
                                  <div className='div-botones-editar'>
                                    <Button variant =  'danger' onClick={()=> handleClickEliminar(resena.reseña_id)} style={{width : '100px'}}><img src={iconoBasura} width={'26px'} height={'26px'}/></Button>
                                  </div>
                              </td>
                          </tr>
                      )}
                    </tbody>
                  </Table>
                </div>}
      </article>
    </>
  )
}
