import { useEffect, useRef, useState } from 'react'

import Button from 'react-bootstrap/esm/Button'
import Card from 'react-bootstrap/Card';
import axios from 'axios'
import Form from 'react-bootstrap/Form';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image'
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';

import Swal from 'sweetalert2';

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
  const [selectedImage, setSelectedImage] = useState(1);
  const [comentario, setComentario] = useState("")
  const [usuario_id,setUsuarioID] = useState("")
  const [sesionIniciada, setSecicioIniciada] = useState(false);
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
  const [cantidadReseñasUsuario, setCantidadReseñasUsuario] = useState(1)
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [cantidadCitasPendientes, setCantidadCitasPendientes] = useState([])
  const [videosDelProfesional, setVideosDelProfesional] = useState([])
  const [mostrarFormularioRegistrarme, setMostrarFormulariRegistrarme] = useState(false)

  const [showSesion, setShowSesion] = useState(false);
  const [username_usuario, setUserName] = useState("");
  const [password_usuario, setPasswordUsuario] = useState("")
  const [sesionValida,setSesionValida] = useState("")


  const[nombre_usuario, setNombre] = useState("");
  const[apellido_usuario, setApellido] = useState("");
  const[telefono_usuario, setTelefono] = useState("");



  const handleCloseSesion = () => setShowSesion(false);
  const handleShowSesion = () => setShowSesion(true);

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
    if(sesionIniciada){
    const response = await axios.post(`http://localhost:8000/resenas/`,{
      usuario_id,
      profesional_id,
      comentario,
      puntuacion : rating
    })
    if(response.status === 201)
      Swal.fire({
        position: "top",
         icon: "success",
         title: "Muchas gracias! 😎",
         showConfirmButton: false,
         timer: 1500
       });
      obtenerCantidadReseñasUsuario()
      obtenerReseñasRealizadasAlProfesional()
      setComentario("")
  }else{
    setShowSesion(true)
  }
}

  const handleClickReservar = () =>{
    if(sesionIniciada){
      setDiaSeleccionado("")
      setHorariosDisponibles([])
      setNombreFechaSeleccionada("")
      setHorarioSeleccionado(""),
      setDatosUsuario([])
      setCheckedItems([])
      obtenerDatosDelUsuario()
      setShowReservar(true)
    }else{
      setShowSesion(true)
    }
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
      fechaSeleccionada.setDate(fechaSeleccionada.getDate() + 1); // Corrige el cálculo del día
      const nombreFechaSeleccionada = fechaSeleccionada.toLocaleDateString("es-AR", {
        weekday: "long",
      });

      setNombreFechaSeleccionada(nombreFechaSeleccionada)
  
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
      Swal.fire({
        position: "top",
         icon: "success",
         title: "Cita confirmada! 👍",
         showConfirmButton: false,
         timer: 3000
       });
      setDiaSeleccionado("")
      setHorariosDisponibles([])
      setNombreFechaSeleccionada("")
      setHorarioSeleccionado(""),
      setDatosUsuario([])
      setCheckedItems([])
      setShowReservar(false)
      obtenerCantidadDeCitasPendiendesDelCliente()
          }
  }

  const obtenerCantidadReseñasUsuario = async () =>{
    const response = await axios.get(`http://localhost:8000/resenas/profesional/${profesional_id}/usuario/${usuario_id}`)
    setCantidadReseñasUsuario(response.data[0].cantidadReseñas)
    console.log(response.data[0].cantidadReseñas)
  } 

  const obtenerCantidadDeCitasPendiendesDelCliente = async () =>{
    const response = await axios.get(`http://localhost:8000/citas/pendientes/usuario/${usuario_id}`)
    setCantidadCitasPendientes(response.data[0].cantidadCitasPendientes)
  }

  const obtenerVideosDelProfesional = async () =>{
    const response = await axios.get(`http://localhost:8000/videos/profesional/${profesional_id}`)
    setVideosDelProfesional(response.data)
  }

  const handleIniciarSesion = async() =>{
    if(username_usuario != "" && password_usuario != ""){
      const response = await axios.post(`http://localhost:8000/usuarios/sesion/`,{
        username_usuario,
        password_usuario
      })
      if(response.data[0].valor === 1){
        setSecicioIniciada(true)
        setUsuarioID(response.data[0].usuario_id)
        console.log(usuario_id)
        setUserName("")
        setPasswordUsuario("")
        setShowSesion(false)
        obtenerDatosDelUsuario();
        Swal.fire({
          position: "top",
           icon: "success",
           title: `Bienvenido/a ${datosUsuario.nombre_usuario}! 👍`,
           showConfirmButton: false,
           timer: 2000
         });
      }
    }
  }

  const handleClickRegistrarUsuario = async () =>{
    if(nombre_usuario != "" && apellido_usuario != "" && telefono_usuario != "" && username_usuario != "" && password_usuario != ""){
      const response = await axios.post(`http://localhost:8000/usuarios/`,{
        nombre_usuario,
        apellido_usuario,
        telefono_usuario,
        username_usuario,
        password_usuario,
        rol_id : 2
      })
      if(response.status === 201){
        alert("Usuario creado!")
      }
    }else{
      alert("Llenar todos los campos!")
    }
  }

  const handleClickCerrarSesion = () =>{
    Swal.fire({
      position: "top",
       icon: "success",
       title: "Sesion cerrada!",
       showConfirmButton: false,
       timer: 1500
     });
    setSecicioIniciada(false)
  }

  useEffect(()=> {obtenerServiciosDelProfesional()},[])

  useEffect(()=>{obtenerVideosDelProfesional()},[profesional_id])
  
  useEffect(()=> {obtenerServiciosDelProfesional()},[profesional_id])

 
  useEffect(()=> {obtenerHorariosDisponiblesDelProfesional()},[profesional_id])
  useEffect(()=> {obtenerReseñasRealizadasAlProfesional()},[profesional_id])
  useEffect(()=> {obtenerDatosDelProfesional()},[showReservar])
  useEffect(()=> {obtenerDatosDelProfesional()},[])
  useEffect(()=> {obtenerTinturasDelProfesional()},[profesional_id])
  useEffect(()=> {obtetenerCortesDelProfesional()},[profesional_id])
  useEffect(()=>{obtenerProfesionales()},[])
  useEffect(()=>{obtenerHorariosReservados()},[diaSeleccionado])
  useEffect(()=> {obtenerCantidadReseñasUsuario()},[sesionIniciada])
  useEffect(()=> {obtenerCantidadReseñasUsuario()},[profesional_id])
  useEffect(()=>{obtenerDatosDelUsuario()},[sesionIniciada])
  useEffect(()=> {obtenerReseñasRealizadasAlProfesional()},[usuario_id])
  useEffect(()=> {obtenerCantidadDeCitasPendiendesDelCliente()},[usuario_id])




  return (
    <>
      <div className='contenedor'>
        <div className='contenedor-navbar'>
            <article className='logo-navbar'><img src={iconoLogo} alt="" />
            </article>
            <article className='contenedor-botones-navbar'>
              <a href='#profesionales'>Profesionales</a>
              <a href='#trabajos'>Trabajos</a>
              <a href='#reseñas'>Reseñas</a>
              <a href='#contacto'>Contacto</a>
              {sesionIniciada ? <a id='btn-cerrar-sesion' onClick={()=>{handleClickCerrarSesion()}}>Cerrar sesion</a> : <></>}
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
                border: selectedImage === profesional.profesional_id ? "4px solid white" : "3px solid transparent",
                cursor: "pointer",
                height: '30rem',
                borderRadius : '8px'
                }}>

                <Card style={{ width: '14rem', height : '30rem'}} border= "secondary" bg={'dark'} text="white">
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
           <Button variant='dark' onClick={() => handleClickReservar()}>Reservar un turno</Button>
          </div>
          
        </article>
        
        <article className='contenedor-descuentos'>
          <h2>Promociones</h2>
          <Carousel>
            <Carousel.Item interval={5000}>
              <article className='carrusel-imagen'>
                <Image width={'700px'} height={'350px'} src='https://d1csarkz8obe9u.cloudfront.net/posterpreviews/barber-shop-deals-sale-promotion-video-beard-design-template-c2ebc685bc96e9e8df9af176e65ddb29_screen.jpg?ts=1624746047'></Image>
                <Image width={'700px'} height={'350px'} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5GZcTPT1oCFab7pgek03Csmo3eRu568Q5lg&s'></Image>
              </article>
            </Carousel.Item>
            <Carousel.Item interval={5000}>
              <article className='carrusel-imagen'>
                <Image width={'700px'} height={'350px'} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO3LHUm1kvPM-Q3A4YkddHyb7CIJCIBLSJlw&s'></Image>
                <Image width={'700px'} height={'350px'} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIkJP4xiTCif7pBFaRrXQsvkUKneDEqtFedA&s'></Image>
              </article>
            </Carousel.Item>
            <Carousel.Item interval={5000}>
              <article className='carrusel-imagen'>
                <Image width={'700px'} height={'350px'} src='https://www.shutterstock.com/image-vector/vector-business-card-price-list-600nw-2096098918.jpg'></Image>
                <Image width={'700px'} height={'350px'} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvGAjxH_rW2h35bKw0LmH7ET3wHtxWUaUkxg&s'></Image>
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
                  <Button variant = 'dark' onClick={handlePrev}>&lt;
                  </Button>
                  <Button variant = 'dark' onClick={handleNext}>&gt;
                  </Button>
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
                <Image src= {`https://robohash.org/${index}`} roundedCircle width={'30px'} height={'30px'} style={{marginRight: '0.5rem'}}/>
                <b>{reseña.nombre_usuario} {reseña.apellido_usuario}</b> : {reseña.comentario} <br /> Puntuacion: {reseña.puntuacion} <br /> {new Date(reseña.fecha_reseña).getDay()}/{new Date(reseña.fecha_reseña).getMonth()}/{new Date(reseña.fecha_reseña).getFullYear()} 
              </ListGroup.Item>   
              )}
            </ListGroup> 
          </article>
        </article>

       
      
          {sesionIniciada ? 
            cantidadReseñasUsuario < 1 ?
            <article className='form-reseña'>
              <article className='datos-usuario-reseña'>
                <img src={`https://robohash.org/${usuario_id}`} alt="" width={'150px'}/>
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
              <Button style={{width : '18rem'}} variant='success' onClick={()=> handleClickComentar()}>{'Comentar'}</Button>
          </article>
        : <></>
        :
        <Button onClick={()=> setShowSesion(true)}>Realizar un comentario</Button>
        }
      
   
    
            
      
      
         
      
       
         
      

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
                    // En caso de seleccionar una fecha  nueva limpiamos el horario en caso de que sea un horario reservado de otro dia
                    onChange={(e) => {setDiaSeleccionado(e.target.value), setHorarioSeleccionado("")}}
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
                <article className='reserva-profesional'>
                <h2>Preparando turno con: </h2>
                    {showReservar 
                    ? 
                    <div className='imagen-profesional-reserva'>
                      <Image roundedCircle width={'100px'} src= {datosProfesional[0].imagen_profesional}/>
                    </div>
                    : 
                      <></>}
                {/* </article> */}

                {/* <article className='nombre-profesional'> */}
                  {showReservar 
                  ? 
                    <h4>{datosProfesional[0].nombre_profesional} {datosProfesional[0].apellido_profesional}</h4> 
                  : 
                    <></>}
                </article>

                {diaSeleccionado 
                ?
                  <>
                    <h3>Datos</h3>
                    <ul>
                      <li><b>Cliente :</b> {datosUsuario.nombre_usuario} {datosUsuario.apellido_usuario}</li>
                      <li><b>Telefono :</b> {datosUsuario.telefono_usuario}</li>
                      <li><b>Fecha: </b> {nombreFechaSeleccionada} {diaSeleccionado}</li>
                      <li><b>Horario :</b> {horarioSeleccionado}</li>
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


    <Modal show={showSesion} onHide={handleCloseSesion}>
        <Modal.Header closeButton>
          <Modal.Title>{!mostrarFormularioRegistrarme ? 'Inicio de sesion' : 'Creacion de cuenta'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form> 
                  {!mostrarFormularioRegistrarme ?
                  <>
                  <Form.Label>Nombre de usuario</Form.Label>
                  <Form.Control placeholder='ingrese su nombre de usuario' value={username_usuario} onChange = {(e)=> setUserName(e.target.value)}/>
                  <Form.Label >Contraseña</Form.Label>
                  <Form.Control placeholder='ingrese su contraseña' value={password_usuario} onChange={(e)=> setPasswordUsuario(e.target.value)}/>
                  <div className='boton-iniciar-sesion'>
                  <Button onClick={()=> handleIniciarSesion()}>Iniciar</Button>
                  </div>
                  </>
                  :
                  <>
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control placeholder='ingrese su nombre ' value={nombre_usuario} onChange = {(e)=> setNombre(e.target.value)}/>
                  <Form.Label >Apellido</Form.Label>
                  <Form.Control placeholder='ingrese su apellido' value={apellido_usuario} onChange={(e)=> setApellido(e.target.value)}/>
                  <Form.Label >Telefono</Form.Label>
                  <Form.Control placeholder='ingrese su numero' value={telefono_usuario} onChange={(e)=> setTelefono(e.target.value)}/>
                  <Form.Label >Nombre de usuario</Form.Label>
                  <Form.Control placeholder='ingrese su username' value={username_usuario} onChange={(e)=> setUserName(e.target.value)}/>
                  <Form.Label >Contraseña</Form.Label>
                  <Form.Control placeholder='ingrese su contraseña' value={password_usuario} onChange={(e)=> setPasswordUsuario(e.target.value)}/>
                  <div className='boton-iniciar-sesion'>
                  <Button variant='success' onClick={()=> handleClickRegistrarUsuario()}>Registrar</Button>
                  </div>
                  <Form.Label style={{width: '100%', backgroundColor: '#fca50f', color: 'black', padding: '5px', borderRadius: '25px', textAlign : 'center', marginTop : '1rem',fontWeight: 'bolder'}}> Con esto usted podra realizar reservas y comentarios!</Form.Label>
                  </>
                  }
          </Form>
        </Modal.Body>
        <Modal.Footer>
        {!mostrarFormularioRegistrarme ? 
        <Button variant="warning" onClick={()=> setMostrarFormulariRegistrarme(true)}>
            Registrarme
          </Button>
        :
        <Button variant="secondary" onClick={()=> setMostrarFormulariRegistrarme(false)}>
            Regresar
          </Button>
          }
        </Modal.Footer>
      </Modal>
    </>
  )
}



