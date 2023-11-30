import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CriterioCalidad } from 'src/app/_model/criterio_calidad';
import { CriteriocalidadService } from 'src/app/_service/criteriocalidad.service';

@Component({
  selector: 'app-criteriocalidad-dialog',
  templateUrl: './criteriocalidad-dialog.component.html',
  styleUrls: ['./criteriocalidad-dialog.component.css']
})
export class CriteriocalidadDialogComponent implements OnInit{

  constructor(
    private criterioCalidadService: CriteriocalidadService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,

  ) {}


  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  dataSource!: MatTableDataSource<CriterioCalidad>;
  displeyedColumns = ['criterio', 'valor', 'unidadmedida'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

}
