import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { Banco } from 'src/app/_model/banco';
import { BancoService } from 'src/app/_service/banco.service';

@Component({
  selector: 'app-banco-dialog',
  templateUrl: './banco-dialog.component.html',
  styleUrls: ['./banco-dialog.component.css']
})
export class BancoDialogComponent implements OnInit{

   ban !: Banco;

   constructor(
    private dialogRef: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: Banco,
    private BancoService: BancoService
   ){}

  ngOnInit() {

    this.ban = new Banco();
    this.ban.id_banco = this.data.id_banco;
    (this.ban.nombre = this.data.nombre);
    (this.ban.descripcion = this.data.descripcion);
  }

  cancelar() {
    this.dialogRef.closeAll();
  }

  operar() {
    if (this.ban != null && this.ban.id_banco != null) {
      this.BancoService
        .modificar(this.ban)
        .pipe(
          switchMap(() => {
            return this.BancoService.listar();
          })
        )
        .subscribe((banco) => {
          this.BancoService.bancoCambio.next(banco);
          this.BancoService.mensajeCambio.next('MODIFICACION CORRECTA');
        });
    } else {
      this.BancoService.registrar(this.ban).subscribe(() => {
        this.BancoService.listar().subscribe((um) => {
          this.BancoService.bancoCambio.next(um);
          this.BancoService.mensajeCambio.next('Registro Correcto');
        });
      });
    }
    this.dialogRef.closeAll();
  }


}
