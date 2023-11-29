import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Parcela } from 'src/app/_model/parcela';

@Component({
  selector: 'app-parcela',
  templateUrl: './parcela.component.html',
  styleUrls: ['./parcela.component.css']
})
export class ParcelaComponent implements OnInit{

  dataSource!: MatTableDataSource<Parcela>;
  displeyedColumns = [
    'codigo_um',
    'descripcion',
    'codigo_onu',
    'codigo_sunat',
    'acciones',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngOnInit(){
    
  }

}
