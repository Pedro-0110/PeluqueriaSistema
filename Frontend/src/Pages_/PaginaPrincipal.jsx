import { BarraNavegacionPrincipal } from "../Components_/BarraNavegacionPrincipal"
import { HorariosAtencion } from "../Components_/HorariosAtencion"
import { Profesionales } from "../Components_/Profesionales"
import { Promociones } from "../Components_/Promociones"
import { Reseñas } from "../Components_/Reseñas"
import { Servicios } from "../Components_/Servicios"
import { Trabajos } from "../Components_/Trabajos"
import { UbicacionYRedes } from "../Components_/UbicacionYRedes"
import '../_Styles/index.css'

export const PaginaPrincipal = () => {
  return (
    <>
      <div className="contenedor-padre-pagina-principal">

          <BarraNavegacionPrincipal/>

          <article className="seccion-uno-pagina-principal">
              <Profesionales/>
              <Servicios/>
              <HorariosAtencion/>
            </article>

            <article className="seccion-dos-pagina-principal">
              <Promociones/>
            </article>

            <article className="seecion-tres-pagina-principal">
              <Trabajos/>
            </article>

            <article className="seccion-cuatro-pagina-principal">
              <Reseñas/>
            </article>

            <article className="seecion-cinco-pagina-principal">
              <UbicacionYRedes/>
          </article>
      </div>
    </>
  )
}
