import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectorComponent } from './pages/sector/sector.component';
import { SectorEdicionComponent } from './pages/sector/sector-edicion/SectorEdicionComponent';
import { UnidadmedidaComponent } from './pages/unidadmedida/unidadmedida.component';
import { CriteriocalidadComponent } from './pages/criteriocalidad/criteriocalidad.component';

const routes: Routes = [
  { path: 'sector', component: SectorComponent, children: [
    { path: 'nuevo', component: SectorEdicionComponent},
    { path: 'editar/:id_sector', component: SectorEdicionComponent}
  ] },
  { path: 'unidadmedida', component: UnidadmedidaComponent},
  { path: 'criteriocalidad', component: CriteriocalidadComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
