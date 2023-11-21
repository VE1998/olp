import { UnidadMedida } from "./unidadmedida";

export class CriterioCalidad{

  id_criterio!: number;
  descripcion!: string;
  unidad_medida!: UnidadMedida;
  castigo!: string;
  forma_castigo!: string;
  factor_castigo!: number;
  factor_variable!: string;
  impresion_tiket!: string;
  estado!: string;
  usuario!: string;

}