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


  selectedValue!: UnidadMedida;

  criterios!: CriterioCalidad;

  unidadMedida: UnidadMedida[] = [];

  idUnidadMedidaSeleccionado!: string;

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
    (this.criterios.descripcion = this.data.descripcion);
    (this.criterios.factor_castigo = this.data.factor_castigo);

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

}
