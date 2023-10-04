import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CriterioCalidad } from 'src/app/_model/criteriocalidad';
import { CriteriocalidadService } from 'src/app/_service/criteriocalidad.service';
import { CriteriocalidadDialogComponent } from './criteriocalidad-dialog/criteriocalidad-dialog.component';

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

  constructor(
    private criterioCalidadService: CriteriocalidadService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,

  ) {}


  ngOnInit(): void {

  }

  filtrar(event: Event){

  }

  openDialog(criterioCalidad?: CriterioCalidad) {

    let cd = criterioCalidad != null ? criterioCalidad: new CriterioCalidad();

    this.dialog.open(CriteriocalidadDialogComponent, {
      width: '800px',
      data: cd,
    });
  }

}
