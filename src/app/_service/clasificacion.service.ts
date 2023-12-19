import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Clasificacion } from '../_model/clasificacion';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClasificacionService {

  bancoCambio = new Subject<Clasificacion[]>();
  clasificacionCambio = new Subject<string>();

  url: string = `${environment.HOST}/clasificaciones`;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Clasificacion[]>(this.url);
  }

  listaPorId(id_clasificacion: number) {
    return this.http.get<Clasificacion[]>(`${this.url}/${id_clasificacion}`);
  }

  registrar(clasificacion: Clasificacion) {
    return this.http.post(this.url, clasificacion);
  }

  modificar(clasificacion: Clasificacion) {
    return this.http.put(this.url, clasificacion);
  }
}
