import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const Login = () => {
  return (
    <>
        <article className="contenedor-login">
            <div className="imagen">
                <img src="https://static.vecteezy.com/system/resources/previews/017/800/528/non_2x/user-simple-flat-icon-illustration-vector.jpg" alt="" />
            </div>
            <div className="campos">
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Correo</Form.Label>
                <Form.Control type="email" placeholder="Ingresar el correo" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Contraseña" />
              </Form.Group>
              <div className='botones'>
              <Button variant="dark" type="submit">
               Iniciar
              </Button>
              <Button variant="dark">
                Crear cuenta
              </Button>
              </div>
            </Form>
            </div>
        </article>
    </>
  )
}
