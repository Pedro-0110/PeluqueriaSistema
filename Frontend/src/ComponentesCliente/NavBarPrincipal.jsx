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

import iconoInstagram from '../IconsClientes/icono-instagram.png'
import iconoFacebook from '../IconsClientes/icono-facebook.png'
import iconoWhatsapp from '../IconsClientes/icono-whatsapp.png'
import iconoOjoAbierto from '../IconsClientes/icono-ojo-abierto.png'
import iconoOjoCancelado from '../IconsClientes/icono-ojo-cancelado.png'

import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';

import { StarFill, Star } from "react-bootstrap-icons";


export const NavBarPrincipal = () => {

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



  const[nombre_usuario, setNombre] = useState("");
  const[apellido_usuario, setApellido] = useState("");
  const[telefono_usuario, setTelefono] = useState("");


  const [passwordVisible, setPasswordVisible] = useState(false);

  const[loading, setLoading] = useState(false);

  const[mostrarPromociones, setMostrarPromociones] = useState(false);
  const[promociones, setPromociones] = useState([]);


  const obtenerPromociones = async () =>{
    const response = await axios.get(`http://localhost:8000/promociones/${profesional_id}`);
    setPromociones(response.data)
  }

  const verificarSiMostrarPromociones = async () =>{
    const response = await axios.get(`http://localhost:8000/configuracionGlobal`);
    setMostrarPromociones(response.data[0].mostrar_promociones)
    console.log(response.data[0].mostrar_promociones == true)
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleCloseSesion = () => setShowSesion(false);

  const handleNext = () => {
    //videos
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videosDelProfesional.length);
  };

  const handlePrev = () => {
    //videos
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === 0 ? videosDelProfesional.length - 1 : prevIndex - 1
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
    setLoading(true)
    const response = await axios.get("http://localhost:8000/profesionales/nombres")
    setProfesionales(response.data)
    setLoading(false)
  }


  const obtenerTinturasDelProfesional = async () =>{
    setLoading(true)
    const response = await axios.get(`http://localhost:8000/imagenes/tinturas/profesional/${profesional_id}`)
    setTinturas(response.data)
    setLoading(false)
  }

  const obtetenerCortesDelProfesional = async () =>{
    setLoading(true)
    const response = await axios.get(`http://localhost:8000/imagenes/cortes/profesional/${profesional_id}`)
    setCortes(response.data)
    setLoading(false)
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
      if(comentario != ""){
    const response = await axios.post(`http://localhost:8000/resenas/`,{
      usuario_id,
      profesional_id,
      comentario,
      puntuacion : rating
    })
    if(response.status === 201){
      Swal.fire({
        position: "top",
         icon: "success",
         title: "Muchas gracias ✌",
         showConfirmButton: false,
         timer: 1500
       });
    }
      obtenerCantidadReseñasUsuario()
      obtenerReseñasRealizadasAlProfesional()
      setComentario("")
    }else{
      Swal.fire({
        position: "top",
         icon: "info",
         title: "Ingresar un comentario",
         showConfirmButton: false,
         timer: 1500
       });
    }
      
  }else{
    setShowSesion(true)
  }
}

  const handleClickReservar = () =>{
    if(sesionIniciada){
      setDiaSeleccionado("")
      setHorariosDisponibles([])
      setNombreFechaSeleccionada("")
      setHorarioSeleccionado("")
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
    setLoading(true)
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
    setLoading(false)
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
    if(horarioSeleccionado!= ""){
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
         title: "Reservado! 📅",
         showConfirmButton: false,
         timer: 3000
       });
      setDiaSeleccionado("")
      setHorariosDisponibles([])
      setNombreFechaSeleccionada("")
      setHorarioSeleccionado(""),
      setCheckedItems([])
      setShowReservar(false)
      obtenerCantidadDeCitasPendiendesDelCliente()
          }
  }else{
    alert("Seleccione un horario")
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
        setUserName("")
        setPasswordUsuario("")
        setShowSesion(false)
        Swal.fire({
          position: "top",
           icon: "success",
           title: `Bienvenido`,
           showConfirmButton: false,
           timer: 2000
         });
      }else{
        Swal.fire({
          position: "top",
           icon: "error",
           title: `Error, verifique bien los datos.`,
           showConfirmButton: false,
           timer: 2000
         })
      }
    }else{
      Swal.fire({
        position: "top",
         icon: "warning",
         title: `Llenar todos los campos!`,
         showConfirmButton: false,
         timer: 2000
       })
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
        setNombre("")
        setApellido("")
        setUserName("")
        setPasswordUsuario("")
        setTelefono("")
        setMostrarFormulariRegistrarme(false)
        Swal.fire({
          position: "top",
           icon: "success",
           title: `Usuario registrado!.`,
           showConfirmButton: false,
           timer: 2000
         })
    }
  }else{
    Swal.fire({
      position: "top",
       icon: "warning",
       title: `Llenar todos los campos!`,
       showConfirmButton: false,
       timer: 2000
     })
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
  
  useEffect(()=> {
      if(profesional_id){
        obtenerVideosDelProfesional()
        obtenerServiciosDelProfesional()
        obtenerHorariosDisponiblesDelProfesional()
        obtenerReseñasRealizadasAlProfesional()
        obtenerCantidadReseñasUsuario()
        obtenerDatosDelProfesional()
        obtenerTinturasDelProfesional()
        obtetenerCortesDelProfesional()
        obtenerPromociones()

      }
  },[profesional_id])

  useEffect(()=>{
      if(sesionIniciada == true){
        obtenerDatosDelUsuario()
        obtenerCantidadDeCitasPendiendesDelCliente()
        obtenerCantidadReseñasUsuario()
      }
  },[sesionIniciada])


  useEffect(()=>{obtenerProfesionales()},[])
  useEffect(()=>{verificarSiMostrarPromociones()},[])

  useEffect(()=>{obtenerHorariosReservados()},[diaSeleccionado])
  
  return (
    <>
      <div className='contenedor'>
        {loading ? 
        <div className="text-center">
        <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
        </div>
    </div> :
        <>
        <div className='contenedor-navbar'>
            <article className='logo-navbar'><img src={"https://scontent.ftuc1-2.fna.fbcdn.net/v/t39.30808-6/470223312_928030019424024_7163923516468459950_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=Qo00ZmzLB3EQ7kNvgEzAC62&_nc_oc=AdiLuMQ65oAFQEv2ScH5UEsSKk-3pbuUq03jQe-5t8-0mlw4syMWcSoqilMqw_gpO2A&_nc_zt=23&_nc_ht=scontent.ftuc1-2.fna&_nc_gid=AzKhBKdPT6NaGKx1AtIqPMH&oh=00_AYAofxhIFFFJyYFLdvD3yERHWun9ksP7S8BbskBsb3QlHA&oe=67947660"} alt="" />
            </article>
            <article className='perfiles'>
              <a href="http://localhost:5173/citas"><Image src="https://scontent.ftuc1-1.fna.fbcdn.net/v/t1.6435-9/50077696_2050762325017242_652053740081119232_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=4xVWNqEIW4EQ7kNvgE1VYfi&_nc_oc=Adh--vrID5y9hUuDBKzfkdaabjvvtVHI1lbLWzxH3MpGtMGk2zkzMLzwLCc7d8EAqGw&_nc_zt=23&_nc_ht=scontent.ftuc1-1.fna&_nc_gid=AiIAOiBcXnZDEBnfq9KyxSI&oh=00_AYDWjFl_kuEpUZXdewOn8AlNwnRe_bYQAxcgl8HH7Juyew&oe=67BB8E3A" width={'100px'} height={'90px'} rounded onClick={()=> Swal.fire({
          position: "top",
           title: `Bienvenido jefe!`,
           showConfirmButton: false,
           timer: 3000
         })}/></a> 
              
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
            }}>Seleccionar un profesional  ⬇</h2>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }} className='profesionales'>
              {profesionales.map((profesional) => (
              <div key={profesional.profesional_id} onClick={() => {handleSelect(profesional.profesional_id)}}
                style={{
                border: selectedImage === profesional.profesional_id ? "4px solid #9fdb2e" : "3px solid transparent",
                cursor: "pointer",
                height: '30rem',
                borderRadius : '8px'
                }}>

                <Card style={{ width: '14rem', height : '30rem'}} border= "secondary" bg={'dark'} text="white">
                  <Card.Img variant="top" src={profesional.imagen_profesional} width={'40px'} height={'180px'} />
                  <Card.Body>
                    <Card.Title style={{fontWeight : 'bold', color: '#9fdb2e'}}>{profesional.nombre_profesional} {profesional.apellido_profesional}</Card.Title>
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
        {mostrarPromociones ? 
        <article className='contenedor-descuentos'>
          <h2>Promociones</h2>
          <Carousel>
            {promociones.map((promo)=>
              <Carousel.Item interval={5000}>
              <article className='carrusel-imagen'>
                <Image width={'700px'} height={'350px'} src={promo.url_promocion}></Image>
                <Image width={'700px'} height={'350px'} src={promo.url_promocion}></Image>
              </article>
            </Carousel.Item>
            )}
          </Carousel>
        </article>
        :<></>}


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
                src={videosDelProfesional.length > 0 ? videosDelProfesional[currentVideoIndex].url_video : undefined}
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
          <ListGroup as="ul" variant="">
  {reseñasProfesional.map((reseña, index) => (
    <ListGroup.Item key={index} action variant="dark">
      <Image
        src={`https://robohash.org/${index}`}
        roundedCircle
        width={'30px'}
        height={'30px'}
        style={{ marginRight: '0.5rem' }}
      />
      <b>
        {reseña.nombre_usuario} {reseña.apellido_usuario}
      </b>
      : {reseña.comentario} <br />
      Puntuación:
      <span style={{ marginLeft: '0.5rem' }}>
        {Array.from({ length: 5 }, (_, i) => 
          i < reseña.puntuacion ? (
            <StarFill key={i} color="gold" />
          ) : (
            <Star key={i} color="gray" />
          )
        )}
      </span>
      <br />
      {new Date(reseña.fecha_reseña).toLocaleDateString('es-AR', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
      })}
    </ListGroup.Item>
  ))}
</ListGroup>;
          </article>
        </article>
        </>
        }
       
      
          {sesionIniciada ? 
            cantidadReseñasUsuario < 1 ?
            <article className='form-reseña'>
              <article className='datos-usuario-reseña'>
                <img src={`https://robohash.org/${usuario_id}`} alt="" width={'150px'}/>
                <h3>{datosUsuario.nombre_usuario} {datosUsuario.apellido_usuario}</h3>
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
          <Button variant = 'warning' style={{marginTop: '4rem', display : 'block', marginLeft : 'auto', marginRight : 'auto'}} onClick={()=> setShowSesion(true)}>Realizar un comentario</Button>
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
              <a href="https://www.facebook.com/profile.php?id=100066511033982" target="_blank"><img src={iconoFacebook} alt=""/></a>
              <a href="https://wa.me/543813464225?text=¡Hola!%20Estoy%20interesado%20en%20los%20servicios%20de%20la%20peluquería.%20Me%20gustaría%20hacer%20una%20cita." target="_blank"><img src={iconoWhatsapp} alt="" /></a>
              <a href="https://www.instagram.com/n.nbarber/?fbclid=IwY2xjawH7p0lleHRuA2FlbQIxMAABHWgvlSVRmYFECBT7BDNZQcn-hf4ss-0LQSDh7beg6eNEjpAytzjCh9BrEw_aem_E_svTUUwgZJh_zNtk9jF0g#" target="_blank"><img src={iconoInstagram} alt="" /></a>
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
                    onChange={(e) => {setDiaSeleccionado(e.target.value),setHorarioSeleccionado("")}}
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
              <h2> No es posible realizar una nueva reserva hasta que el peluquero haya confirmado o cancelado la anterior 🔒</h2>}
          </Modal.Body>
      </Modal>
    </div>

    <div role="dialog" aria-modal="true" className="fade modal" tabIndex="-1" style={{display: 'block'}} inert = "true">
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
                  <Form.Control type={passwordVisible ? 'text' : 'password'} placeholder='ingrese su contraseña' value={password_usuario} onChange={(e)=> setPasswordUsuario(e.target.value)}/>
                  <Button className='btn-mostrar-contraseña'
            variant="outline-secondary"
            onClick={togglePasswordVisibility}
          >
             <img src={passwordVisible ? iconoOjoAbierto : iconoOjoCancelado} alt="" width={'20px'}/>
          </Button>
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
                  <Form.Control type="number" step="1" placeholder='ingrese su numero' value={telefono_usuario} onChange={(e)=> setTelefono(e.target.value)}/>
                  <Form.Label >Nombre de usuario</Form.Label>
                  <Form.Control placeholder='ingrese su username' value={username_usuario} onChange={(e)=> setUserName(e.target.value)}/>
                  <Form.Label >Contraseña</Form.Label>
                  <Form.Control type={passwordVisible ? 'text' : 'password'} placeholder='ingrese su contraseña' value={password_usuario} onChange={(e)=> setPasswordUsuario(e.target.value)}/>
                  <Button className='btn-mostrar-contraseña'
            variant="outline-secondary"
            onClick={togglePasswordVisibility}
          >
           <img src={passwordVisible ? iconoOjoAbierto : iconoOjoCancelado} alt="" width={'20px'}/>
          </Button>
                  <div className='boton-iniciar-sesion'>
                  <Button variant='success' onClick={()=> handleClickRegistrarUsuario()}>Registrar</Button>
                  </div>
                  <Form.Label style={{width: '100%', backgroundColor: '#fca50f', color: 'black', padding: '5px', borderRadius: '25px', textAlign : 'center', marginTop : '1rem',fontWeight: 'bolder'}}> Registrandose usted podra realizar reservas y comentarios!</Form.Label>
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
        
      </div>
    </>
  )
  }



