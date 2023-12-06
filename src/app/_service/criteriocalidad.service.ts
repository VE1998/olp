import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Sector } from '../_model/sector';
import { HttpClient } from '@angular/common/http';
import { CriterioCalidad } from '../_model/criterio_calidad';



@Injectable({
  providedIn: 'root'
})
export class CriteriocalidadService {

  criterioCalidadCambio = new Subject<CriterioCalidad[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST}/criterio_calidades`;

  constructor(private http : HttpClient) { }

  listar(){
   return this.http.get<CriterioCalidad[]>(this.url);
  }

  listaPorId(id_criterio: number){
   return this.http.get<CriterioCalidad>(`${this.url}/${id_criterio}`);
  }

  registrar(criterio: CriterioCalidad){
   return this.http.post(this.url, criterio);
  }

  modificar(criterio: CriterioCalidad){
    return this.http.put(this.url, criterio);
   }
}
