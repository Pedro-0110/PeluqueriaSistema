import { useEffect, useRef, useState } from 'react'

import Button from 'react-bootstrap/esm/Button'
import Card from 'react-bootstrap/Card';
import axios from 'axios'
import Form from 'react-bootstrap/Form';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image'
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';

import iconoLogo from '../IconsClientes/logo-peluqueria.jpg'
import iconoInstagram from '../IconsClientes/icono-instagram.png'
import iconoFacebook from '../IconsClientes/icono-facebook.png'
import iconoWhatsapp from '../IconsClientes/icono-whatsapp.png'

import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';


export const NavBarPrincipal = () => {

  const videos = ["https://i.imgur.com/jAS5mGy.mp4","https://i.imgur.com/A9sEMPO.mp4", "https://i.imgur.com/cFGcKKN.mp4", "https://i.imgur.com/11b6epg.mp4", "https://i.imgur.com/QNReqme.mp4"]

  const videoRef = useRef(null);
  const carouselCortesRef = useRef(null);
  const carouselTinturasRef = useRef(null);
  const [profesionales, setProfesionales] = useState([])
  const [profesional_id, setProfesionaID] = useState(1)
  const [reseñasProfesional, setReseñasProfesional] = useState([])
  const [horariosProfesional, setHorariosProfesional] = useState([])
  const [serviciosProfesional, setServiciosProfesional] = useState([])
  const [selectedImage, setSelectedImage] = useState(null);
  const [comentario, setComentario] = useState("")
  const [usuario_id,setUsuarioID] = useState(4)
  const [cortes, setCortes] = useState([])
  const [tinturas,setTinturas] = useState([])
  const [showReservar, setShowReservar] = useState(false)
  const [diaSeleccionado, setDiaSeleccionado] = useState("")
  const [horariosDisponibles, setHorariosDisponibles] = useState([])
  const [horarioSeleccionado, setHorarioSeleccionado] = useState("")
  const [nombreFechaSeleccionada, setNombreFechaSeleccionada] = useState("");
  const [datosUsuario, setDatosUsuario] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [datosProfesional, setDatosProfesional] = useState([])
  const [cantidadReseñasUsuario, setCantidadReseñasUsuario] = useState("")
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [cantidadCitasPendientes, setCantidadCitasPendientes] = useState([])

  const handleNext = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const handlePrev = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === 0 ? videos.length - 1 : prevIndex - 1
    );
  };

  const handleVideoEnd = () => {
    handleNext();
  };

  const handleScrollCortes = (direction) => {
    const scrollAmount = 300; // Cantidad de desplazamiento en px
    if (carouselCortesRef.current) {
      if (direction === "left") {
        carouselCortesRef.current.scrollLeft -= scrollAmount;
      } else {
        carouselCortesRef.current.scrollLeft += scrollAmount;
      }
    }
  };

  const handleScrollTinturas = (direction) => {
    const scrollAmount = 300; // Cantidad de desplazamiento en px
    if (carouselTinturasRef.current) {
      if (direction === "left") {
        carouselTinturasRef.current.scrollLeft -= scrollAmount;
      } else {
        carouselTinturasRef.current.scrollLeft += scrollAmount;
      }
    }
  };
  
  const obtenerProfesionales = async () =>{
    const response = await axios.get("http://localhost:8000/profesionales/nombres")
    setProfesionales(response.data)
  }


  const obtenerTinturasDelProfesional = async () =>{
    const response = await axios.get(`http://localhost:8000/imagenes/tinturas/profesional/${profesional_id}`)
    setTinturas(response.data)
  }

  const obtetenerCortesDelProfesional = async () =>{
    const response = await axios.get(`http://localhost:8000/imagenes/cortes/profesional/${profesional_id}`)
    setCortes(response.data)
  }

  const obtenerReseñasRealizadasAlProfesional = async () =>{
    const response = await axios.get(`http://localhost:8000/resenas/profesional/${profesional_id}`)
    setReseñasProfesional(response.data)
  }

  const obtenerServiciosDelProfesional = async () =>{
    const response = await axios.get(`http://localhost:8000/servicios/profesional/${profesional_id}`)
    setServiciosProfesional(response.data)
  }

  const obtenerDatosDelUsuario = async () =>{
    const response = await axios.get(`http://localhost:8000/usuarios/${usuario_id}`)
    setDatosUsuario(response.data[0])
    console.log(datosUsuario)
  }  

  const obtenerDatosDelProfesional = async () =>{
    const response = await axios.get(`http://localhost:8000/profesionales/${profesional_id}`)
    setDatosProfesional(response.data)
  }

  const handleSelect = (id) => {
    setProfesionaID(id)
    setSelectedImage(id)
  };

  const handleClickComentar = async ()=> {
    const response = await axios.post(`http://localhost:8000/resenas/`,{
      usuario_id,
      profesional_id,
      comentario,
      puntuacion : rating
    })
    if(response.status === 201)
      obtenerCantidadReseñasUsuario()
      obtenerReseñasRealizadasAlProfesional()
  }

  const handleClickReservar = () =>{
    setShowReservar(true)
  }
  
  const handleCloseReservar = () =>{
    setShowReservar(false)
  }

  const obtenerHorariosDisponiblesDelProfesional = async () =>{
    const response = await axios.get(`http://localhost:8000/horariosDisponibles/profesional/${profesional_id}`)
    setHorariosProfesional(response.data)
  }

  
  const obtenerHorariosReservados = async () => {
    try {
      // Obtener citas pendientes
      const response = await axios.get(
        `http://localhost:8000/citas/pendientes/${diaSeleccionado}/profesional/${profesional_id}`
      );
      const horariosReservados = response.data;
  
      // Calcular el día seleccionado en texto
      let fechaSeleccionada = new Date(diaSeleccionado);
      // console.log(fechaSeleccionada + " formato date sin corregir")
      fechaSeleccionada.setDate(fechaSeleccionada.getDate() + 1); // Corrige el cálculo del día
      // console.log(fechaSeleccionada + " formato date corregido")
      const nombreFechaSeleccionada = fechaSeleccionada.toLocaleDateString("es-ES", {
        weekday: "long",
      });

      setNombreFechaSeleccionada(nombreFechaSeleccionada)
      // console.log(nombreFechaSeleccionada + " formato texto")
  
      // Obtener horarios disponibles
      const response1 = await axios.get(
        `http://localhost:8000/horariosDisponibles/dia/${nombreFechaSeleccionada}/profesional/${profesional_id}`
      );
      const horariosAtencionDiaX = response1.data;
  
      // Validar datos antes de continuar
      if (!horariosAtencionDiaX || horariosAtencionDiaX.length === 0) {
        console.error("Error del lado del administrador: No hay horarios disponibles.");
        return;
      }
  
      // Crear horarios disponibles
      const horariosMañana = [
        "06:00:00",
        "07:00:00",
        "08:00:00",
        "09:00:00",
        "10:00:00",
        "11:00:00",
        "12:00:00",
        "13:00:00",
      ];
      const horariosTarde = [
        "16:00:00",
        "17:00:00",
        "18:00:00",
        "19:00:00",
        "20:00:00",
        "21:00:00",
        "22:00:00",
        "23:00:00",
      ];
  
      let horariosDisponibles = [];
      let desde = horariosMañana.indexOf(horariosAtencionDiaX[0]?.hora_inicio || "");
      let hasta = horariosMañana.indexOf(horariosAtencionDiaX[0]?.hora_fin || "");
  
      if (desde !== -1 && hasta !== -1) {
        while (desde <= hasta) {
          const horarioActual = horariosMañana[desde];
          const estaReservado = horariosReservados.some(
            (reservado) => reservado.hora === horarioActual
          );
  
          if (!estaReservado) {
            horariosDisponibles.push(horarioActual);
          }
          desde++;
        }
      }

      desde = horariosTarde.indexOf(horariosAtencionDiaX[1]?.hora_inicio || "")
      hasta = horariosTarde.indexOf(horariosAtencionDiaX[1]?.hora_fin || "")

      if (desde !== -1 && hasta !== -1) {
        while (desde <= hasta) {
          const horarioActual = horariosTarde[desde];
          const estaReservado = horariosReservados.some(
            (reservado) => reservado.hora === horarioActual
          );
  
          if (!estaReservado) {
            horariosDisponibles.push(horarioActual);
          }
          desde++;
        }
      }
  
      console.log("Horarios disponibles:", horariosDisponibles);
      setHorariosDisponibles(horariosDisponibles)
    } catch (error) {
      console.error("Error al obtener los horarios:", error);
    }
  };

  const handleChangeRadio = (event) =>{
    setHorarioSeleccionado(event.target.value)
  }
  
  const handleChangeChecked = (event) => {
    const { value, checked } = event.target;
    setCheckedItems((prevState) =>
      checked
        ? [...prevState, value] // Agrega al arreglo si está marcado
        : prevState.filter((item) => item !== value) // Remueve si está desmarcado
    );
  };

  const realizarReserva = async() =>{
    const response = await axios.post(`http://localhost:8000/citas/`,{
      usuario_id,
      profesional_id,
      servicio_id : 1,
      fecha_cita : diaSeleccionado + " " + horarioSeleccionado,
      estado_cita : "Pendiente"
    })
    if(response.status == 201){
      alert("Cita creada")
      setDiaSeleccionado("")
      setHorariosDisponibles([])
      setNombreFechaSeleccionada("")
      setDiaSeleccionado("")
      setHorarioSeleccionado(""),
      setDatosUsuario([])
      setCheckedItems([])
          }
  }

  const obtenerCantidadReseñasUsuario = async () =>{
    const response = await axios.get(`http://localhost:8000/resenas/profesional/${profesional_id}/usuario/${usuario_id}`)
    setCantidadReseñasUsuario(response.data[0].cantidadReseñas)
  } 

  const obtenerCantidadDeCitasPendiendesDelCliente = async () =>{
    const response = await axios.get(`http://localhost:8000/citas/pendientes/usuario/${usuario_id}`)
    setCantidadCitasPendientes(response.data[0].cantidadCitasPendientes)
  }

  useEffect(()=> {obtenerServiciosDelProfesional()},[])
  useEffect(()=> {obtenerDatosDelUsuario()},[])
  useEffect(()=> {obtenerHorariosDisponiblesDelProfesional()},[profesional_id])
  useEffect(()=> {obtenerReseñasRealizadasAlProfesional()},[profesional_id])
  useEffect(()=> {obtenerDatosDelProfesional()},[showReservar])
  useEffect(()=> {obtenerDatosDelProfesional()},[])
  useEffect(()=> {obtenerTinturasDelProfesional()},[profesional_id])
  useEffect(()=> {obtetenerCortesDelProfesional()},[profesional_id])
  useEffect(()=>{obtenerProfesionales()},[])
  useEffect(()=>{obtenerHorariosReservados()},[diaSeleccionado])
  useEffect(()=> {obtenerCantidadReseñasUsuario()},[])
  useEffect(()=> {obtenerCantidadReseñasUsuario()},[profesional_id])
  useEffect(()=> {obtenerCantidadDeCitasPendiendesDelCliente()},[])



  return (
    <>
      <div className='contenedor'>
        <div className='contenedor-navbar'>
            <article className='logo-navbar'><img src={iconoLogo} alt="" /></article>
            <article className='contenedor-botones-navbar'>
              <a style={{backgroundColor: 'rgb(0, 153, 255)', color : 'white'}} href='#profesionales' >Profesionales</a>
              <a style={{backgroundColor: 'rgb(0, 153, 255)', color : 'white'}} href='#trabajos' >Trabajos</a>
              <a style={{backgroundColor: 'rgb(0, 153, 255)', color : 'white'}} href='#reseñas'>Reseñas</a>
              <a style={{backgroundColor: 'rgb(0, 153, 255)', color : 'white'}} href='#contacto'>Contacto</a>
            </article>
        </div>

        <article id='datos' className='contenedor-datos-profesional'>

          <article id='profesionales' className='contenedor-profesionales'>
            <h2 style={{backgroundColor: '#523042', color: 'white'
            }}>Seleccionar un profesional</h2>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }} className='profesionales'>
              {profesionales.map((profesional) => (
              <div key={profesional.profesional_id} onClick={() => {handleSelect(profesional.profesional_id)}}
                style={{
                border: selectedImage === profesional.profesional_id ? "4px solid #00f700" : "3px solid transparent",
                cursor: "pointer",
                height: '28rem',
                borderRadius : '8px'
                }}>

                <Card style={{ width: '14rem', height : '28rem'}} border= "secondary" bg={'dark'} text="white">
                  <Card.Img variant="top" src={profesional.imagen_profesional} width={'40px'} height={'180px'} />
                  <Card.Body>
                    <Card.Title>{profesional.nombre_profesional} {profesional.apellido_profesional}</Card.Title>
                    <Card.Text>
                      <em>{profesional.descripcion_profesional}</em>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              ))}
            </div>
          </article>

          <div className='contenedor-servicios'>
            <h2>Servicios</h2>
            <ListGroup>
              {serviciosProfesional.map((e,index)=>
                 <ListGroup.Item key={index} variant= 'dark'>{e.nombre_servicio}</ListGroup.Item>
              )}
            </ListGroup>
          </div>

          <div className='contenedor-horarios'>
            <h2>Horarios de atencion</h2>
            <article className='horarios'>
              <article className='dia'>
                <h3>Día</h3>
                <ListGroup>
                  {horariosProfesional.map((horario, index) => {
                  return horario.hora_inicio.includes('09') ? (
                  <ListGroupItem key={index} variant='dark'>
                    {`${horario.dia_semana} : ${horario.hora_inicio} - ${horario.hora_fin}`}
                  </ListGroupItem>
                    ) : null; // Usa null en lugar de una cadena vacía
                    })}
                </ListGroup>
              </article>

              <article className='tarde'>
                <h3>Tarde</h3>
                <ListGroup>
                  {horariosProfesional.map((horario, index) => {
                  return horario.hora_inicio.includes('17') ? (
                  <ListGroupItem key={index} variant='dark'>
                    {`${horario.dia_semana} : ${horario.hora_inicio} - ${horario.hora_fin}`}
                  </ListGroupItem>
                    ) : null; // Usa null en lugar de una cadena vacía
                    })}
                </ListGroup>
              </article>
            </article>
           <Button variant='warning' onClick={() => handleClickReservar()}>Reservar un turno</Button>
          </div>
          
        </article>
        
        <article className='contenedor-descuentos'>
          <h2>Promociones</h2>
          <Carousel>
            <Carousel.Item interval={5000}>
              <article className='carrusel-imagen'>
                <Image width={'700px'} height={'350px'} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVZl22u-Dalk81qD5IW4k2y4cI92coxEEqRQ&s'></Image>
                <Image width={'700px'} height={'350px'} src='https://i.pinimg.com/736x/05/0c/52/050c5242cfb7bd34c579655ae7f0e749.jpg'></Image>
              </article>
            </Carousel.Item>
            <Carousel.Item interval={5000}>
              <article className='carrusel-imagen'>
                <Image width={'700px'} height={'350px'} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVZl22u-Dalk81qD5IW4k2y4cI92coxEEqRQ&s'></Image>
                <Image width={'700px'} height={'350px'} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIkJP4xiTCif7pBFaRrXQsvkUKneDEqtFedA&s'></Image>
              </article>
            </Carousel.Item>
            <Carousel.Item interval={5000}>
              <article className='carrusel-imagen'>
                <Image width={'700px'} height={'350px'} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVZl22u-Dalk81qD5IW4k2y4cI92coxEEqRQ&s'></Image>
                <Image width={'700px'} height={'350px'} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIkJP4xiTCif7pBFaRrXQsvkUKneDEqtFedA&s'></Image>
              </article>
            </Carousel.Item>
          </Carousel>
        </article>


        <article className='contenedor-trabajos-realizados' id='trabajos'>
          <article className='imagenes'>
            <h2>Trabajos realizados</h2>
            <h3>Cortes</h3>
            <div className="carousel-container">
              <button className="arrow left" onClick={() => handleScrollCortes("left")}>&#8249;</button>
              <div className="carousel" ref={carouselCortesRef}>
                {cortes.map((corte, index) => (
                  <div className="product-card" key={index}>
                    <img src={corte.url_imagen} alt={corte.descripcion} />
                      <div className="product-info">
                        <p className="product-name">{corte.descripcion}</p>
                        <p className="product-price">{corte.descripcion}</p>
                      </div>
                  </div>
                  ))}
              </div>
              <button className="arrow right" onClick={() => handleScrollCortes("right")}>&#8250;</button>
            </div>
            <h3>Tinturas</h3>
              <article className='tinturas'>
                <div className="carousel-container">
                  <button className="arrow left" onClick={() => handleScrollTinturas("left")}>&#8249;</button>
                  <div className="carousel" ref={carouselTinturasRef}>
                    {tinturas.map((tintura, index) => (
                    <div className="product-card" key={index}>
                      <img src={tintura.url_imagen} alt="" width={"300px"} height={"350px"}/>
                        <div className="product-info">
                          <p className="product-name">{tintura.descripcion}</p>
                          <p className="product-price">{tintura.descripcion}</p>
                        </div>
                    </div>
                      ))}
                  </div>
                  <button className="arrow right" onClick={() => handleScrollTinturas("right")}>&#8250;</button>
                </div>
              </article>
          </article>

          <article className='videos'>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <video
                ref={videoRef}
                src={videos[currentVideoIndex]}
                onEnded={handleVideoEnd}
                autoPlay
                muted
                controls={true} // Opcional para evitar los controles nativos
                style={{ width: "300px", height: "500px" }}
              ></video>
                <div className='botones-video' style={{ marginTop: "10px" }}>
                  <Button variant = 'dark' onClick={handlePrev}>&larr; Anterior</Button>
                  <Button variant = 'dark' onClick={handleNext}>Siguiente &rarr;</Button>
                </div>
            </div>
          </article>
        </article>
        
        <article className='contenedor-reseñas'>
          <h2>Reseñas</h2>
          <article className='reseñas' id='reseñas'>
            <ListGroup as="ul"  variant="">
              {reseñasProfesional.map((reseña, index)=> 
              <ListGroup.Item key={index} action variant="dark">
                <Image src="https://media.istockphoto.com/id/1289973223/es/foto/vista-de-primer-plano-en-la-cara-del-extraterrestre-ilustraci%C3%B3n-renderizada-en-3d.jpg?s=612x612&w=0&k=20&c=siicsi7vLVmm2KoR_eLYogeWv1Zqi4u0v-pgKP42qjY=" roundedCircle width={'30px'} height={'30px'} style={{marginRight: '0.5rem'}}/>
                <b>{reseña.nombre_usuario} {reseña.apellido_usuario}</b> : {reseña.comentario} <br /> Puntuacion: {reseña.puntuacion} <br /> {new Date(reseña.fecha_reseña).getDay()}/{new Date(reseña.fecha_reseña).getMonth()}/{new Date(reseña.fecha_reseña).getFullYear()} <hr />
              </ListGroup.Item>   
              )}
            </ListGroup> 
          </article>
        </article>

        {cantidadReseñasUsuario < 1 ? 
          <article className='form-reseña'>
            <article className='datos-usuario-reseña'>
              <img src="https://www.shutterstock.com/image-illustration/david-street-style-graphic-designtextile-600nw-2265632523.jpg" alt="" width={'150px'}/>
              <h3>{datosUsuario.nombre_usuario}{datosUsuario.apellido_usuario}</h3>
            </article>
            <div className="rating-container">
              <div className="stars">
                {[1, 2, 3, 4, 5].map((value) => (
                <span
                  key={value}
                  className={`star ${value <= (hover || rating) ? 'selected' : ''}`}
                  onClick={() => setRating(value)}
                  onMouseEnter={() => setHover(value)}
                  onMouseLeave={() => setHover(0)}
                  >
                  ★
                </span>
                  ))}
              </div>
            </div>
            <Form.Control type="text" placeholder="Ingresar comentario.." onChange={(e)=> setComentario(e.target.value)} value = {comentario} />
            <Button style={{width : '18rem'}} variant='success' onClick={()=> handleClickComentar()}>Subir</Button>  
          </article>
        : <></>}

        <article className='contenedor-redes' id='contacto'>
            <article className='ubicacion'>
              <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d8475.577981818704!2d-65.26683040196815!3d-26.727088598049765!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x942267b77a391251%3A0xb824688fa9f92f9b!2sUttinger%20348%2C%20T4103FVH%20Taf%C3%AD%20Viejo%2C%20Tucum%C3%A1n!5e0!3m2!1ses!2sar!4v1732835302050!5m2!1ses!2sar" 
                width="500" 
                height="350" 
                style={{ border: '1px solid black', borderRadius: '20px' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"></iframe>
            </article>
            <article className='redes'>
              <a href="https://www.facebook.com/nombredeusuario" target="_blank"><img src={iconoFacebook} alt=""/></a>
              <a href="https://wa.me/543813464225?text=¡Hola!%20Estoy%20interesado%20en%20los%20servicios%20de%20la%20peluquería.%20Me%20gustaría%20hacer%20una%20cita." target="_blank"><img src={iconoWhatsapp} alt="" /></a>
              <a href="https://www.instagram.com/nombredeusuario/" target="_blank"><img src={iconoInstagram} alt="" /></a>
            </article>
        </article>

        <Modal show={showReservar} onHide={handleCloseReservar} centered size='lg'>
          <Modal.Header closeButton>
            <Modal.Title>Reserva</Modal.Title>
          </Modal.Header>
          <Modal.Body>{cantidadCitasPendientes === 0 ? 
            <div className="reserva">
              <article className="campos-reserva">
                <h2>Seleccione una fecha</h2>
                  <Form.Control
                    value={diaSeleccionado}
                    onChange={(e) => setDiaSeleccionado(e.target.value)}
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                  />

                  {diaSeleccionado && (
                    <>
                      <h2>Horarios disponibles</h2>
                      <ul>
                        {horariosDisponibles.map((horario, index) => (
                          <li key={index}>
                            <Form.Check
                              type="radio"
                              name="horario" // Agrupa los radios para seleccionar solo uno
                              id={`horario-${index}`} // Identificador único
                              value={horario} // Valor del radio
                              checked={horarioSeleccionado === horario} // Comprueba si está seleccionado
                              onChange={handleChangeRadio} // Maneja el cambio de selección
                              label={horario}
                            />
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  {horarioSeleccionado && (
                    <>
                      <h2>Seleccione los servicios</h2>
                      {serviciosProfesional.map((servicio, index) => (
                        <Form.Check
                          key={index}
                          type="checkbox"
                          value={servicio.nombre_servicio}
                          checked={checkedItems.includes(servicio.nombre_servicio)}
                          onChange={handleChangeChecked}
                          id={`servicio-${index}`} // ID único para cada servicio
                          label={servicio.nombre_servicio}
                        />
                      ))}
                    </>
                  )}
              </article>

              <article className='datos-reserva'>
                <h2>Preparando turno con: </h2>
                  <article className='reserva-profesional'>
                    {showReservar 
                    ? 
                      <Image roundedCircle width={'100px'} src= {datosProfesional[0].imagen_profesional}/>
                    : 
                      <></>}
                </article>

                <article className='nombre-profesional'>
                  {showReservar 
                  ? 
                    <p>{datosProfesional[0].nombre_profesional} {datosProfesional[0].apellido_profesional}</p> 
                  : 
                    <></>}
                </article>

                {diaSeleccionado 
                ?
                  <>
                    <h3>Datos</h3>
                    <ul>
                      <li><b>Fecha: </b> {nombreFechaSeleccionada} {diaSeleccionado}</li>
                      <li><b>Horario :</b> {horarioSeleccionado}</li>
                      <li><b>Cliente :</b> {datosUsuario.nombre_usuario} {datosUsuario.apellido_usuario}</li>
                      <li><b>Telefono :</b> {datosUsuario.telefono_usuario}</li>
                      <li><b>Servicios :</b>
                        <ul>
                          {checkedItems.map((item, index)=>
                          <li key={index}>{item}</li>
                            )}
                        </ul>
                      </li>
                    </ul>
   
                    <Button size='' onClick={realizarReserva}>Confirmar</Button>
                  </>
                :
                  <></>}

              </article>
            </div>
            : 
              <h2>No es posible realizar una nueva reserva hasta que el peluquero haya confiramado o cancelado la anterior 🔐</h2>}
          </Modal.Body>
      </Modal>
    </div>
    </>
  )
}



