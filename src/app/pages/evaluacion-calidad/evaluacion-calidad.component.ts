import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EvaluacionCalidad } from 'src/app/_model/evaluacion_calidad';
import { EvaluacionCalidadService } from 'src/app/_service/evaluacion-calidad.service';
import { EvaluacionCalidadDialogComponent } from './evaluacion-calidad-dialog/evaluacion-calidad-dialog.component';
import { PesajeService } from 'src/app/_service/pesaje.service';
import { Pesaje } from 'src/app/_model/pesaje';

@Component({
  selector: 'app-evaluacion-calidad',
  templateUrl: './evaluacion-calidad.component.html',
  styleUrls: ['./evaluacion-calidad.component.css']
})
export class EvaluacionCalidadComponent implements OnInit{

  dataSource!: MatTableDataSource<Pesaje>;
  displeyedColumns = [
    'numTiket',
    'fecha',
    'hora',
    'empresa',
    'placa',
    'conductor',
    'flete',
    'sector',
    'campaña',
    'tipoRacimo',
    'condicion',
    'escobajoValor',
    'escobajoUM',
    'escobajoPromedio',
    'escobajoCastigo',
    'pedunculoLargoValor',
    'pedunculoLargoUM',
    'pedunculoLargoPromedio',
    'pedunculoLargoCastigo',
    'racimoVerde',
    'racimoVerdeUM',
    'racimoVerdePromedio',
    'racimoVerdeCastigo',
    'pesoNeto'

  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private PesajeService: PesajeService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,

  ) {}

  ngOnInit() {



  }


}
