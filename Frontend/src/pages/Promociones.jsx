import Button from 'react-bootstrap/esm/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { NavbarAdministrados } from '../Components/NavbarAdministrados';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

export const Promociones = () => {
    const [profesionales, setProfesionales] = useState([]);
    const [promociones, setPromociones] = useState([]);
    const [id_profesional, setIDProfesional] = useState("");
    const [url_promocion, setUrlPromocion] = useState("");
    const [mostrar_promociones, setMostrarPromociones] = useState(null);


    const verificarSiMostrarPromociones = async () =>{
        const response = await axios.get(`http://localhost:8000/configuracionGlobal`);
        setMostrarPromociones(response.data[0].mostrar_promociones === 0 ? false : true);
    }

    const manejarCambio = async (e) =>{
        setMostrarPromociones(e.target.checked);
        await axios.put(`http://localhost:8000/configuracionGlobal/`,{mostrar_promociones});
    }

    const obtenerProfesionales = async() =>{
        const response = await axios.get('http://localhost:8000/profesionales/nombres');
        setProfesionales(response.data);
    }

    const agregarPromocion = async() =>{
        const response = await axios.post(`http://localhost:8000/promociones/`,{
            url_promocion,
            id_profesional
        });

        if(response.status == 200){
           Swal.fire({
                       position: "top",
                        icon: "success",
                        title: "Promocion agregada!",
                        showConfirmButton: false,
                        timer: 1000
                      });
            obtenerPromociones();
        }

        setUrlPromocion("")
    }

    const obtenerPromociones = async()=>{
        const response = await axios.get(`http://localhost:8000/promociones/${id_profesional}`);
        setPromociones(response.data);
    }

    const handleClickEliminarPromocion =  async(promocion_id)=>{
        const confirmacion = await Swal.fire({
                  title: "Se eliminara el registro",
                  text: "",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Si, eliminar",
                });

        if(confirmacion.isConfirmed){
        const response = await axios.delete(`http://localhost:8000/promociones/${promocion_id}/${id_profesional}`);
        if(response.status === 200){
            obtenerPromociones();
        }
    }
    }

    useEffect(()=>{obtenerProfesionales()},[]);
    useEffect(()=>{verificarSiMostrarPromociones()},[])
    useEffect(()=>{obtenerPromociones()},[id_profesional]);

  return (
    <> 
        <NavbarAdministrados/>
        <div className="contenedor-padre-promociones">
            <article className="formulario-promociones">
            <Form>
                    <Form.Check // prettier-ignore
                      type="switch"
                      id="custom-switch"
                      label="Mostrar promociones en pagina principal"
                      checked = {mostrar_promociones}
                      onChange= {manejarCambio}
                    />
            </Form>
            <Form.Label>Profesional</Form.Label> 
            <Form.Select value={id_profesional} onChange={(e)=> setIDProfesional(e.target.value)}>
                {profesionales.map((profesional, index)=>
                    <option key={index} value={profesional.profesional_id}>{profesional.nombre_profesional} {profesional.apellido_profesional}</option>
                )}
            </Form.Select>

            <Form.Label>url_imagen</Form.Label>
            <Form.Control type='text' onChange = {(e)=> setUrlPromocion(e.target.value)} value={url_promocion}/>

            <Button onClick={agregarPromocion}>Agregar</Button>
            </article>
            <article className="tabla-promociones">
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Imagen</th>
                            <th>Fecha en que se subio</th>
                            <th>Opcion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {promociones.map((promo)=> 
                        
                            <tr>
                                <td><img src={promo.url_promocion} alt="" width={'280px'} height={'320px'} /></td>
                                <td>{new Date(promo.fecha_subida).toLocaleDateString('es-AR', { year: '2-digit', month: '2-digit', day: '2-digit' })}</td>
                                <td><Button variant='danger' style={{width: '100%'}} onClick={()=> handleClickEliminarPromocion(promo.id)}>Eliminar</Button></td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </article>
        </div>
    </>
  )
}
