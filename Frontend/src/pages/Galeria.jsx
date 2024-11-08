import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { useEffect, useState } from 'react'

export const Galeria = () => {
    const[galerias,setGalerias] = useState([])

    const obtenerGalerias = async () =>{
        const response = await axios.get("http://localhost:8000/galeria")
        setGalerias(response.data)
    }

    const handleClickEditar = () =>{

    }

    const handleClickEliminar = () =>{}

    useEffect(()=> {obtenerGalerias()},[])
  return (
    <>
        <article className="contenedor-tabla-btn-h">
            <h2>Galeria</h2>
            <Table>
                <thead>
                    <tr>
                        <td>Img</td>
                        <td>Descripcion</td>
                        <td>Profesional</td>
                        <td>Fecha de subida</td>
                        <td>Opciones</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        galerias.map((galeria,index) => 
                            <tr key={index}>
                                <td><img src={galeria.url_imagen} alt="" width={'60px'} /></td>
                                <td>{galeria.descripcion}</td>
                                <td>{galeria.nombre} {galeria.apellido}</td>
                                <td>{galeria.fecha_subida}</td>
                                <td>
                                    <Button onClick={()=>{handleClickEditar()}}>Editar</Button>
                                    <Button onClick={()=>{handleClickEliminar()}}>Eliminar</Button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>

            <Button>Crear nueva imagen</Button>
            
        </article>
    </>
  )
}
