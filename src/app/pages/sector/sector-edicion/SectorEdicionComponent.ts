import { Sector } from './../../../_model/sector';
import { SectorService } from './../../../_service/sector.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';

@Component({
  selector: 'app-sector-edicion',
  templateUrl: './sector-edicion.component.html',
  styleUrls: ['./sector-edicion.component.css'],
})
export class SectorEdicionComponent implements OnInit {
  form!: FormGroup;
  ngform!: NgForm;

  id_sector!: number;
  editar!: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sectorService: SectorService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      id_sector: new FormControl(0),
      nombre: new FormControl(''),
      codigo_tony: new FormControl(''),
      region: new FormControl(''),
    });

    this.route.params.subscribe((params: Params) => {
      this.id_sector = params['id_sector'];
      this.editar = params['id_sector'] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.editar) {
      this.sectorService.listaPorId(this.id_sector).subscribe((data) => {
        this.form = new FormGroup({
          id_sector: new FormControl(data.id_sector),
          nombre: new FormControl(data.nombre),
          codigo_tony: new FormControl(data.codigo_tony),
          region: new FormControl(data.region),
        });
      });
    }
  }

  operar() {
    let sector = new Sector();
    sector.id_sector = this.form.value['id_sector'];
    sector.nombre = this.form.value['nombre'];
    sector.codigo_tony = this.form.value['codigo_tony'];
    sector.region = this.form.value['region'];

    if (this.editar) {
      this.sectorService.modificar(sector).subscribe(() => {
        this.sectorService.listar().subscribe((data) => {
          this.sectorService.sectorCambio.next(data);
          this.sectorService.mensajeCambio.next('SE MODIFICO');
        });
      });
    } else {
      this.sectorService.registrar(sector).subscribe(() => {
        this.sectorService.listar().subscribe((data) => {
          this.sectorService.sectorCambio.next(data);
          this.sectorService.mensajeCambio.next('REGISTRO CORRECTO');
        });
      });
    }
    this.router.navigate(['sector']);
  }
}
