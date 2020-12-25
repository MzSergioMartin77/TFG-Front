import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../models/pelicula';
import { PeliculaService } from '../services/pelicula.service';
import {FormControl} from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
  providers: [PeliculaService]
})
export class InicioComponent implements OnInit {
  public peliculas: Pelicula[];
  constructor(private _peliculaService: PeliculaService) {}

  ngOnInit(): void {
    this.getPeliculas();
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

}
