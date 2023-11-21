import { CuentaBancaria } from "./cuenta_bancaria";
import { Sector } from "./sector";

export class Proveedor{

  codigo!: number;
  sector!: Sector;
  cuenta_bancaria!: CuentaBancaria;
  es_mp!: string;
  es_suministro!: string;
  estado!: string;
  anexoconcar!: string;
  enviar_sms!: string;
  tipo_comp!: string;
  usuario!: string;

}
