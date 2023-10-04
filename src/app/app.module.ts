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
