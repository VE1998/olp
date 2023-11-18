import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Banco } from '../_model/banco';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BancoService {

  sectorCambio = new Subject<Banco[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST}/bancos`;

  constructor( private http : HttpClient) { }

  listar(){
    return this.http.get<Banco[]>(this.url);
   }

   listaPorId(id_banco: number){
    return this.http.get<Banco>(`${this.url}/${id_banco}`);
   }

   registrar(banco: Banco){
    return this.http.post(this.url, banco);
   }

   modificar(banco: Banco){
     return this.http.put(this.url, banco);
    }
}
