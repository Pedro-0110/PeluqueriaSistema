import { useEffect, useState } from 'react'

import Button from 'react-bootstrap/esm/Button'
import Card from 'react-bootstrap/Card';
import axios from 'axios'
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image'
import ListGroup from 'react-bootstrap/ListGroup';

import { Footer } from './Footer';


export const NavBarPrincipal = () => {

  const [profesionales, setProfesionales] = useState([])
  const [galeriaProfesional, setGaleriaProfesional] = useState([])
  const [profesional_id, setProfesionaID] = useState(1)
  const [reseñasProfesional, setReseñasProfesional] = useState([])
  const [horariosProfesional, setHorariosProfesional] = useState([])
  const [serviciosProfesional, setServiciosProfesional] = useState([])
  const [selectedImage, setSelectedImage] = useState(null);
  
  const obtenerProfesionales = async () =>{
    const response = await axios.get("http://localhost:8000/profesionales/nombres")
    setProfesionales(response.data)
  }

  const obtenerGaleriaProfesional = async () =>{
    const response = await axios.get(`http://localhost:8000/galeria/profesional/${profesional_id}`)
    setGaleriaProfesional(response.data)
  }

  const obtenerReseñasRealizadasAlProfesional = async () =>{
    const response = await axios.get(`http://localhost:8000/resenas/profesional/${profesional_id}`)
    setReseñasProfesional(response.data)

  }

  const obtenerHorariosDisponiblesDelProfesional = async () =>{
    const response = await axios.get(`http://localhost:8000/horariosDisponibles/profesional/${profesional_id}`)
    setHorariosProfesional(response.data)
  }

  const obtenerServiciosDelProfesional = async () =>{
    const response = await axios.get(`http://localhost:8000/servicios/profesional/${profesional_id}`)
    setServiciosProfesional(response.data)
  }


  const handleSelect = (id) => {
    setProfesionaID(id)
    setSelectedImage(id)
  };

  useEffect(()=> {obtenerServiciosDelProfesional()},[profesional_id])
  useEffect(()=> {obtenerHorariosDisponiblesDelProfesional()},[profesional_id])
  useEffect(()=> {obtenerReseñasRealizadasAlProfesional()},[profesional_id])
  useEffect(()=> {obtenerGaleriaProfesional()},[profesional_id])
  useEffect(()=>{obtenerProfesionales()},[])

  return (
    <>
        <div className='contenedor-navbar'>

            <article className='logo-navbar'><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgObbxF6h8I6AYpYaF0Yg-d6p9kYuIYh8omA&s" alt="" /></article>

            <article className='contenedor-botones-navbar'>
              <Button >Reservar turno</Button>
              <Button >Profesionales</Button>
              <Button >Servicios</Button>
              <Button >Trabajos</Button>
              <Button >Reseñas</Button>
              <Button >Contacto</Button>
            </article>

            <article className='contenedor-boton'>
              <Button>Cerrar secion</Button>
            </article>

        </div>

        <article id='profesionales' className='contenedor-profesionales'>
          <h2>Seleccionar un profesional</h2>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {profesionales.map((profesional) => (
              <div key={profesional.profesional_id} onClick={() => {handleSelect(profesional.profesional_id)}}
                style={{
                border: selectedImage === profesional.profesional_id ? "3px solid #0d6dfc" : "3px solid transparent",
                cursor: "pointer",
                height: '26rem',
                borderRadius : '8px'
                }}>

                <Card style={{ width: '12rem', height : '26rem'}} >
                  <Card.Img variant="top" src={profesional.imagen_profesional} width={'40px'} height={'180px'} />
                  <Card.Body>
                    <Card.Title>{profesional.nombre_profesional} {profesional.apellido_profesional}</Card.Title>
                    <Card.Text>
                      {profesional.descripcion_profesional}
                    </Card.Text>
                  </Card.Body>
                </Card>
             </div>
              ))}
          </div>

        </article>

        <article id='profesionales' className='contenedor-datos-profesional'>

          <div className="contenedor-profesional">
            {/* <Image src= {serviciosProfesional[0].imagen_profesional} roundedCircle width={'150px'} height={'150px'}/>
            <h3>{serviciosProfesional[0].nombre_profesional}</h3> */}
          </div>  

          <div className='contenedor-servicios'>
            <h2>Servicios</h2>
            <ListGroup>
              {serviciosProfesional.map((e,index)=>
                 <ListGroup.Item key={index} variant='primary'>{e.nombre_servicio}</ListGroup.Item>
              )}

            </ListGroup>
          </div>

          <div className='contenedor-horarios'>
            <h2>Horarios</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Lunes</th>
                  <th>Martes</th>
                  <th>Miércoles</th>
                  <th>Jueves</th>
                  <th>Viernes</th>
                  <th>Sábados</th>
                </tr>
              </thead>

              <tbody>
                {horariosProfesional.map((horario,indx) => (
                  <tr key={indx}> {/* Asegúrate de que cada `horario` tiene un campo `id` único */}
                    <td>{horario.dia_semana === 'Lunes' ? `${horario.hora_inicio} - ${horario.hora_fin}` : ''}</td>
                    <td>{horario.dia_semana === 'Martes' ? `${horario.hora_inicio} - ${horario.hora_fin}` : ''}</td>
                    <td>{horario.dia_semana === 'Miércoles' ? `${horario.hora_inicio} - ${horario.hora_fin}` : ''}</td>
                    <td>{horario.dia_semana === 'Jueves' ? `${horario.hora_inicio} - ${horario.hora_fin}` : ''}</td>
                    <td>{horario.dia_semana === 'Viernes' ? `${horario.hora_inicio} - ${horario.hora_fin}` : ''}</td>
                    <td>{horario.dia_semana === 'Sábado' ? `${horario.hora_inicio} - ${horario.hora_fin}` : ''}</td>
                  </tr>
                    ))}
              </tbody>
            </Table>
          </div>
        </article>


        <article className='contenedor-trabajos-realizados'>
          <h2>Trabajos realizados</h2>
          <article className='trabajos'>
            {galeriaProfesional.map((profesional, index) => 
            //   <Card style={{ width: '16rem' }} >
            //   <Card.Img variant="top" src={profesional.url_imagen} width={'40px'} height={'170px'} />
            //   <Image src="holder.js/171x180" thumbnail />
            //   <Card.Body style={{backgroundColor : ''}}>
            //     <Card.Title>{profesional.nombre_profesional} {profesional.apellido_profesional}</Card.Title>
            //     <Card.Text>
            //       {profesional.descripcion_profesional}
            //     </Card.Text>
            //   </Card.Body>
            // </Card>
            <Image key={index} src= {profesional.url_imagen} thumbnail width={'150px'} height={'200px'}/>
            )}
          </article>
        </article>

        <article className='contenedor-reseñas'>
          <h2>Comentarios</h2>
          <ListGroup as="ul"  variant="flush">
            {reseñasProfesional.map((reseña, index)=> 
              <ListGroup.Item key={index} action variant="light">
                <Image src="https://img.lovepik.com/png/20231020/Cartoon-turn-light-in-front-of-barber-shop-beauty-salon_283598_wh860.png" roundedCircle width={'30px'}/>
                {reseña.nombre_usuario} {reseña.apellido_usuario} : {reseña.comentario}
              </ListGroup.Item>   
            )}
          </ListGroup> 
        </article>

        <article className='contenedor-reseñas'>
          <Form.Control type="text" placeholder="Ingresar comentario.." />
          <Button  style={{width : '18rem'}} variant='success'>Subir</Button>  
        </article>
  
        <Footer/>
    </>
  
  )
}



