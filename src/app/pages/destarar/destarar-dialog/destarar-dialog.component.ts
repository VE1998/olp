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
    'actualizar',
    'eliminar',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  pesajes!: Pesaje;
  victor!: number;
  nombreApellido!: string;
  eva!: EvaluacionCalidad;
  checked = false;
  indeterminate = false;
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

  }

  listarCriterios() {
    this.criterioCalidadService.listar().subscribe((data) => {
      this.criterios = data;
    });
  }


  registrar() {debugger

    let pesa = new Pesaje();
    pesa.id_pesaje = this.pesajes.id_pesaje;
    pesa.num_ticket = this.data.num_ticket;
    pesa.tipo_operacion = this.data.tipo_operacion;
    pesa.id_to = this.data.id_to;
    pesa.codigo = this.data.codigo;
    pesa.fecha = this.data.fecha;
    pesa.peso_ingreso = this.data.peso_ingreso;
    pesa.peso_salida = this.data.peso_salida;
    pesa.peso_neto = this.data.peso_neto;
    pesa.castigo_importe = this.valor*this.factor_castigo;
    pesa.castigo_peso = this.data.castigo_peso;
    pesa.castigo_planilla = this.data.castigo_planilla;
    pesa.id_vehiculo = this.data.id_vehiculo;
    pesa.codigo_et = this.data.codigo_et;
    pesa.conductor = this.data.conductor;
    pesa.id_parcela = this.data.id_parcela;
    pesa.cod_producto = this.data.cod_producto;
    pesa.estado = this.data.estado;
    pesa.retencion_flete = this.data.retencion_flete;
    pesa.monto_flete = this.data.monto_flete;
    pesa.tipo_registro = this.data.tipo_registro;
    pesa.observaciones = this.data.observaciones;
    pesa.version  = this.data.version;
    pesa.id_liquidacion = this.data.id_liquidacion;
    pesa.usuario_ingreso = this.data.usuario_ingreso,
    pesa.usuario_salida = this.data.usuario_salida;
    pesa.usuario_version = this.data.usuario_version;
    pesa.fecha_salida = this.data.fecha_salida;
    pesa.fecha_anull = this.data.fecha_anull;
    pesa.bitacora = this.data.bitacora;
    pesa.estado_sinc = this.data.estado_sinc;
    pesa.reg_guia = this.data.reg_guia;
    pesa.serie = this.data.serie;



    let crit = new CriterioCalidad();
    crit.id_criterio = this.selectedValue;



    let evaluacion = new EvaluacionCalidad();
    evaluacion.id_pesaje = pesa;
    evaluacion.id_criterio = crit;
    evaluacion.valor = this.valor;
    evaluacion.codigo_um = ""+this.um;
    evaluacion.castigo = this.castigo;
    evaluacion.forma_castigo =""+ this.forma_castigo;
    evaluacion.factor_castigo = this.factor_castigo;
    evaluacion.usuario = "VEUSEBIO";

    this.evaluacionCalidadService.registrar(evaluacion).subscribe(() => {
      // Modificar pesa y esperar a que se complete
      this.PesajeService.modificar(pesa).subscribe(() => {
        // Listar evaluaciones por ID de pesaje
        this.evaluacionCalidadService.listarPorIdPesaje(this.pesajes.id_pesaje).subscribe((eva) => {
          // Notificar cambio en evaluación de calidad
          this.evaluacionCalidadService.evaluacionCalidadCambio.next(eva);
          this.evaluacionCalidadService.mensajeCambio.next("Registro Correcto");
        });
      }, (errorModificacion) => {
        console.error("Error al modificar el pesaje:", errorModificacion);
        // Puedes manejar el error de modificación aquí si es necesario
      });
    }, (errorRegistro) => {
      console.error("Error al registrar la evaluación de calidad:", errorRegistro);
      // Puedes manejar el error de registro aquí si es necesario
    });





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
  }


}
