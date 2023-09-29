import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CriterioCalidad } from 'src/app/_model/criteriocalidad';

@Component({
  selector: 'app-criteriocalidad',
  templateUrl: './criteriocalidad.component.html',
  styleUrls: ['./criteriocalidad.component.css']
})
export class CriteriocalidadComponent implements OnInit{

  dataSource!: MatTableDataSource<CriterioCalidad>;
  displeyedColumns = ['NumeroTiket', 'Proveedor', 'PesoIngreso', 'Remolque', 'Conductor', 'Producto', 'Acciones'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  constructor(){


  }


  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  filtrar(event: Event){

  }

}
