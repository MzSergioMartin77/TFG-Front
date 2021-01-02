import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioComponent } from './inicio/inicio.component';
import { PeliculasComponent } from './peliculas/peliculas.component';
import { SeriesComponent } from './series/series.component';
import { ProfesionalesComponent } from './profesionales/profesionales.component';

const routes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'pelicula/:id', component: PeliculasComponent},
  {path: 'pelicula/t/:titulo', component: PeliculasComponent},
  {path: 'serie/:id', component: SeriesComponent},
  {path: 'profesional/n/:nombre', component: ProfesionalesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
