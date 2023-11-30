
import { CriterioCalidad } from "./criterio_calidad";
import { Pesaje } from "./pesaje";

export class EvaluacionCalidad{

  id_evaluacion!: number;
  pesaje!: Pesaje;
  criterio_calidad!: CriterioCalidad;
  valor!: number;
  codigo_um!: string;
  castigo!: string;
  forma_castigo!: string;
  usuario!: string;

}
