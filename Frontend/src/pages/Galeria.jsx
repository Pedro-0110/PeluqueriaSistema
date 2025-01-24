import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';

import axios from 'axios'
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react'

import iconoBasura from '../Icons/icono-basura.png'
import iconoLapiz from '../Icons/icono-lapiz.png'
import iconoVer from '../Icons/icono-ver.png'
import { NavbarAdministrados } from '../Components/NavbarAdministrados';


export const Galeria = () => {

    const[editar,setEditar] = useState(false)
    const[imagenes,setImagenes] = useState([])
    const[profesionales,setProfesionales] = useState([])
    const[loading, setLoading] = useState(false);
    const[imagen_id, setImagenID] = useState("")
    const[profesional_id, setProfesionalID] = useState("")
    const[url_imagen, setUrlImagen] = useState("")
    const[descripcion_imagen, setDescripcion] = useState("")
    const[showImagen, setShowImagen] = useState(false);
    const[imagen, setImagen] = useState("")
    const[show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleCloseImagen = () => setShowImagen(false)

    const obtenerImagenes = async () =>{
        setLoading(true)
        const response = await axios.get("http://localhost:8000/imagenes")
        setImagenes(response.data)
        setLoading(false)
    }

    const obtenerNombresYIdentificadoresDeProfesionales = async () =>{
        const response = await axios.get("http://localhost:8000/profesionales/nombres")
        setProfesionales(response.data)
    }

    const handleClickEditar = (imagen_id,profesional_id, url_imagen, descripcion_imagen) =>{
        setEditar(true)
        setImagenID(imagen_id)
        setProfesionalID(profesional_id)
        setUrlImagen(url_imagen)
        setDescripcion(descripcion_imagen)
    }

    const handleClickEliminar = async (imagen_id) => {
        const confirmacion = await Swal.fire({
          title: "Se eliminara el registro de forma permanene!",
          text: "",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, eliminar!",
        });
      
        if (confirmacion.isConfirmed) {
          try {
            const response = await axios.delete(`http://localhost:8000/imagenes/${imagen_id}`);

            if (response.status === 200) {
              Swal.fire({
                                                position: "top",
                                                 icon: "success",
                                                 title: "Eliminado!",
                                                 showConfirmButton: false,
                                                 timer: 1000
                                               });
              obtenerVideos()
            } else {
              Swal.fire({
                title: "Error!",
                text: "",
                icon: "error",
              });
            }
          } catch (error) {
            console.error(error);
            Swal.fire({
              title: "Error!",
              text: "",
              icon: "error",
            });
          }
        }
      };

    const handleClickActualizar = async () =>{
        if(verificarLlenadoDeCampos()){
            const response = await axios.put("http://localhost:8000/imagenes/" + imagen_id,{
                profesional_id,
                url_imagen,
                descripcion_imagen
            })

            if(response.status == 200){
                Swal.fire({
                    position: "top",
                     icon: "success",
                     title: "Actualizado!",
                     showConfirmButton: false,
                     timer: 1500
                   });
                limpiarCampos()
                setEditar(false)
                obtenerImagenes()
            }
        }else{
            Swal.fire("Llenar todos los campos!");
    }
}

    const handleClickCancelar = () =>{
        limpiarCampos()
        setEditar(false)
        setShow(false)
    }

    const handleClickCrear = () => setShow(true)
  
    const handleClickConfirmar = async () =>{
        if(verificarLlenadoDeCampos()){
        const response = await axios.post("http://localhost:8000/imagenes/",{
            profesional_id,
            url_imagen,
            descripcion_imagen
        })
        if(response.status == 201){
            limpiarCampos()
            setShow(false)

            Swal.fire({
               position: "top",
                icon: "success",
                title: "Nueva imagen guardada!",
                showConfirmButton: false,
                timer: 1500
              });
            obtenerImagenes()
        }
        }else{
            Swal.fire("Llenar todos los campos!");
        }
}


    const handleClickVerImagen= async (imagen_id) =>{
        setLoading(true)
        const response = await axios.get(`http://localhost:8000/imagenes/${imagen_id}`)
        if(response.status === 200){
            setImagen(response.data[0])
            setShowImagen(true)
        }
        setLoading(false)
    }

    const limpiarCampos = () => {
    setImagenID("")
    setProfesionalID("")
    setUrlImagen("")
    setDescripcion("")
    }

    const verificarLlenadoDeCampos = () =>{
        if(url_imagen != "" && descripcion_imagen != "" && profesional_id != ""){
            return true
        }
    }

    useEffect(()=> {obtenerImagenes()},[])
    useEffect(()=>{obtenerNombresYIdentificadoresDeProfesionales()},[])


    const[editarVideo,setEditarVideo] = useState(false)
    const[videos,setVideos] = useState([])
    const[video_id, setVideoID] = useState("")
    const[url_video, setUrlVideo] = useState("")
    const[descripcion_video, setDescripcionVideo] = useState("")
    const[showVideo, setShowVideo] = useState(false)
    const[video, setVideo] = useState("")
    const[showAgregarVideo, setShowAgregarVideo] = useState(false)

    const handleCloseVideo = () => setShowVideo(false)
    const handleCloseAgregarVideo= () => setShowVideo(false)
  

    const obtenerVideos = async () =>{
        setLoading(true)
        const response = await axios.get("http://localhost:8000/videos")
        setVideos(response.data)
        setLoading(false)
    }


    const handleClickEditarVideo = (video_id,profesional_id, url_video, descripcion_video) =>{
        setEditarVideo(true)
        setVideoID(video_id)
        setProfesionalID(profesional_id)
        setUrlVideo(url_video)
        setDescripcionVideo(descripcion_video)
    }

    const handleClickEliminarVideo = async (video_id) => {
        const confirmacion = await Swal.fire({
          title: "Se eliminara el registro de forma permanene!",
          text: "",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, eliminar!",
        });
      
        if (confirmacion.isConfirmed) {
          try {
            const response = await axios.delete(`http://localhost:8000/videos/${video_id}`);

            if (response.status === 200) {
              Swal.fire({
                                                position: "top",
                                                 icon: "success",
                                                 title: "Eliminado!",
                                                 showConfirmButton: false,
                                                 timer: 1000
                                               });
              obtenerImagenes()
            } else {
              Swal.fire({
                title: "Error!",
                text: "",
                icon: "error",
              });
            }
          } catch (error) {
            console.error(error);
            Swal.fire({
              title: "Error!",
              text: "",
              icon: "error",
            });
          }
        }
      };

    const handleClickActualizarVideo = async () =>{
        if(verificarLlenadoDeCamposVideos()){
            const response = await axios.put("http://localhost:8000/videos/" + video_id,{
                profesional_id,
                url_video,
                descripcion_video
            })

            if(response.status == 200){
                Swal.fire({
                    position: "top",
                     icon: "success",
                     title: "Actualizado!",
                     showConfirmButton: false,
                     timer: 1500
                   });
                limpiarCamposVideos()
                setEditarVideo(false)
                obtenerVideos()
            }
        }else{
            Swal.fire("Llenar todos los campos!");
    }
}

    const handleClickCancelarVideo = () =>{
        setEditarVideo(false)
        setShowAgregarVideo(false)
        limpiarCampos()
    }

    const handleClickCrearVideo = () => setShowAgregarVideo(true)
  
    const handleClickConfirmarVideo = async () =>{
        if(verificarLlenadoDeCamposVideos()){
        const response = await axios.post("http://localhost:8000/videos/",{
            profesional_id,
            url_video,
            descripcion_video
        })
        if(response.status == 201){
            limpiarCamposVideos()
            setShowVideo(false)
            setShowAgregarVideo(false)

            Swal.fire({
               position: "top",
                icon: "success",
                title: "Nuevo video guardado!",
                showConfirmButton: false,
                timer: 1500
              });
            obtenerVideos()
        }
        }else{
            Swal.fire("Llenar todos los campos!");
        }
}


    const limpiarCamposVideos = () => {
    setVideoID("")
    setProfesionalID("")
    setUrlVideo("")
    setDescripcionVideo("")
    }

    const verificarLlenadoDeCamposVideos = () =>{
        if(url_video != "" && descripcion_video != "" && profesional_id != ""){
            return true
        }
    }



    useEffect(()=> {obtenerVideos()},[])
    useEffect(()=>{obtenerNombresYIdentificadoresDeProfesionales()},[])

  return (
    <>
    <NavbarAdministrados/>
    <div className='contenedor-galeria'>
        <article className='contenedor-dos-columnas'>
        <article className='contenedor-padre'>
            <h2>Imagenes</h2>
                {loading 
                ?
                    <div className="text-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                    </div>
                :
                    <div className="contenedor-tabla-imagenes">
                            <Table striped bordered hover variant="dark" >
                                <thead >
                                    <tr>
                                        <td>Img</td>
                                        <td>Descripcion</td>
                                        <td>Profesional</td>
                                        <td>Fecha subida</td>
                                        <td>Opciones</td>
                                    </tr>
                                </thead>

                                <tbody>
                                    {!loading && imagenes.length > 0 && imagenes.map((imagen,index) => 
                                        <tr key={index}>
                                            <td><Image  src={imagen.url_imagen}  width={'200px'}/></td>
                                          
                                            <td>{imagen.descripcion_imagen}</td>
                                            <td>{imagen.nombre_profesional} {imagen.apellido_profesional}</td>
                                            <td>{new Date(imagen.fecha_subida_imagen).toLocaleDateString('es-AR', { year: '2-digit', month: '2-digit', day: '2-digit' })}</td>
                                            <td>
                                                <div className='div-botones-editar-galeria'>
                                                    <Button variant='info' id='botones-tabla-imagenes' onClick={()=>{handleClickVerImagen(imagen.imagen_id)}}><img src= {iconoVer} width={'22px'}/></Button>
                                                    <Button variant='warning' id='botones-tabla-imagenes' onClick={()=>{handleClickEditar(imagen.imagen_id, imagen.profesional_id, imagen.url_imagen, imagen.descripcion_imagen, imagen.fecha_subida_imagen)}}><img src= {iconoLapiz} width={'22px'}/></Button>
                                                    <Button variant='danger' id='botones-tabla-imagenes' onClick={()=>{handleClickEliminar(imagen.imagen_id)}}><img src= {iconoBasura} width={'22px'}/></Button>
                                                </div>
                                            </td>
                                        </tr>
                                            )
                                        }
                                </tbody>
                            </Table>
                    </div>
                        }
            <Button variant='primary' className='btn-crear-imagen' onClick={()=> handleClickCrear()}>Crear nueva imagen</Button> 
        </article>

        {editar 
            ? 
                <article className="contenedor-editar">
                    <h4>Datos a actualizar</h4>
                    <Form>
                        <Form.Group>
                            <Form.Label>URL imagen</Form.Label>
                            <Form.Control required onChange={(e)=> setUrlImagen(e.target.value)} value={url_imagen} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Descripcion</Form.Label>
                            <Form.Control onChange={(e)=> setDescripcion(e.target.value)} value={descripcion_imagen}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Profesional</Form.Label>
                            <Form.Select value={profesional_id} onChange={(e)=> setProfesionalID(e.target.value)}>
                                {profesionales.map((profesional, index)=>
                                <option key={index} value={profesional.profesional_id}>{profesional.nombre_profesional} {profesional.apellido_profesional}</option>
                                )}
                            </Form.Select>
                        </Form.Group>
                    </Form>

                    <div className='div-botones-editar'>
                        <Button style={{marginTop : '1rem'}} variant="success" onClick={()=>{handleClickActualizar()}}>Actualizar</Button>
                        <Button style={{marginTop : '1rem'}} variant = "secondary" onClick={handleClickCancelar}>Cancelar</Button>
                    </div>

                </article> 
            : 
                <></>}
                </article>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Nueva imagen</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>URL imagen</Form.Label>
                        <Form.Control type='url' onChange={(e)=> setUrlImagen(e.target.value)} value={url_imagen}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Descripcion</Form.Label>
                        <Form.Control onChange={(e)=> setDescripcion(e.target.value)} value={descripcion_imagen}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Profesional</Form.Label>
                        <Form.Select value={profesional_id} onChange={(e)=> setProfesionalID(e.target.value)}>
                            {profesionales.map((profesional, index)=>
                            <option key={index} value={profesional.profesional_id}>{profesional.nombre_profesional} {profesional.apellido_profesional}</option>
                            )}
                        </Form.Select>
                    </Form.Group>
                 </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button style={{display: 'block', width : '10vw', marginLeft : 'auto', marginRight : 'auto'}} variant = "success" onClick={handleClickConfirmar} >Confirmar</Button>
                <Button style={{display: 'block', width : '10vw', marginLeft : 'auto', marginRight : 'auto'}} variant="secondary" onClick={handleClickCancelar}>Cancelar</Button>
            </Modal.Footer>
        </Modal>


        <Modal className="modal-imagen" show={showImagen} onHide={handleCloseImagen}>
      <Modal.Header closeButton className="modal-header-custom">
        <Modal.Title className="modal-title-custom">
          {imagen.nombre_profesional} {imagen.apellido_profesional}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-custom">
        <div className="div-modal-imagen">
          <img src={imagen.url_imagen} alt="" />
        </div>
      </Modal.Body>
    </Modal>




    <div className='contenedor-dos-columnas'>
    <article className='contenedor-padre'>
            <h2 >Videos</h2>
                {loading 
                ?
                    <div className="text-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                    </div>
                :
                    <div className="contenedor-tabla-videos">
                            <Table striped bordered hover variant="dark" >
                                <thead >
                                    <tr>
                                        <td>Video</td>
                                        <td>Descripcion</td>
                                        <td>Profesional</td>
                                        <td>Fecha subida</td>
                                        <td>Opciones</td>
                                    </tr>
                                </thead>

                                <tbody>
                                    {!loading && videos.length > 0 && videos.map((video,index) => 
                                        <tr key={index}>
                                            <td style={{ textAlign: 'center'}}><video src={video.url_video} alt="" width={'60px'} controls /></td>
                                            <td>{video.descripcion_video}</td>
                                            <td>{video.nombre_profesional} {video.apellido_profesional}</td>
                                            <td>{new Date(video.fecha_subida_video).toLocaleDateString('es-AR', { year: '2-digit', month: '2-digit', day: '2-digit' })}</td>
                                            <td>
                                                <div className='div-botones-editar-videos'>
                                                    
                                                    <Button variant='warning' onClick={()=>{handleClickEditarVideo(video.video_id, video.profesional_id, video.url_video, video.descripcion_video)}}><img src= {iconoLapiz} width={'22px'}/></Button>
                                                    <Button variant='danger' onClick={()=>{handleClickEliminarVideo(video.video_id)}}><img src= {iconoBasura} width={'22px'}/></Button>
                                                </div>
                                            </td>
                                        </tr>
                                            )
                                        }
                                </tbody>
                            </Table>
                    </div>
                        }
            <Button variant='primary' className='btn-crear-video' onClick={()=> handleClickCrearVideo()}>Crear nuevo video</Button> 
        </article>

        {editarVideo 
            ? 
                <article className="contenedor-editar">
                    <h4>Datos a actualizar</h4>
                    <Form>
                        <Form.Group>
                            <Form.Label>URL video</Form.Label>
                            <Form.Control required onChange={(e)=> setUrlVideo(e.target.value)} value={url_video} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Descripcion</Form.Label>
                            <Form.Control onChange={(e)=> setDescripcionVideo(e.target.value)} value={descripcion_video}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Profesional</Form.Label>
                            <Form.Select value={profesional_id} onChange={(e)=> setProfesionalID(e.target.value)}>
                                {profesionales.map((profesional, index)=>
                                <option key={index} value={profesional.profesional_id}>{profesional.nombre_profesional} {profesional.apellido_profesional}</option>
                                )}
                            </Form.Select>
                        </Form.Group>
                    </Form>

                    <div className='div-botones-editar'>
                        <Button style={{marginTop : '1rem'}} variant="success" onClick={()=>{handleClickActualizarVideo()}}>Actualizar</Button>
                        <Button style={{marginTop : '1rem'}} variant = "secondary" onClick={handleClickCancelarVideo}>Cancelar</Button>
                    </div>

                </article> 
            : 
                <></>}

</div>

        <Modal show={showAgregarVideo} onHide={handleCloseAgregarVideo}>
            <Modal.Header closeButton>
                <Modal.Title>Nuevo video</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>URL video</Form.Label>
                        <Form.Control type='url' onChange={(e)=> setUrlVideo(e.target.value)} value={url_video}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Descripcion</Form.Label>
                        <Form.Control onChange={(e)=> setDescripcionVideo(e.target.value)} value={descripcion_video}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Profesional</Form.Label>
                        <Form.Select value={profesional_id} onChange={(e)=> setProfesionalID(e.target.value)}>
                            {profesionales.map((profesional, index)=>
                            <option key={index} value={profesional.profesional_id}>{profesional.nombre_profesional} {profesional.apellido_profesional}</option>
                            )}
                        </Form.Select>
                    </Form.Group>
                 </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button style={{display: 'block', width : '10vw', marginLeft : 'auto', marginRight : 'auto'}} variant = "success" onClick={handleClickConfirmarVideo} >Confirmar</Button>
                <Button style={{display: 'block', width : '10vw', marginLeft : 'auto', marginRight : 'auto'}} variant="secondary" onClick={handleClickCancelarVideo}>Cancelar</Button>
            </Modal.Footer>
        </Modal>


        <Modal className="modal-imagen" show={showVideo} onHide={handleCloseVideo}>
      <Modal.Header closeButton className="modal-header-custom">
        <Modal.Title className="modal-title-custom">
          {video.nombre_profesional} {video.apellido_profesional}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-custom">
        <div className="div-modal-imagen">
          <img src={video.url_video} alt="" />
        </div>
      </Modal.Body>
    </Modal>

    </div>
    </>
  )
}