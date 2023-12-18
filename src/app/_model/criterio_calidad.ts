import { UnidadMedida } from "./unidadmedida";

export class CriterioCalidad{

  id_criterio!: number;
  descripcion!: string;
  codigo_um!: UnidadMedida;
  castigo!: string;
  forma_castigo!: number;
  factor_castigo!: number;
  factor_variable!: string;
  impresion_tiket!: string;
  estado!: string;
  usuario!: string;

}
