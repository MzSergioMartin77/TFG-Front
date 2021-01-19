import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../models/pelicula';
import { PeliculaService } from '../services/pelicula.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Profesional } from '../models/profesional';
import { ProfesionalService } from '../services/profesional.service';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.scss']
})
export class PeliculasComponent implements OnInit {

  public pelicula: Pelicula;
  videoUrl: SafeResourceUrl;
  public profesionales: Profesional[];
  public profesional: Profesional;

  constructor(
    private sanitizer: DomSanitizer,
    private _peliculaService: PeliculaService,
    private _profesionalService: ProfesionalService,
    private _route: ActivatedRoute,
    private _router: Router
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

  getProfesionalN(nombre){
    this._profesionalService.getProfesionalN(nombre).subscribe(
      response => {
        this.profesionales = response.profesional;
        this.profesional = this.profesionales[0];
        this._router.navigate(['/profesional/',this.profesional._id]);
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  getProfesional(nombre){
    this.getProfesionalN(nombre);
  }

}
