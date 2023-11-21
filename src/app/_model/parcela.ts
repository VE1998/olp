import { Proveedor } from "./proveedor";
import { Sector } from "./sector";

export class Parcela{

  id_parcela!: number;
  sector!: Sector;
  proveedor!: Proveedor;
  descripcion!: string;
  area!: number;
  estado!: string;
  usuario!: string;


}
