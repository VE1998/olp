import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { CriterioCalidad } from 'src/app/_model/criterio_calidad';
import { UnidadMedida } from 'src/app/_model/unidadmedida';
import { CriteriocalidadService } from 'src/app/_service/criteriocalidad.service';
import { UnidadmedidaService } from 'src/app/_service/unidadmedida.service';

interface Castigo {
  value: string;
}

interface FormaCastigo {
  value: string;
}

interface FactorVariable {
  value: string;
}

interface Imprimir {
  value: string;
}

interface Estado {
  value: string;
}

@Component({
  selector: 'app-criteriocalidad-dialog',
  templateUrl: './criteriocalidad-dialog.component.html',
  styleUrls: ['./criteriocalidad-dialog.component.css']
})

export class CriteriocalidadDialogComponent implements OnInit{

  castigo: Castigo[] = [
    {value: 'SI'},
    {value: 'NO'},
  ];

  formaCastigo: FormaCastigo[] = [
    {value: 'Peso'},
    {value: 'Importe'},
    {value: 'DescuentoPlanilla'}
  ];

  factorVariable: FactorVariable[] = [
    {value: 'SI'},
    {value: 'NO'},
  ];

  imprimir: Imprimir[] = [
    {value: 'SI'},
    {value: 'NO'},
  ];

  estado: Estado[] = [
    {value: 'ACTIVO'},
    {value: 'INACTIVO'}
  ];

  criterios!: CriterioCalidad;

  unidadMedida: UnidadMedida[] = [];

  UnidadMedidaSeleccionado!: UnidadMedida;

  castigoSeleccionado!: string;

  formaCastigoSeleccionado!: string;

  factorVariableSeleccionado!: string;

  impresionSeleccionado!: string;

  estadoSeleccionado!: string;

  constructor(
    private dialogRef: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: CriterioCalidad,
    private CriterioCalidadService: CriteriocalidadService,
    private UnidadMedidaService: UnidadmedidaService)
    {}

  ngOnInit() {


    this.criterios = new CriterioCalidad();
    this.criterios.id_criterio = this.data.id_criterio;
    this.criterios.descripcion = this.data.descripcion;
    this.UnidadMedidaSeleccionado.codigo_um = this.data.codigo_um.codigo_um;
    this.castigoSeleccionado = this.data.castigo;
    this.formaCastigoSeleccionado = this.data.forma_castigo;
    this.criterios.factor_castigo = this.data.factor_castigo;
    this.factorVariableSeleccionado = this.data.factor_variable;
    this.impresionSeleccionado = this.data.impresion_tiket;
    this.estadoSeleccionado = this.data.estado;


    this.listarUnidadMedida();


  }

  listarUnidadMedida() {
    this.UnidadMedidaService.listar().subscribe((data) => {
      this.unidadMedida = data;
    });
  }

  cancelar() {
    this.dialogRef.closeAll();
  }

  operar() {debugger
    if (this.criterios != null && this.criterios.id_criterio != null) {
      this.CriterioCalidadService
        .modificar(this.criterios)
        .pipe(
          switchMap(() => {
            return this.CriterioCalidadService.listar();
          })
        )
        .subscribe((criterio) => {
          this.CriterioCalidadService.criterioCalidadCambio.next(criterio);
          this.CriterioCalidadService.mensajeCambio.next('MODIFICACION CORRECTA');
        });
    } else {
      this.CriterioCalidadService.registrar(this.criterios).subscribe(() => {
        this.CriterioCalidadService.listar().subscribe((cri) => {
          this.CriterioCalidadService.criterioCalidadCambio.next(cri);
          this.CriterioCalidadService.mensajeCambio.next('Registro Correcto');
        });
      });
    }
    this.dialogRef.closeAll();
  }

}
