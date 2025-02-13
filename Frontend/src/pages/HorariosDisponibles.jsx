import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import axios from "axios";
import Swal from 'sweetalert2';
import { useEffect, useState } from "react";

import iconoBasura from "../Icons/icono-basura.png";
import iconoLapiz from "../Icons/icono-lapiz.png";
import { NavbarAdministrador } from "../pages/NavbarAdministrador";

export const HorariosDisponibles = () => {
  const diasSemana = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  const [editar, setEditar] = useState(false);
  const [horarios, setHorarios] = useState([]);
  const [profesionales, setProfesionales] = useState([]);
  const [horario_id, setHorarioID] = useState("");
  const [profesional_id, setProfesionalID] = useState("");
  const [dia_semana, setDiaSemana] = useState("");
  const [hora_inicio, setHoraInicio] = useState("");
  const [hora_fin, setHoraFin] = useState("");
  const [showModalAgregar, setShowModalAgregar] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = () => setShowModalAgregar(false);

  const obtenerHorarios = async () => {
    setLoading(true)
    const response = await axios.get("http://localhost:8000/horariosDisponibles");
    setHorarios(response.data);
    setLoading(false)
  };

  const obtenerNombresIDsProfesionales = async () => {
    setLoading(true)
    const response = await axios.get("http://localhost:8000/profesionales/nombres");
    setProfesionales(response.data);
    setLoading(false)
  };

  const handleClickEditar = (horario_id,profesional_id,dia_semana,hora_inicio,hora_fin) => {
    setEditar(true);
    setHorarioID(horario_id);
    setProfesionalID(profesional_id);
    setDiaSemana(dia_semana);
    setHoraInicio(hora_inicio);
    setHoraFin(hora_fin);
  };

  const handleClickEliminar = async (horario_id) => {
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
        const response = await axios.delete(`http://localhost:8000/horariosDisponibles/${horario_id}`);
        
        if (response.status === 200) {
          Swal.fire({
            title: "Registro eliminado!",
            text: "",
            icon: "success",
          });
          obtenerHorarios()
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
  
  const handleClickActualizar = async () => {
    if(verificarLlenadoDeCampos()){
      const response = await axios.put("http://localhost:8000/horariosDisponibles/" + horario_id,{
          profesional_id,
          dia_semana,
          hora_inicio,
          hora_fin
        }
      );
      if (response.status === 200) {
        Swal.fire({
          title: "Registro actualizado!",
          text: "",
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        });
        obtenerHorarios();
      }
    }else{
      Swal.fire("Llenar todos los campos!");
    }
  };

  const handleClickCancelar = () => {
    limpiarCampos();
    setEditar(false);
    setShowModalAgregar(false);
  };

  const handleClickCrear = () => {
    setShowModalAgregar(true);
  };

  const handleClickConfirmar = async () => {
    if(verificarLlenadoDeCampos()){
      const response = await axios.post(
        "http://localhost:8000/horariosDisponibles/",
        {
          profesional_id,
          dia_semana,
          hora_inicio,
          hora_fin
        }
      );
      if (response) {
        Swal.fire({
          position: "top",
           icon: "success",
           title: "Nuevo horario agregado",
           showConfirmButton: false,
           timer: 1500
         });
        setShowModalAgregar(false) 
        limpiarCampos()
        obtenerHorarios();
      }
    }else{
      Swal.fire("Llenar todos los campos!");
    }
  };

  const limpiarCampos = () =>{
    setHorarioID("");
    setProfesionalID("");
    setDiaSemana("");
    setHoraInicio("");
    setHoraFin("");
  }

  const verificarLlenadoDeCampos = () =>{
    if(profesional_id != "" && dia_semana != "" && hora_inicio != "" && hora_fin != ""){
      return true
    }
  }

  useEffect(() => {obtenerHorarios()}, []);
  useEffect(() => {obtenerNombresIDsProfesionales()}, []);

  return (
    <>
    <NavbarAdministrador/>
      <article className="contenedor-padre">
        <h2
        >
          Horarios de atención
        </h2>

        {loading 
          ?
            <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </div>
            </div>
          :
            <div className="contenedor-tabla">
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <td
                      
                      >
                      Profesional
                    </td>

                    <td
                      
                      >
                      Dia semana
                    </td>

                    <td
                      >
                        Hora inicio
                    </td>

                    <td
                      
                      >
                      Hora fin
                    </td>

                    <td
                      >
                        Opciones
                    </td>

                  
                  </tr>
                </thead>
                <tbody>
                  {!loading && horarios.length > 0 && horarios.map((horario, index) => (
                    <tr key={index}>
                      <td>{horario.nombre_profesional} {horario.apellido_profesional}</td>
                      <td>{horario.dia_semana}</td>
                      <td>{horario.hora_inicio}</td>
                      <td>{horario.hora_fin}</td>
                      <td>
                        <div className="div-botones-editar-horarios">
                          <Button variant="warning" onClick={() => {
                            handleClickEditar(horario.horario_id,horario.profesional_id,horario.dia_semana,horario.hora_inicio,horario.hora_fin,horario.estado);}}>
                            <img src={iconoLapiz} />
                          </Button>

                          <Button variant="danger" onClick={() => { handleClickEliminar(horario.horario_id); }}>
                              <img src={iconoBasura} />
                          </Button> 
                        </div>
                      </td>
                    </tr>))}
                </tbody>
              </Table>
        </div>}

        <Button variant="primary" className="btn-crear" onClick={() => handleClickCrear()}>Crear nuevo horario</Button>
      </article>

      {editar 
      ? 
        (
        <article className="contenedor-editar">
          <h4>
            Datos a actualizar
          </h4>
          <Form>
            <Form.Group>
              <Form.Label>Profesional</Form.Label>
              <Form.Select required onChange={(e) => setProfesionalID(e.target.value)} value={profesional_id}>
                {profesionales.map((profesional, index) => (
                  <option key={index} value={profesional.profesional_id}>
                    {profesional.nombre_profesional} {profesional.apellido_profesional}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group>
              <Form.Label>Dia semana</Form.Label>
              <Form.Select onChange={(e) => setDiaSemana(e.target.value)} value = {dia_semana}>
                {diasSemana.map((dia, index) => (
                  <option key={index} value={dia}>
                    {dia}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="horaFin">
              <Form.Label>Hora Inicio</Form.Label>
              <Form.Control 
                required
                type="time"
                name="hora"
                min="09:00"
                max="18:00"
                step="1800"
                onChange={(e) => setHoraInicio(e.target.value)}
                value={hora_inicio}
              />
            </Form.Group>

            <Form.Group controlId="horaFin">
              <Form.Label>Hora Fin</Form.Label>
              <Form.Control 
                required
                type="time"
                name="hora"
                min="09:00"
                max="18:00"
                step="1800"
                onChange = {(e) => setHoraFin(e.target.value)}
                value = {hora_fin}
              />
            </Form.Group>
          </Form>

          <div className="div-botones-editar">
            <Button style={{ marginTop: "1rem" }} variant="success" onClick={() => {   handleClickActualizar(); }}>Actualizar </Button>
            <Button variant="secondary" style={{ marginTop: "1rem"}} onClick={handleClickCancelar}>Cancelar</Button>
          </div>
        </article>
        ) 
      :
        (<></>)}

      <Modal show={showModalAgregar} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo horario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Profesional</Form.Label>
              <Form.Select onChange={(e) => setProfesionalID(e.target.value)}>
                {profesionales.map((profesional, index) => (
                  <option key={index} value={profesional.profesional_id}>
                    {profesional.nombre_profesional} {profesional.apellido_profesional}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group>
              <Form.Label>Dia semana</Form.Label>
              <Form.Select onChange={(e) => setDiaSemana(e.target.value)}>
                {diasSemana.map((dia, index) => (
                  <option key={index} value={dia}>
                    {dia}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="horaInicio">
              <Form.Label>Hora inicio</Form.Label>
              <Form.Control
                type="time"
                name="hora"
                min="09:00"
                max="21:00"
                step="1800"
                onChange={(e)=> setHoraInicio(e.target.value)}
                value = {hora_inicio}
              />
            </Form.Group>
            
            <Form.Group controlId="horaFin">
              <Form.Label>Hora fin</Form.Label>
              <Form.Control
                type="time"
                name="hora"
                min="10:00"
                max="22:00"
                step="1800"
                onChange={(e)=> setHoraFin(e.target.value)}
                value = {hora_fin}
              />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{display: 'block', width : '10vw', marginLeft : 'auto', marginRight : 'auto'}} variant = 'primary' onClick={handleClickConfirmar}>Confirmar</Button>
          <Button style={{display: 'block', width : '10vw', marginLeft : 'auto', marginRight : 'auto'}} variant="secondary" onClick={handleClickCancelar}>Cancelar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
