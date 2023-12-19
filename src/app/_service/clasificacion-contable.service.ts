import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ClasificacionContable } from '../_model/clasificacion_contable';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClasificacionContableService {

  clasificacionContableCambio = new Subject<ClasificacionContable[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST}/clasificacionContables`;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<ClasificacionContable[]>(this.url);
  }

  listaPorId(id_clas: number) {
    return this.http.get<ClasificacionContable[]>(`${this.url}/${id_clas}`);
  }

  registrar(clas_contable: ClasificacionContable) {
    return this.http.post(this.url, clas_contable);
  }

  modificar(clas_contable: ClasificacionContable) {
    return this.http.put(this.url, clas_contable);
  }
}
