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
import { UpdateCriticaPeliComponent} from './update-critica-peli/update-critica-peli.component';
import { UpdateCriticaSerieComponent} from './update-critica-serie/update-critica-serie.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { UpdatePerfilComponent } from './update-perfil/update-perfil.component';
import { BuscadorComponent } from './buscador/buscador.component';

const routes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'pelicula/:id', component: PeliculasComponent},
  {path: 'serie/:id', component: SeriesComponent},
  {path: 'profesional/:id', component: ProfesionalesComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'login', component: LoginComponent},
  {path: 'perfil', component: PerfilComponent},
  {path: 'addcriticaP/:id', component: AddCriticaComponent},
  {path: 'addcriticaS/:id', component: AddCriticaSerieComponent},
  {path: 'updatecriticaP/:pelicula/:critica', component: UpdateCriticaPeliComponent},
  {path: 'updatecriticaS/:serie/:critica', component: UpdateCriticaSerieComponent},
  {path: 'usuario/:id', component: UsuarioComponent},
  {path: 'updatePerfil/:id', component: UpdatePerfilComponent},
  {path: 'buscar/:titulo', component:BuscadorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
