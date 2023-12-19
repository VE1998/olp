import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Conductor } from '../_model/conductor';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConductorService {

  conductorCambio = new Subject<Conductor[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST}/conductores`;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Conductor[]>(this.url);
  }

  listaPorId(codigo: number) {
    return this.http.get<Conductor>(`${this.url}/${codigo}`);
  }

  registrar(conductor: Conductor) {
    return this.http.post(this.url, conductor);
  }

  modificar(conductor: Conductor) {
    return this.http.put(this.url, conductor);
  }
}
