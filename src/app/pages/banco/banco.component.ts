import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Banco } from 'src/app/_model/banco';
import { BancoService } from 'src/app/_service/banco.service';
import { BancoDialogComponent } from './banco-dialog/banco-dialog.component';

@Component({
  selector: 'app-banco',
  templateUrl: './banco.component.html',
  styleUrls: ['./banco.component.css']
})
export class BancoComponent implements OnInit{

  dataSource!: MatTableDataSource<Banco>;

  displeyedColumns = [
    'id_banco',
    'nombre',
    'descripcion',
    'acciones',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private BancoService: BancoService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,

  ) {}

  ngOnInit() {
    this.BancoService.bancoCambio.subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.BancoService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000
      });
    });

    this.BancoService.bancoCambio.subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.BancoService.mensajeCambio.subscribe((data) => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000,
      });
    });

    this.BancoService.listar().subscribe((data) => {
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

  openDialog(banco?: Banco) {

    let ban = banco != null ? banco: new Banco();

    this.dialog.open(BancoDialogComponent, {
      width: '300px',
      data: ban,
    });
  }

}
