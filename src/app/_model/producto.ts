import { Clasificacion } from "./clasificacion";
import { ClasificacionContable } from "./clasificacion_contable";
import { UnidadMedida } from "./unidadmedida";

export class Producto{

  cod_producto!: number;
  descripcion!: string;
  unidad_medida!: UnidadMedida;
  precio_venta!: number;
  balanza!: string;
  tipo!: string;
  usuario!: string;
  stock!: number;
  stock_minimo!: number;
  ubicacion!: string;
  version!: number;
  clasificacion_contable!: ClasificacionContable;
  clasificacion!: Clasificacion;

}
