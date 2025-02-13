import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const[nombre_usuario, setNombreUsuario] = useState("");
  const[contraseña_usuario, setContraseñaUsuario] = useState("");

  const iniciarSesion = async(e)=>{
    e.preventDefault();
    if(nombre_usuario != "" && contraseña_usuario != ""){
      const response = await axios.post(`http://localhost:8000/usuarios/sesionadmin/`,{nombre_usuario, contraseña_usuario});
      if(response.data.length > 0){
        navigate('/citas')
        contraseña_usuario("")
        nombre_usuario("")
      }else{
        alert("Verificar")
      }
    }else{
      alert("Ingresar dato")
    }
  }
  return (
    <>
        <article className="contenedor-login">
            <div className="imagen">
                <img src="https://img.freepik.com/vector-gratis/hacker-que-opera-ilustracion-icono-historieta-ordenador-portatil-concepto-icono-tecnologia-aislado-estilo-dibujos-animados-plana_138676-2387.jpg" alt="" />
            </div>
            <div className="campos">
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control type="email" placeholder="Ingresar el nombre de usuario" onChange={(e)=> setNombreUsuario(e.target.value)} value = {nombre_usuario} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Contraseña" onChange={(e)=> setContraseñaUsuario(e.target.value)} value = {contraseña_usuario}/>
              </Form.Group>
              <Button style={{display: 'block', marginLeft : 'auto', marginRight : 'auto'}} variant="dark" type="submit" onClick={iniciarSesion}>
               Iniciar
              </Button>
            </Form>
            </div>
        </article>
    </>
  )
}
