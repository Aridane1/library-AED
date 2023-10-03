import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlquilanComponent } from './alquilan/alquilan.component';
import { EdicionesComponent } from './ediciones/ediciones.component';
import { EditadosComponent } from './editados/editados.component';
import { LibrosComponent } from './libros/libros.component';
import { SociosComponent } from './socios/socios.component';
import { VolumenesComponent } from './volumenes/volumenes.component';

const routes: Routes = [
  { path: 'alquilan', component: AlquilanComponent },
  { path: 'ediciones', component: EdicionesComponent },
  { path: 'editados', component: EditadosComponent },
  { path: 'libros', component: LibrosComponent },
  { path: 'socios', component: SociosComponent },
  { path: 'volumenes', component: VolumenesComponent },
  { path: '', redirectTo: '/app', pathMatch: 'full' },


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
