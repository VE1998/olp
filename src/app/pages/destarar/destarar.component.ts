import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Pesaje } from 'src/app/_model/pesaje';
import { PesajeService } from 'src/app/_service/pesaje.service';
import { PesajeDialogComponent } from '../pesaje/pesaje-dialog/pesaje-dialog.component';
import { DestararDialogComponent } from './destarar-dialog/destarar-dialog.component';

@Component({
  selector: 'app-destarar',
  templateUrl: './destarar.component.html',
  styleUrls: ['./destarar.component.css']
})
export class DestararComponent implements OnInit{

  dataSource!: MatTableDataSource<Pesaje>;
  displeyedColumns = [
    'numTiket',
    'persona',
    'operacion',
    'acciones',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private PesajeService: PesajeService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,

  ) {}


  ngOnInit() {

    this.PesajeService.pesajeCambio.subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.PesajeService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000
      });
    });

    this.PesajeService.pesajeCambio.subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.PesajeService.mensajeCambio.subscribe((data) => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000,
      });
    });

    this.PesajeService.destarar().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

  }


  openDialog(pesaje?: Pesaje) {

    let pesa = pesaje != null ? pesaje: new Pesaje();

    this.dialog.open(DestararDialogComponent, {
      width: '800px',
      data: pesa,
    });
  }

}
