import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Banco } from 'src/app/_model/banco';

@Component({
  selector: 'app-banco',
  templateUrl: './banco.component.html',
  styleUrls: ['./banco.component.css']
})
export class BancoComponent implements OnInit{

  dataSource!: MatTableDataSource<Banco>;

  displeyedColumns = [
    'id_banco',
    'nombre',
    'descripcion',
    'acciones',
  ];

  ngOnInit() {

  }

}
