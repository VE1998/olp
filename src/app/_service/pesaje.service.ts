import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Pesaje } from '../_model/pesaje';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PesajeService {

  pesajeCambio = new Subject<Pesaje[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST}/pesajes`;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Pesaje[]>(this.url);
  }

  destarar() {
    return this.http.get<Pesaje[]>(this.url+'/destarar'); 
  }

  listaPorId(id_pesaje: number) {
    return this.http.get<Pesaje[]>(`${this.url}/${id_pesaje}`);
  }

  registrar(pesaje: Pesaje) {
    return this.http.post(this.url, pesaje);
  }

  modificar(pesaje: Pesaje) {
    return this.http.put(this.url, pesaje);
  }

  updatePlanilla(castigo_planilla: number, id_pesaje: number): Observable<any> {
    const body = {
      castigo_planilla,
      id_pesaje,
    };

    return this.http.put<any>(this.url+'/updatePlanilla', body);
  }

  updateImporte(castigo_importe: number, id_pesaje: number): Observable<any> {
    const body = {
      castigo_importe,
      id_pesaje,
    };

    return this.http.put<any>(this.url+'/updateImporte', body);
  }

}
