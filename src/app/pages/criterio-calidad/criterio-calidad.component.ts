import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CriterioCalidad } from 'src/app/_model/criterio_calidad';
import { CriteriocalidadService } from 'src/app/_service/criteriocalidad.service';
import { CriteriocalidadDialogComponent } from './criteriocalidad-dialog/criteriocalidad-dialog.component';

@Component({
  selector: 'app-criterio-calidad',
  templateUrl: './criterio-calidad.component.html',
  styleUrls: ['./criterio-calidad.component.css']
})
export class CriterioCalidadComponent implements OnInit{

  dataSource!: MatTableDataSource<CriterioCalidad>;
  displeyedColumns = [
    'id',
    'descripcion',
    'unidad_medida',
    'castigo',
    'forma_castigo',
    'factor_catigo',
    'acciones',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private criterioCalidadService: CriteriocalidadService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog)
    {}



  ngOnInit() {

    this.criterioCalidadService.listar().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

  }

  openDialog(criteriocalidad?: CriterioCalidad) {

    let crit = criteriocalidad != null ? criteriocalidad: new CriterioCalidad();

    this.dialog.open(CriteriocalidadDialogComponent, {
      width: '400px',
      data: crit,
    });
  }

}
