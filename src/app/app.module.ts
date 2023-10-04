import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { SociosComponent } from './socios/socios.component';
import { LibrosComponent } from './libros/libros.component';
import { EdicionesComponent } from './ediciones/ediciones.component';
import { EditadosComponent } from './editados/editados.component';
import { VolumenesComponent } from './volumenes/volumenes.component';
import { AlquilanComponent } from './alquilan/alquilan.component';

@NgModule({
  declarations: [
    AppComponent,
    SociosComponent,
    LibrosComponent,
    EdicionesComponent,
    EditadosComponent,
    VolumenesComponent,
    AlquilanComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
