import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Pesaje } from 'src/app/_model/pesaje';
import { PesajeService } from 'src/app/_service/pesaje.service';

@Component({
  selector: 'app-destarar-dialog',
  templateUrl: './destarar-dialog.component.html',
  styleUrls: ['./destarar-dialog.component.css']
})
export class DestararDialogComponent implements OnInit{

  pesajes!: Pesaje;

  constructor(
    private dialogRef: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: Pesaje,
    private PesajeService: PesajeService
   ){}

  ngOnInit() {

    this.pesajes = new Pesaje();
    this.pesajes.num_ticket = this.data.num_ticket;
    this.pesajes.persona.nombres = this.data.persona.nombres;


  }

  cancelar() {
    this.dialogRef.closeAll();
  }

}
