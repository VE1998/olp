import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs';
import { CriterioCalidad } from 'src/app/_model/criterio_calidad';
import { EvaluacionCalidad } from 'src/app/_model/evaluacion_calidad';
import { Pesaje } from 'src/app/_model/pesaje';
import { UnidadMedida } from 'src/app/_model/unidadmedida';
import { CriteriocalidadService } from 'src/app/_service/criteriocalidad.service';
import { EvaluacionCalidadService } from 'src/app/_service/evaluacion-calidad.service';
import { PesajeService } from 'src/app/_service/pesaje.service';

@Component({
  selector: 'app-destarar-dialog',
  templateUrl: './destarar-dialog.component.html',
  styleUrls: ['./destarar-dialog.component.css'],
})
export class DestararDialogComponent implements OnInit {
  selectedValue!: number;
  criterios: CriterioCalidad[] = [];
  idCriterioSeleccionado!: number;
  dataSource!: MatTableDataSource<EvaluacionCalidad>;
  displeyedColumns = [
    'criterio',
    'valor',
    'unidadMedida',
    'castigo',
    'formacastigo',
    'factorcastigo',
    'totalcastigo',
    'eliminar',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  pesajes!: Pesaje;
  victor!: number;
  nombreApellido!: string;
  eva!: EvaluacionCalidad;

  //checkbox
  chico = false;
  grande = false;
  checkSeleccionado!: string;

  crite!: CriterioCalidad;
  prueva : CriterioCalidad[] = [];
  um: string | undefined;
  forma_castigo!: number;
  castigo!: string;
  factor_castigo!: number;
  valor!: number;
  totalDescuento!: number;

  id_to: number | undefined;


  constructor(
    private criterioCalidadService: CriteriocalidadService,
    private evaluacionCalidadService: EvaluacionCalidadService,
    private dialogRef: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: Pesaje,
    private PesajeService: PesajeService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.listarCriterios();

    this.pesajes = new Pesaje();
    this.pesajes.id_pesaje = this.data.id_pesaje;
    this.pesajes.num_ticket = this.data.num_ticket;
    this.pesajes.peso_ingreso = this.data.peso_ingreso;
    this.pesajes.peso_salida = this.data.peso_salida;
    this.pesajes.peso_salida = this.data.peso_neto;

    this.nombreApellido = this.data.codigo.nombres +' ' +this.data.codigo.paterno +' ' +this.data.codigo.materno;
    this.victor = this.data.id_pesaje;

    if(this.selectedValue == undefined){
       this.um = "";
       this.forma_castigo=0;
       this.castigo = "";
       this.factor_castigo = 0;
    }
    this.evaluacionCalidadService.evaluacionCalidadCambio.subscribe( (data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
    this.evaluacionCalidadService.mensajeCambio.subscribe( (data) => {
      this.snackBar.open(data, 'AVISO',{
        duration: 3000,
      });
    });
    this.evaluacionCalidadService.listarPorIdPesaje(this.victor).subscribe ( (data) =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }); 

    console.log(this.data);


  }

  listarCriterios() {
    this.criterioCalidadService.listar().subscribe((data) => {
      this.criterios = data;
    });
  }


  registrar() {

    //OPTENIENDO DATOS DE PESAJE
    let pesa = new Pesaje();
    pesa.id_pesaje = this.pesajes.id_pesaje;
    

    //OPTENIENDO CRITERIO CALIDAD
    let crit = new CriterioCalidad();
    crit.id_criterio = this.selectedValue;

    //REGISTRANDO EVALUACION DE CALIDAD
    let evaluacion = new EvaluacionCalidad();
    evaluacion.id_pesaje = pesa;
    evaluacion.id_criterio = crit;
    evaluacion.valor = this.valor;
    evaluacion.codigo_um = ""+this.um;
    evaluacion.castigo = this.castigo;
    evaluacion.forma_castigo =""+ this.forma_castigo;
    evaluacion.factor_castigo = this.factor_castigo;
    evaluacion.usuario = "VEUSEBIO";
    evaluacion.tam_rac = this.checkSeleccionado;

    if(this.selectedValue === 1){
      pesa.castigo_planilla = this.valor*this.factor_castigo;
      this.evaluacionCalidadService.registrar(evaluacion).subscribe(() => {
        this.PesajeService.updatePlanilla(pesa.castigo_planilla, pesa.id_pesaje).subscribe(() => {
          this.evaluacionCalidadService.listarPorIdPesaje(this.pesajes.id_pesaje).subscribe((eva) => {
            this.evaluacionCalidadService.evaluacionCalidadCambio.next(eva);
            this.evaluacionCalidadService.mensajeCambio.next("Registro Correcto");
          });
        }, (errorModificacion) => {
          console.error("Error al modificar el pesaje:", errorModificacion);
        });
      }, (errorRegistro) => {
        console.error("Error al registrar la evaluación de calidad:", errorRegistro);
      });
    }else if(this.selectedValue ===2){
      pesa.castigo_importe = this.valor*this.factor_castigo;
      this.evaluacionCalidadService.registrar(evaluacion).subscribe(() => {
        this.PesajeService.updateImporte(pesa.castigo_importe, pesa.id_pesaje).subscribe(() => {
          this.evaluacionCalidadService.listarPorIdPesaje(this.pesajes.id_pesaje).subscribe((eva) => {
            this.evaluacionCalidadService.evaluacionCalidadCambio.next(eva);
            this.evaluacionCalidadService.mensajeCambio.next("Registro Correcto");
          });
        }, (errorModificacion) => {
          console.error("Error al modificar el pesaje:", errorModificacion);
        });
      }, (errorRegistro) => {
        console.error("Error al registrar la evaluación de calidad:", errorRegistro);
      });
    }else{
      this.evaluacionCalidadService.registrar(evaluacion).subscribe(() => {
          this.evaluacionCalidadService.listarPorIdPesaje(this.pesajes.id_pesaje).subscribe((eva) => {
            this.evaluacionCalidadService.evaluacionCalidadCambio.next(eva);
            this.evaluacionCalidadService.mensajeCambio.next("Registro Correcto");
          });
      }, (errorRegistro) => {
        console.error("Error al registrar la evaluación de calidad:", errorRegistro);
      });
    }

    this.limpiar();
  }

  onFoodSelection2() {
    const opcion = this.criterios.find(opc => opc.id_criterio === this.selectedValue);
    if (opcion) {
      this.um = opcion.codigo_um.codigo_um;
      this.forma_castigo = opcion.forma_castigo;
      this.castigo = opcion.castigo;
      this.factor_castigo = opcion.factor_castigo;

    }

  }

  limpiar(){
    this.selectedValue = 0;
    this.um = "";
    this.forma_castigo = 0;
    this.castigo = "";
    this.factor_castigo = 0;
    this.valor = 0;
    this.chico = false;
    this.grande = false;
  }

  onCheckboxChange(checkboxNumber: String) {
    if (checkboxNumber === 'CHICO') {
      this.grande = !this.chico;
      this.checkSeleccionado = "CHICO";
    } else {
      this.chico = !this.grande;
      this.checkSeleccionado = "GRANDE";
    }
  }

  eliminarEvaluacion(evaluacion? : EvaluacionCalidad){

  }

}
