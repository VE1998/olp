import { EmpresaTransporte } from "./empresa_transporte";

export class Vehiculo{

  id_vehiculo!: number;
  empresa_transporte!: EmpresaTransporte;
  tipo!: string;
  marca!: string;
  estado!: string;
  placa!: string;

}
