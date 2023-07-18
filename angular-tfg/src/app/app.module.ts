import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PeliculasComponent } from './peliculas/peliculas.component';
import { SeriesComponent } from './series/series.component';
import { ProfesionalesComponent } from './profesionales/profesionales.component';
import { InicioComponent } from './inicio/inicio.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { PerfilComponent } from './perfil/perfil.component';
import {BrowserAnimationsModule} from'@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { AddCriticaComponent } from './add-critica/add-critica.component';
import { AddCriticaSerieComponent } from './add-critica-serie/add-critica-serie.component';
import { UpdateCriticaPeliComponent } from './update-critica-peli/update-critica-peli.component';
import { UpdateCriticaSerieComponent } from './update-critica-serie/update-critica-serie.component';
import { UpdatePerfilComponent } from './update-perfil/update-perfil.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { ErrorComponent } from './error/error.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { AdminComponent } from './admin/admin.component';
import { OrderByPipe } from './pipes/orderBy.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PeliculasComponent,
    SeriesComponent,
    ProfesionalesComponent,
    InicioComponent,
    RegistroComponent,
    LoginComponent,
    PerfilComponent,
    AddCriticaComponent,
    AddCriticaSerieComponent,
    UpdateCriticaPeliComponent,
    UpdateCriticaSerieComponent,
    UpdatePerfilComponent,
    UsuarioComponent,
    BuscadorComponent,
    ErrorComponent,
    ConfirmComponent,
    AdminComponent,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
