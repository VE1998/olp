import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectorComponent } from './pages/sector/sector.component';
import { SectorEdicionComponent } from './pages/sector/sector-edicion/SectorEdicionComponent';

const routes: Routes = [
  { path: 'sector', component: SectorComponent, children: [
    { path: 'nuevo', component: SectorEdicionComponent},
    { path: 'editar/:id_sector', component: SectorEdicionComponent}
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
