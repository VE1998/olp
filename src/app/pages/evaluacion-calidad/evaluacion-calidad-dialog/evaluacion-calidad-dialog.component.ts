import { Component } from '@angular/core';
import { Pesaje } from 'src/app/_model/pesaje';

@Component({
  selector: 'app-evaluacion-calidad-dialog',
  templateUrl: './evaluacion-calidad-dialog.component.html',
  styleUrls: ['./evaluacion-calidad-dialog.component.css']
})
export class EvaluacionCalidadDialogComponent {

  pesa !: Pesaje;

}
