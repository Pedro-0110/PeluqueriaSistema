import { GaleriaImagenes } from "./GaleriaImagenes"
import { GaleriaVideos } from "./GaleriaVideos"

export const Trabajos = () => {
  return ( 
    <>
      <div className="contenedor-padre-trabajos">
          <GaleriaImagenes/>
          <GaleriaVideos/>
      </div>
    </>
  )
}
