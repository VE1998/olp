import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Sector } from '../_model/sector';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CriteriocalidadService {

  criterioCalidadCambio = new Subject<Sector[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST}/sectores`;

  constructor(private http : HttpClient) { }

  listar(){
   return this.http.get<Sector[]>(this.url);
  }

  listaPorId(idSector: number){
   return this.http.get<Sector>(`${this.url}/${idSector}`);
  }

  registrar(sector: Sector){
   return this.http.post(this.url, sector);
  }

  modificar(sector: Sector){
    return this.http.post(this.url, sector);
   }
}
