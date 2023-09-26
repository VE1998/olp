import { Sector } from 'src/app/_model/sector';
import { SectorService } from './../../_service/sector.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.css']
})
export class SectorComponent implements OnInit {


  dataSource!: MatTableDataSource<Sector>;
  displeyedColumns = ['id_sector', 'nombre', 'codigo_tony', 'region', 'acciones'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;


 constructor(private sectorComponent : SectorService, private snackBar: MatSnackBar){}

  ngOnInit(){

  this.sectorComponent.sectorCambio.subscribe(data =>{
    this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
  });

  this.sectorComponent.mensajeCambio.subscribe( data => {
    this.snackBar.open(data, 'AVISO', {
      duration: 2000
    });
  });


    this.sectorComponent.listar().subscribe(data => {
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


}
