import { Banco } from "./banco";
import { Persona } from "./persona";

export class CuentaBancaria{

  id_cuenta!: number;
  estado!: string;
  persona!: Persona;
  banco!: Banco;
  numero!: string;
  cci!: string;
  usuario!: string;
  observaciones!: string;


}
