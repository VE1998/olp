import { Sector } from 'src/app/_model/sector';
import { SectorService } from './../../_service/sector.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.css']
})
export class SectorComponent implements OnInit {


  sectores : Sector[] | undefined;

 constructor(private sectorComponent : SectorService){}

  ngOnInit(){

    this.sectorComponent.listar().subscribe(data => {
      this.sectores = data;
    });

  }

}
