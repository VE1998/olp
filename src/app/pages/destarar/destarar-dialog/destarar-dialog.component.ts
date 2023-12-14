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
    'acciones',
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

  um!: string | undefined;
  forma_castigo!: string;
  castigo!: string;
  factor_castigo!: number;


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
    this.pesajes.num_ticket = this.data.num_ticket;
    this.pesajes.id_pesaje = this.data.id_pesaje;
    this.nombreApellido = this.data.codigo.nombres +' ' +this.data.codigo.paterno +' ' +this.data.codigo.materno;
    this.victor = this.data.id_pesaje;

    this.evaluacionCalidadService.listarPorIdPesaje(this.victor).subscribe ( (data) =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;     
    });

    if(this.selectedValue == undefined){
       this.um = "";
       this.forma_castigo="";
       this.castigo = "";
       this.factor_castigo = 0;
    }
    
  }

  listarCriterios() {
    this.criterioCalidadService.listar().subscribe((data) => {
      this.criterios = data;
    });
  }

 
  registrar() {
  
  }

  onFoodSelection2() {debugger
    const opcion = this.criterios.find(opc => opc.id_criterio === this.selectedValue);
    if (opcion) {
      this.um = opcion.codigo_um.codigo_um;
      this.forma_castigo = opcion.forma_castigo;
      this.castigo = opcion.castigo;
      this.factor_castigo = opcion.factor_castigo;    
    }    
    
  }


}
