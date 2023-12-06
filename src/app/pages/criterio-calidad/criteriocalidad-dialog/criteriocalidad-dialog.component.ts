import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  UnidadMedidaSeleccionado!: string | undefined;

  castigoSeleccionado!: string;

  formaCastigoSeleccionado!: string;

  factorVariableSeleccionado!: string;

  impresionSeleccionado!: string;

  estadoSeleccionado!: string;

  descripcion !: string;

  factorCastigo!: number;

  id_criterio!: number;

  constructor(
    private snackBar: MatSnackBar,
    private dialogRef: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: CriterioCalidad,
    private CriterioCalidadService: CriteriocalidadService,
    private UnidadMedidaService: UnidadmedidaService)
    {}

  ngOnInit() {

    this.criterios = new CriterioCalidad();
    this.id_criterio = this.data.id_criterio;
    this.descripcion = this.data.descripcion;
    this.castigoSeleccionado = this.data.castigo;
    this.formaCastigoSeleccionado = this.data.forma_castigo;
    this.criterios.factor_castigo = this.data.factor_castigo;
    this.factorCastigo = this.data.factor_castigo;
    this.impresionSeleccionado = this.data.impresion_tiket;
    this.estadoSeleccionado = this.data.estado;

    if(this.UnidadMedidaSeleccionado){
      this.UnidadMedidaSeleccionado = this.data.codigo_um.codigo_um;
    }else{
      this.UnidadMedidaSeleccionado;
    }
    

    console.log("uniMedida"+this.UnidadMedidaSeleccionado);
    


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

    let medida = new UnidadMedida();
    medida.codigo_um = this.UnidadMedidaSeleccionado;

    let prueba = new CriterioCalidad();
    prueba.id_criterio = this.id_criterio;
    prueba.descripcion = this.descripcion;
    prueba.castigo = this.castigoSeleccionado;
    prueba.forma_castigo = this.formaCastigoSeleccionado;
    prueba.factor_castigo = this.factorCastigo;
    prueba.factor_variable = this.factorVariableSeleccionado;
    prueba.impresion_tiket = this.impresionSeleccionado;
    prueba.estado = this.estadoSeleccionado;
    prueba.codigo_um = medida;

    if(this.id_criterio != null){
      this.CriterioCalidadService.modificar(prueba).pipe( switchMap (() => {
         return this.CriterioCalidadService.listar();
      })
      ).subscribe( (cri) => {
        this.CriterioCalidadService.criterioCalidadCambio.next(cri);
        this.CriterioCalidadService.mensajeCambio.next("modificado");
      })
    }else{
      this.CriterioCalidadService.registrar(prueba).subscribe( () => {
        this.CriterioCalidadService.listar().subscribe( (cri) => {
          this.CriterioCalidadService.criterioCalidadCambio.next(cri);
        this.CriterioCalidadService.mensajeCambio.next("REGITRO CORRECTO");
        })
      })

    }
    this.dialogRef.closeAll(); 
    
  }

}
