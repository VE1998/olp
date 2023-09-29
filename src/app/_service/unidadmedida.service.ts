import { Injectable } from '@angular/core';
import { UnidadMedida } from '../_model/unidadmedida';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UnidadmedidaService {

  unidadMedidaCambio = new Subject<UnidadMedida[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST}/unidadMedidas`;

  constructor(private http : HttpClient) { }

  listar(){
   return this.http.get<UnidadMedida[]>(this.url);
  }

  listaPorId(codigo_um: string){
   return this.http.get<UnidadMedida>(`${this.url}/${codigo_um}`);
  }

  registrar(unidadmedida: UnidadMedida){
   return this.http.post(this.url, unidadmedida);
  }

  modificar(unidadmedida: UnidadMedida){
    return this.http.put(this.url, unidadmedida);
   }

}
