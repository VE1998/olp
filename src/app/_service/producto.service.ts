import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Producto } from '../_model/producto';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  productoCambio = new Subject<Producto[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST}/productos`;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Producto[]>(this.url);
  }

  listaPorId(id_banco: number) {
    return this.http.get<Producto[]>(`${this.url}/${id_banco}`);
  }

  registrar(prod: Producto) {
    return this.http.post(this.url, prod);
  }

  modificar(prod: Producto) {
    return this.http.put(this.url, prod);
  }
}
