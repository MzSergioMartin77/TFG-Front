import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../models/pelicula';
import { PeliculaService } from '../services/pelicula.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Profesional } from '../models/profesional';
import { ProfesionalService } from '../services/profesional.service';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
  public usuario: Usuario;
  public status: String;
  public newComentario: Object;
  public peliculaId: String;
  public token: String;
  public comentarioForm: FormGroup;
  public texto = new FormControl('');

  constructor(
    private sanitizer: DomSanitizer,
    private _peliculaService: PeliculaService,
    private _profesionalService: ProfesionalService,
    private _usuarioService: UsuarioService,
    private _route: ActivatedRoute,
    private _router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.status = 'critica';
    this._route.params.subscribe(params => {
      this.peliculaId = params.id;
      this.getPelicula(this.peliculaId);
    });
    this.usuario = this._usuarioService.getIdentidad();
    this.token = this._usuarioService.getToken();
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

  addCritica(){
    //this.usuario = this._usuarioService.getIdentidad();
    if(this.usuario == null){
      alert("Necesitas iniciar sesión");
      this._router.navigate(['/login']);
    }else {
      this._router.navigate(['/addcriticaP/',this.pelicula._id]);
    }
  }

  statusCritica(){
    this.status = 'critica';
  }

  statusComentario(){
    this.status = 'comentario';
  }

  addComentario(): void{
    if(this.usuario == null){
      alert("Necesitas iniciar sesión");
      this._router.navigate(['/login']);
    }else{
      this.newComentario = {
        texto: this.texto.value,
        usuarioId: this.usuario._id,
        peliculaId: this.peliculaId
      }
      this._peliculaService.saveComentario(this.newComentario, this.token).subscribe(
        response => {
          console.log(response);
          if (response.message == 'Guardado') {
            console.log('nada');
            window.location.reload(); 
          }
        },
        error => {
          console.log(<any>error);
        }
      );
    }
    
  }

}
