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
  public criticaUsuario = false;
  public miCritica: Object;
  public identidad;
  public generos: String;

  constructor(
    private sanitizer: DomSanitizer,
    private _peliculaService: PeliculaService,
    private _profesionalService: ProfesionalService,
    private _usuarioService: UsuarioService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.status = 'critica';
    this._route.params.subscribe(params => {
      this.peliculaId = params.id;
      this.getPelicula();
    });
    this.usuario = this._usuarioService.getIdentidad();
    this.token = this._usuarioService.getToken();
  }

  usuarioPelicula(){
    for(let i=0; i<this.pelicula.criticas.length; i++){
      if(this.pelicula.criticas[i].usuario == this.usuario._id){
        if(this.pelicula.criticas[i].texto){
          this.criticaUsuario = true;
          this.miCritica = this.pelicula.criticas[i];
        }
        break;
      }
    }
    /*this.pelicula.criticas.forEach(element => {
      if(element.usuario == this.usuario._id){
        if(element.texto){
          this.criticaUsuario = true;
          this.miCritica = element;
        }
      }
    });*/
  }

  updateVideoUrl(trailer: string) {
    console.log(trailer);
    this.videoUrl =
        this.sanitizer.bypassSecurityTrustResourceUrl(trailer);
  }

  getPelicula(){
    this._peliculaService.getPeliculaId(this.peliculaId).subscribe(
      response => {
        this.pelicula = response.pelicula;
        this.generos = this.pelicula.generos.join(' | ');
        this.updateVideoUrl(response.pelicula.trailer);
        if(this.usuario){
          this.usuarioPelicula();
        }
      },
      error => {
        console.log(<any>error);
        if(error.status === 404 || error.status === 500){
          alert('Esta película no se encuentra en la base de datos');
          this._router.navigate(['/']);
        }
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

  reloadUsuario(){
    this._usuarioService.getPerfil(this.usuario._id, this.token).subscribe(
      response => {
        this.identidad = response;
        console.log(this.identidad);
        localStorage.setItem('identidad', JSON.stringify(this.identidad.usuario));
        alert('La crítica se ha eliminado correctamente');
        window.location.reload();
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  deleteCritica(){
    if(window.confirm('¿Estas seguro de eliminar la crítica?')){
      console.log('borrar');
      this._peliculaService.deleteCritica(this.peliculaId, this.usuario._id, this.token).subscribe(
        response => {
          if(response.message == 'Eliminada'){
            this.reloadUsuario();
          }
        },
        error => {
          console.log(<any>error);
        }
      )
    }
  }

  statusCritica(){
    this.status = 'critica';
  }

  statusComentario(){
    this.status = 'comentario';
  }

  addComentario(): void{
    if(this.texto.value != ""){
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
    console.log('vacio')
  }

}
