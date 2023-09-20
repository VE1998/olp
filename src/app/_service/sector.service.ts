import { environment } from './../../environments/environment.development';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sector } from '../_model/sector';


@Injectable({
  providedIn: 'root'
})
export class SectorService {

  url: string = `${environment.HOST}/sectores`;

  constructor(private http : HttpClient) { }

  listar(){
   return this.http.get<Sector[]>(this.url);
  }
}
