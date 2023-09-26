import { environment } from './../../environments/environment.development';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sector } from '../_model/sector';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SectorService {

  sectorCambio = new Subject<Sector[]>();
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
