import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectorComponent } from './pages/sector/sector.component';
import { SectorEdicionComponent } from './pages/sector/sector-edicion/SectorEdicionComponent';
import { UnidadmedidaComponent } from './pages/unidadmedida/unidadmedida.component';
import { CriteriocalidadComponent } from './pages/criteriocalidad/criteriocalidad.component';
import { TipoOeracionComponent } from './pages/tipo-operacion/tipo-oeracion.component';
import { BancoComponent } from './pages/banco/banco.component';
import { EvaluacionCalidadComponent } from './pages/evaluacion-calidad/evaluacion-calidad.component';
import { DestararComponent } from './pages/destarar/destarar.component';

const routes: Routes = [
  { path: 'sector', component: SectorComponent, children: [
    { path: 'nuevo', component: SectorEdicionComponent},
    { path: 'editar/:id_sector', component: SectorEdicionComponent}
  ] },
  { path: 'unidadmedida', component: UnidadmedidaComponent},
  { path: 'criteriocalidad', component: CriteriocalidadComponent},
  { path: 'tipo_operacion', component: TipoOeracionComponent},
  { path: 'bancos', component: BancoComponent},
  { path: 'evaluacion', component: EvaluacionCalidadComponent},
  { path: 'destarar', component: DestararComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
