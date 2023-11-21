import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SectorComponent } from './pages/sector/sector.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { SectorEdicionComponent } from './pages/sector/sector-edicion/SectorEdicionComponent';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { UnidadmedidaComponent } from './pages/unidadmedida/unidadmedida.component';
import { UnidadmedidaDialogComponent } from './pages/unidadmedida/unidadmedida-dialog/unidadmedida-dialog.component';
import { CriteriocalidadComponent } from './pages/criteriocalidad/criteriocalidad.component';
import { CriteriocalidadDialogComponent } from './pages/criteriocalidad/criteriocalidad-dialog/criteriocalidad-dialog.component';
import { TipoOeracionComponent } from './pages/tipo-operacion/tipo-oeracion.component';
import { TipoOperacionDialogComponent } from './pages/tipo-operacion/tipo-operacion-dialog/tipo-operacion-dialog.component';
import { BancoComponent } from './pages/banco/banco.component';
import { BancoDialogComponent } from './pages/banco/banco-dialog/banco-dialog.component';
import { ClasificacionContableComponent } from './pages/clasificacion-contable/clasificacion-contable.component';
import { ClasificacionComponent } from './pages/clasificacion/clasificacion.component';
import { ConductorComponent } from './pages/conductor/conductor.component';
import { CriterioCalidadComponent } from './pages/criterio-calidad/criterio-calidad.component';
import { CuentaBancariaComponent } from './pages/cuenta-bancaria/cuenta-bancaria.component';
import { EmpresaTransporteComponent } from './pages/empresa-transporte/empresa-transporte.component';
import { EvaluacionCalidadComponent } from './pages/evaluacion-calidad/evaluacion-calidad.component';
import { ParcelaComponent } from './pages/parcela/parcela.component';
import { PersonaComponent } from './pages/persona/persona.component';
import { PesajeComponent } from './pages/pesaje/pesaje.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { ProveedorComponent } from './pages/proveedor/proveedor.component';
import { VehiculoComponent } from './pages/vehiculo/vehiculo.component';


@NgModule({
  declarations: [
    AppComponent,
    SectorComponent,
    SectorEdicionComponent,
    UnidadmedidaComponent,
    UnidadmedidaDialogComponent,
    CriteriocalidadComponent,
    CriteriocalidadDialogComponent,
    TipoOeracionComponent,
    TipoOperacionDialogComponent,
    BancoComponent,
    BancoDialogComponent,
    ClasificacionContableComponent,
    ClasificacionComponent,
    ConductorComponent,
    CriterioCalidadComponent,
    CuentaBancariaComponent,
    EmpresaTransporteComponent,
    EvaluacionCalidadComponent,
    ParcelaComponent,
    PersonaComponent,
    PesajeComponent,
    ProductoComponent,
    ProveedorComponent,
    VehiculoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
