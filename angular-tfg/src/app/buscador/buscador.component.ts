import { Component, OnInit } from '@angular/core';
import { Serie } from '../models/serie';
import { SerieService } from '../services/serie.service';
import { Pelicula } from '../models/pelicula';
import {PeliculaService} from '../services/pelicula.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Profesional } from '../models/profesional';
import { ProfesionalService } from '../services/profesional.service';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';


@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss']
})
export class BuscadorComponent implements OnInit {

  public peliculas: Pelicula[];
  public series: Serie[];
  public usuarios: Usuario[];
  public profesionales: Profesional[];
  public titulo: String;

  constructor(
    private _peliculaService: PeliculaService, 
    private _serieService: SerieService,
    private _profesionalService: ProfesionalService,
    private _usuarioService: UsuarioService,
    private _route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.titulo = params.titulo;
    });
    this.getPeliculas();
    this.getSeries();
    this.getProfesionales();
    this.getUsuarios();
  }

  getPeliculas(){
    this._peliculaService.getBuscarPeli(this.titulo).subscribe(
      response => {
        console.log(response);
        if (response.pelicula){
          this.peliculas = response.pelicula;
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  getSeries(){
    this._serieService.getBuscarSerie(this.titulo).subscribe(
      response => {
        console.log(response);
        if (response.serie){
          this.series = response.serie;
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }
  getProfesionales(){
    this._profesionalService.getBuscarPro(this.titulo).subscribe(
      response => {
        this.profesionales = response.profesional;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  getUsuarios(){
    this._usuarioService.getUsuarioNick(this.titulo).subscribe(
      response => {
        this.usuarios = response.usuario;
      },
      error => {
        console.log(<any>error);
      }
    )
  }


}
