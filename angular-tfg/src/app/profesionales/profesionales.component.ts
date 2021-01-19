import { Component, OnInit } from '@angular/core';
import { Profesional } from '../models/profesional';
import { ProfesionalService } from '../services/profesional.service';
import { Pelicula } from '../models/pelicula';
import { PeliculaService } from '../services/pelicula.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Serie } from '../models/serie';
import { SerieService } from '../services/serie.service';

@Component({
  selector: 'app-profesionales',
  templateUrl: './profesionales.component.html',
  styleUrls: ['./profesionales.component.scss']
})
export class ProfesionalesComponent implements OnInit {

  //public profesionales: Profesional[];
  public profesional: Profesional;
  public peliculas: Pelicula[];
  public pelicula: Pelicula;
  public series: Serie[];  
  public serie: Serie;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _profesionalService: ProfesionalService,
    private _peliculaService: PeliculaService,
    private _serieService: SerieService
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params.id;
      this.getProfesional(id);
      console.log(this.profesional);
    });
  }

  getProfesional(id){
    this._profesionalService.getProfesionalId(id).subscribe(
      response => {
        this.profesional = response.profesional;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  /*getProfesionalN(nombre){
    this._profesionalService.getProfesionalN(nombre).subscribe(
      response => {
        this.profesionales = response.profesional;
        this.profesional = this.profesionales[0];
      },
      error => {
        console.log(<any>error);
      }
    )
  }*/

  getPeliculaT(titulo){
    this._peliculaService.getPeliculaT(titulo).subscribe(
      response => {
        this.peliculas = response.pelicula;
        this.pelicula = this.peliculas[0];
        this._router.navigate(['/pelicula/',this.pelicula._id]);
      },
      error => {
        console.log(<any>error);
      }
    )

  }

  getSerieT(titulo){
    this._serieService.getSerieT(titulo).subscribe(
      response => {
        this.series = response.serie;
        this.serie = this.series[0];
        this._router.navigate(['/serie/',this.serie._id]);
      },
      error => {
        console.log(<any>error);
      }
    )

  }

  getPelicula(titulo): void{
    console.log(titulo);
    this.getPeliculaT(titulo); 
  }

  getSerie(titulo): void{
    this.getSerieT(titulo);
  }

}
