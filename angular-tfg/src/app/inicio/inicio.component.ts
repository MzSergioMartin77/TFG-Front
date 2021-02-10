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
  public peliculas: Pelicula[];
  public series: Serie[];
  constructor(private _peliculaService: PeliculaService, private _serieService: SerieService) {}

  ngOnInit(): void {
    this.getPeliculas();
    this.getSeries();
  }

  getPeliculas(){
    this._peliculaService.getPeliculas().subscribe(
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
    this._serieService.getSeries().subscribe(
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

}
