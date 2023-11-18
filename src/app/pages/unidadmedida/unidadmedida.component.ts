import { UnidadmedidaDialogComponent } from './unidadmedida-dialog/unidadmedida-dialog.component';
import { UnidadmedidaService } from './../../_service/unidadmedida.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UnidadMedida } from 'src/app/_model/unidadmedida';

@Component({
  selector: 'app-unidadmedida',
  templateUrl: './unidadmedida.component.html',
  styleUrls: ['./unidadmedida.component.css'],
})
export class UnidadmedidaComponent implements OnInit {
  dataSource!: MatTableDataSource<UnidadMedida>;
  displeyedColumns = [
    'codigo_um',
    'descripcion',
    'codigo_onu',
    'codigo_sunat',
    'acciones',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private UnidadmedidaService: UnidadmedidaService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,

  ) {}

  ngOnInit(): void {
    this.UnidadmedidaService.unidadMedidaCambio.subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.UnidadmedidaService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000
      });
    });

    this.UnidadmedidaService.unidadMedidaCambio.subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.UnidadmedidaService.mensajeCambio.subscribe((data) => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000,
      });
    });

    this.UnidadmedidaService.listar().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(unidadmedida?: UnidadMedida) {

    let uni = unidadmedida != null ? unidadmedida: new UnidadMedida();

    this.dialog.open(UnidadmedidaDialogComponent, {
      width: '300px',
      data: uni,
    });
  }
}
