import { Conductor } from "./conductor";
import { EmpresaTransporte } from "./empresa_transporte";
import { Parcela } from "./parcela";
import { Persona } from "./persona";
import { Producto } from "./producto";
import { TipoOperacion } from "./tipo_operacion";
import { Vehiculo } from "./vehiculo";

export class Pesaje{

  id_pesaje!: number;
  num_ticket!: string;
  tipo_operacion!: string;
  id_to!: TipoOperacion;
  codigo!: Persona;
  fecha!: string;
  peso_ingreso!: number;
  peso_salida!: number;
  peso_neto!: number;
  castigo_importe!: number;
  castigo_peso!: number;
  castigo_planilla!: number;
  vehiculo!: Vehiculo
  empresaTransporte!: EmpresaTransporte;
  conductor!: Conductor;
  parcela!: Parcela;
  producto!: Producto;
  estado!: string;
  retencion_flete!: string;
  monto_flete!: string;
  tipo_registro!: string;
  observaciones!: string;
  version!: number;
  id_liquidacion!: number;
  usuario_ingreso!: string;
  usuario_salida!: string;
  usuario_version!: string;
  fecha_salida!: string;
  fecha_anull!: string;
  bitacora!: string;
  estado_sinc!: string;
  reg_guia!: string;
  serie!: string;



}
