import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { EvaluacionCalidad } from '../_model/evaluacion_calidad';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionCalidadService {

  evaluacionCalidadCambio = new Subject<EvaluacionCalidad[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST}/evaluacioncalidades`;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<EvaluacionCalidad[]>(this.url);
  }

  listaPorId(id_evaluacion: number) {
    return this.http.get<EvaluacionCalidad[]>(`${this.url}/${id_evaluacion}`);
  }

  listarPorIdPesaje(id_pesaje: number) {
    return this.http.get<EvaluacionCalidad[]>(`${this.url}/destarar/${id_pesaje}`);
  }

  registrar(evaluacionCalidad: EvaluacionCalidad) {
    return this.http.post(this.url, evaluacionCalidad);
  }

  modificar(evaluacionCalidad: EvaluacionCalidad) {
    return this.http.put(this.url, evaluacionCalidad);
  }

  eliminar(id_evaluacion: number) {
    return this.http.delete<EvaluacionCalidad[]>(`${this.url}/${id_evaluacion}`);
  }


}
