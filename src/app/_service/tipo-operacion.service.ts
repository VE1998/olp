import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { TipoOperacion } from '../_model/tipo_operacion';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TipoOperacionService {

  tipoOperacionCambio = new Subject<TipoOperacion[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST}/tipoOperaciones`;

  constructor(private http : HttpClient) { }

  listar(){
   return this.http.get<TipoOperacion[]>(this.url);
  }

  listaPorId(id_to: string){
   return this.http.get<TipoOperacion>(`${this.url}/${id_to}`);
  }

  registrar(tipo_operacion: TipoOperacion){
   return this.http.post(this.url, tipo_operacion);
  }

  modificar(tipo_operacion: TipoOperacion){
    return this.http.put(this.url, tipo_operacion);
   }
}
