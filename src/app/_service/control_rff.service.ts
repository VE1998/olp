import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Control_rff } from "../_model/control_rff";
import { environment } from "src/environments/environment.development";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class Control_rffService {

  controlRffCambio = new Subject<Control_rff[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST}/controlRff`;

  constructor(private http : HttpClient) { }

  listar(){
   return this.http.get<Control_rff[]>(this.url);
  }

  listaPorId(id_control: number){
   return this.http.get<Control_rff>(`${this.url}/${id_control}`);
  }

  registrar(control_rff: Control_rff){
   return this.http.post(this.url, control_rff);
  }

  modificar(control_rff: Control_rff){
    return this.http.put(this.url, control_rff);
   }
}
