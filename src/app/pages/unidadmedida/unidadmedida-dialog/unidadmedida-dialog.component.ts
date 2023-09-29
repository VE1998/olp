import { UnidadMedida } from './../../../_model/unidadmedida';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UnidadmedidaService } from 'src/app/_service/unidadmedida.service';

@Component({
  selector: 'app-unidadmedida-dialog',
  templateUrl: './unidadmedida-dialog.component.html',
  styleUrls: ['./unidadmedida-dialog.component.css'],
})
export class UnidadmedidaDialogComponent implements OnInit {
  um!: UnidadMedida;

  constructor(
    private dialogRef: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: UnidadMedida,
    private unidadmedidaService: UnidadmedidaService
  ) {}

  ngOnInit() {

    this.um = new UnidadMedida();
    this.um.codigo_um = this.data.codigo_um;
    (this.um.descripcion = this.data.descripcion),
      (this.um.codigo_onu = this.data.codigo_onu);
    this.um.codigo_sunat = this.data.codigo_sunat;
  }

  cancelar() {
    this.dialogRef.closeAll();
  }

  operar() {debugger
    if (this.um != null && this.um.codigo_um != null) {debugger
      this.unidadmedidaService.modificar(this.um).subscribe(() => {
        this.unidadmedidaService.listar().subscribe((um) => {
          this.unidadmedidaService.unidadMedidaCambio.next(um);
          this.unidadmedidaService.mensajeCambio.next('Modificacion Correcta');
        });
      });
    } else {
      this.unidadmedidaService.registrar(this.um).subscribe(() => {
        this.unidadmedidaService.listar().subscribe((um) => {
          this.unidadmedidaService.unidadMedidaCambio.next(um);
          this.unidadmedidaService.mensajeCambio.next('Registro Correcto');
        });
      });
    }
    this.dialogRef.closeAll();
  }
}
