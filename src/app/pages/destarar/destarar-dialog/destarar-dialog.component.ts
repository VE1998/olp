import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EvaluacionCalidad } from 'src/app/_model/evaluacion_calidad';
import { Pesaje } from 'src/app/_model/pesaje';
import { EvaluacionCalidadService } from 'src/app/_service/evaluacion-calidad.service';
import { PesajeService } from 'src/app/_service/pesaje.service';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-destarar-dialog',
  templateUrl: './destarar-dialog.component.html',
  styleUrls: ['./destarar-dialog.component.css']
})
export class DestararDialogComponent implements OnInit{

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

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

  constructor(private evaluacionCalidadService: EvaluacionCalidadService,
    private dialogRef: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: Pesaje,
    private PesajeService: PesajeService
   ){}

  ngOnInit() {

    this.pesajes = new Pesaje();
    this.pesajes.num_ticket = this.data.num_ticket;
    this.victor = this.data.id_pesaje;

    this.evaluacionCalidadService.listarPorIdPesaje(this.victor).subscribe((data) => {
      this.dataSource = new MatTableDataSource();
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(data);
    });


  }

  cancelar() {
    this.dialogRef.closeAll();
  }

}
