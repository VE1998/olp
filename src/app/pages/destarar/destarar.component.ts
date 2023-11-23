import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Pesaje } from 'src/app/_model/pesaje';
import { PesajeService } from 'src/app/_service/pesaje.service';

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
    'producto',
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

    this.PesajeService.destarar().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(data);
    });
    
  }








  openDialog() {
 
  }

}
