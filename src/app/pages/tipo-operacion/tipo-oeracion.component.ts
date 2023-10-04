import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TipoOperacion } from 'src/app/_model/tipo_operacion';
import { TipoOperacionService } from 'src/app/_service/tipo-operacion.service';
import { TipoOperacionDialogComponent } from './tipo-operacion-dialog/tipo-operacion-dialog.component';

@Component({
  selector: 'app-tipo-oeracion',
  templateUrl: './tipo-oeracion.component.html',
  styleUrls: ['./tipo-oeracion.component.css']
})
export class TipoOeracionComponent implements OnInit{

  dataSource!: MatTableDataSource<TipoOperacion>;
  displeyedColumns = [
    'id_to',
    'descripcion',
    'Tipo',
    'Estado',
    'acciones',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private TipoOperacionService: TipoOperacionService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,

  ) {}

  ngOnInit(): void {

  }

  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(tipo_operacion?: TipoOperacion) {
    let to = tipo_operacion != null ? tipo_operacion: new TipoOperacion();
    this.dialog.open(TipoOperacionDialogComponent, {
      width: '250px',
      data: to,
    });
  }

}
