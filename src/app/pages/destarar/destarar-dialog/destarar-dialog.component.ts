import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs';
import { CriterioCalidad } from 'src/app/_model/criterio_calidad';
import { EvaluacionCalidad } from 'src/app/_model/evaluacion_calidad';
import { Pesaje } from 'src/app/_model/pesaje';
import { CriteriocalidadService } from 'src/app/_service/criteriocalidad.service';
import { EvaluacionCalidadService } from 'src/app/_service/evaluacion-calidad.service';
import { PesajeService } from 'src/app/_service/pesaje.service';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-destarar-dialog',
  templateUrl: './destarar-dialog.component.html',
  styleUrls: ['./destarar-dialog.component.css'],
})
export class DestararDialogComponent implements OnInit {
  selectedValue!: CriterioCalidad;

  criterios: CriterioCalidad[] = [];

  idCriterioSeleccionado!: number;

  dataSource!: MatTableDataSource<EvaluacionCalidad>;
  displeyedColumns = [
    'criterio',
    'valor',
    'unidad_medida',
    'castigo',
    'forma_castigo',
    'factor_castigo',
    'total_castigo',
    'acciones',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  pesajes!: Pesaje;

  victor!: number;

  nombreApellido!: string;

  eva!: EvaluacionCalidad;

  constructor(
    private criterioCalidadService: CriteriocalidadService,
    private evaluacionCalidadService: EvaluacionCalidadService,
    private dialogRef: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: Pesaje,
    private PesajeService: PesajeService
  ) {}

  ngOnInit() {
    this.listarCriterios();

    this.pesajes = new Pesaje();
    this.pesajes.num_ticket = this.data.num_ticket;
    this.pesajes.id_pesaje = this.data.id_pesaje;
    this.nombreApellido =
      this.data.codigo.nombres +
      '' +
      this.data.codigo.paterno +
      ' ' +
      this.data.codigo.materno;

    this.victor = this.data.id_pesaje;

    this.evaluacionCalidadService
      .listarPorIdPesaje(this.victor)
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource();
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  listarCriterios() {
    this.criterioCalidadService.listar().subscribe((data) => {
      this.criterios = data;
      console.log(data);
    });
  }

  cancelar() {
    this.dialogRef.closeAll();
  }

  cambiar(event: any) {
    this.idCriterioSeleccionado = event.target.value;
  }

  registrar() {
    if (this.eva != null && this.eva.id_evaluacion != null) {
      this.evaluacionCalidadService.modificar(this.eva)
        .pipe( switchMap(() => {
            return this.evaluacionCalidadService.listar();
          })
        )
        .subscribe((banco) => {
          this.evaluacionCalidadService.evaluacionCalidadCambio.next(banco);
          this.evaluacionCalidadService.mensajeCambio.next('MODIFICACION CORRECTA');
        });
    } else {
      this.evaluacionCalidadService.registrar(this.eva).subscribe(() => {
        this.evaluacionCalidadService.listar().subscribe((um) => {
          this.evaluacionCalidadService.evaluacionCalidadCambio.next(um);
          this.evaluacionCalidadService.mensajeCambio.next('Registro Correcto');
        });
      });
    }
    this.dialogRef.closeAll();
  }
}
