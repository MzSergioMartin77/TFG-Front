import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../models/pelicula';
import { PeliculaService } from '../services/pelicula.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.scss'],
  providers: [PeliculaService]
})
export class PeliculasComponent implements OnInit {
  public pelicula: Pelicula;
  videoUrl: SafeResourceUrl;

  constructor(
    private sanitizer: DomSanitizer,
    private _peliculaService: PeliculaService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params.id;
      this.getPelicula(id);
    });
  }
  updateVideoUrl(trailer: string) {
    console.log(trailer);
    this.videoUrl =
        this.sanitizer.bypassSecurityTrustResourceUrl(trailer);
  }


  getPelicula(id){
    this._peliculaService.getPeliculaId(id).subscribe(
      response => {
        this.pelicula = response.pelicula;
        console.log(this.pelicula);
        this.updateVideoUrl(response.pelicula.trailer);
      },
      error => {
        console.log(<any>error);
      }
    )
  }

}
