import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../models/pelicula';
import { Serie } from '../models/serie';
import { PeliculaService } from '../services/pelicula.service';
import { SerieService } from '../services/serie.service';
import {FormControl} from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  public peliculasA: Pelicula[];
  public peliculasP: Pelicula[];
  public seriesA: Serie[];
  public seriesP: Serie[];
  public statusPeli: String;
  public statusSerie: String;
  constructor(private _peliculaService: PeliculaService, private _serieService: SerieService) {}

  ngOnInit(): void {
    this.statusPeli = 'actual';
    this.statusSerie = 'actual';
    this.getPeliculas();
    this.getPelisP();
    this.getSeries();
    this.getSeriesP();
  }

  getPeliculas(){
    this._peliculaService.getPeliculas().subscribe(
      response => {
        console.log(response);
        if (response.pelicula){
          this.peliculasA = response.pelicula;
          console.log(this.peliculasA);
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  getPelisP(){
    this._peliculaService.getPelisP().subscribe(
      response => {
        console.log(response);
        if (response.pelicula){
          this.peliculasP = response.pelicula;
          console.log(this.peliculasP)
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  getSeries(){
    this._serieService.getSeries().subscribe(
      response => {
        console.log(response);
        if (response.serie){
          this.seriesA = response.serie;
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  getSeriesP(){
    this._serieService.getSeriesP().subscribe(
      response => {
        console.log(response);
        if (response.serie){
          this.seriesP = response.serie;
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

}
