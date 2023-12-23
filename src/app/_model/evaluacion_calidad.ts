
import { CriterioCalidad } from "./criterio_calidad";
import { Pesaje } from "./pesaje";

export class EvaluacionCalidad{

  id_evaluacion!: number;
  id_pesaje!: Pesaje;
  id_criterio!: CriterioCalidad;
  valor!: number;
  codigo_um!: string;
  castigo!: string;
  forma_castigo!: string;
  factor_castigo!: number;
  usuario!: string;
  tam_rac!: string;

}
