import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioComponent } from './inicio/inicio.component';
import { PeliculasComponent } from './peliculas/peliculas.component';
import { SeriesComponent } from './series/series.component';
import { ProfesionalesComponent } from './profesionales/profesionales.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AddCriticaComponent } from './add-critica/add-critica.component';
import { AddCriticaSerieComponent } from './add-critica-serie/add-critica-serie.component';

const routes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'pelicula/:id', component: PeliculasComponent},
  {path: 'serie/:id', component: SeriesComponent},
  {path: 'profesional/:id', component: ProfesionalesComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'login', component: LoginComponent},
  {path: 'perfil', component: PerfilComponent},
  {path: 'addcriticaP/:id', component: AddCriticaComponent},
  {path: 'addcriticaS/:id', component: AddCriticaSerieComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
