import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'

import axios from 'axios'
import {useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import iconoBasura from '../Icons/icono-basura.png'
import { NavbarAdministrador } from '../pages/NavbarAdministrador';

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
          customClass: {
            confirmButton: "custom-confirm-btn",
            cancelButton: "custom-cancel-btn"
          }
        });
      
        if (confirmacion.isConfirmed) {
          try {
            const response = await axios.delete(`http://localhost:8000/resenas/${resena_id}`);
            
            if (response.status === 200) {
              Swal.fire({
                                                              position: "top",
                                                               icon: "success",
                                                               title: "Eliminado!",
                                                               showConfirmButton: false,
                                                               timer: 1000
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
    <NavbarAdministrador/>
      <article className="contenedor-padre">
          <h2>Reseñas</h2>
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
                              <td>{resena.nombre_usuario} {resena.apellido_usuario}</td>
                              <td>{resena.comentario}</td>
                              <td>{resena.puntuacion}</td>
                              <td>{new Date(resena.fecha_reseña).toLocaleDateString('es-AR', { year: '2-digit', month: '2-digit', day: '2-digit' })} {new Date(resena.fecha_reseña).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false })}</td>
                              <td>{resena.nombre_profesional}{resena.apellido_profesional}</td>
                              <td>
                                  <div className='div-botones-editar-reseñas'>
                                    <Button variant =  'danger' onClick={()=> handleClickEliminar(resena.reseña_id)}><img src={iconoBasura}/></Button>
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
