import { Component, OnInit, DoCheck } from '@angular/core';
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
export class BuscadorComponent implements OnInit, DoCheck {

  public peliculas: Pelicula[];
  public series: Serie[];
  public usuarios: Usuario[];
  public profesionales: Profesional[];
  public titulo: String;
  public prevTitulo: String;
  public status = 'false';
  public generos = ['comedia','drama','accion','aventura','romance','suspense','animacion','familia','fantasia',
        'ciencia ficcion','crimen','historica','belica','western','misterio','terror','musica']

  constructor(
    private _peliculaService: PeliculaService, 
    private _serieService: SerieService,
    private _profesionalService: ProfesionalService,
    private _usuarioService: UsuarioService,
    private _route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    const removeAccents = (str) => {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    } 
    this._route.params.subscribe(params => {
      this.titulo = params.titulo;
    });
    this.prevTitulo = this.titulo;
    const titulogen = removeAccents(this.titulo.toLowerCase());
    for (const i in this.generos){
      if(titulogen === this.generos[i]){
        console.log('entra');
        this.getPeliGenero();
        this.getSerieGenero();
        this.status = 'true';
      }
    }
    /*if(status = 'false'){
      this.getPeliculas();
    }*/
    this.getPeliculas();
    this.getSeries();
    this.getProfesionales();
    this.getUsuarios();
  }


  ngDoCheck(){
    if(this.titulo != this.prevTitulo){
      window.location.reload();
    } 
  }

  getPeliGenero(){
    this._peliculaService.getPeliGenero(this.titulo).subscribe(
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

  getSerieGenero(){
    this._serieService.getSerieGenero(this.titulo).subscribe(
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
