import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
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
  public upComentario: String;
  public peliculaId: String;
  public token: String;
  public comentarioForm: FormGroup;
  public texto = new FormControl('', [Validators.maxLength(250)]);
  public uptexto = new FormControl('', [Validators.maxLength(250)]);
  public nota = new FormControl();
  public criticaUsuario = false;
  public miCritica: Object;
  public identidad;
  public generos: String;
  public newNota: Object;
  public modal: String;
  public comentarioDel: String;
  public aux = false;
  public video: Boolean;
  @ViewChild("inputUpdate") inputUpdate: ElementRef;

  constructor(
    private sanitizer: DomSanitizer,
    private _peliculaService: PeliculaService,
    private _profesionalService: ProfesionalService,
    private _usuarioService: UsuarioService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.status = 'critica';
    this._route.params.subscribe(params => {
      this.peliculaId = params.id;
      this.getPelicula();
    });
    this.usuario = this._usuarioService.getIdentidad();
    this.token = this._usuarioService.getToken();
  }



  usuarioPelicula() {
    for (let i = 0; i < this.pelicula.criticas.length; i++) {
      if (this.pelicula.criticas[i].usuario == this.usuario._id) {
        this.nota.setValue(this.pelicula.criticas[i].nota);
        if (this.pelicula.criticas[i].texto) {
          this.criticaUsuario = true;
          this.miCritica = this.pelicula.criticas[i];
        }
        break;
      }
    }
  }

  updateVideoUrl(trailer: string) {
    console.log(trailer);
    this.video = true;
    this.videoUrl =
      this.sanitizer.bypassSecurityTrustResourceUrl(trailer);
  }

  getPelicula() {
    this._peliculaService.getPeliculaId(this.peliculaId).subscribe(
      response => {
        console.log(response.pelicula);
        this.pelicula = response.pelicula;
        this.generos = this.pelicula.generos.join(' | ');
        if (response.pelicula.criticas) {
          response.pelicula.criticas.forEach(element => {
            if (element.texto) {
              element.texto = element.texto.split("\n").join("<br>");
              console.log(element);
            }
          });
        }
        if (response.pelicula.trailer_es) {
          this.updateVideoUrl(response.pelicula.trailer_es);
        } else if(response.pelicula.trailer_en){
          this.updateVideoUrl(response.pelicula.trailer_en);
        } else{
          this.video = false;
        }

        if (this.usuario) {
          this.usuarioPelicula();
        }
      },
      error => {
        console.log(<any>error);
        if (error.status === 404 || error.status === 500) {
          this._router.navigate(['/error']);
        }
      }
    )
  }

  getProfesionalN(nombre) {
    this._profesionalService.getProfesionalN(nombre).subscribe(
      response => {
        this.profesionales = response.profesional;
        this.profesional = this.profesionales[0];
        this._router.navigate(['/profesional/', this.profesional._id]);
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  addCritica() {
    //this.usuario = this._usuarioService.getIdentidad();
    if (this.usuario == null) {
      //alert("Necesitas iniciar sesión");
      this.modal = 'userCritica';
      //this._router.navigate(['/login']);
    } else {
      this._router.navigate(['/addcriticaP/', this.pelicula._id]);
    }
  }

  reloadUsuario() {
    this._usuarioService.getPerfil(this.usuario._id, this.token).subscribe(
      response => {
        this.identidad = response;
        localStorage.setItem('identidad', JSON.stringify(this.identidad.usuario));
        if (this.modal === 'deleteCritica') {
          this.criticaUsuario = false;
          this.nota.setValue(null);
        }
        this.modal = null;
        this.ngOnInit();
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  deleteCritica(critica) {
    console.log('borrar='+critica);
    console.log(critica);
    this._peliculaService.deleteCritica(this.peliculaId, this.usuario._id, critica, this.token).subscribe(
      response => {
        if (response.message == 'Eliminada') {
          this.modal = 'deleteCritica';
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  addNota(): void {
    this.newNota = {
      nota: this.nota.value,
      usuario: this.usuario._id,
      peliculaId: this.peliculaId
    }
    this._peliculaService.saveNota(this.newNota, this.token).subscribe(
      response => {
        console.log(response);
        if (response.message == 'Guardado') {
          this.modal = 'addNota';
        }
        if (response.message == 'Eliminada') {
          this.modal = 'deleteNota';
        }
        if (response.message == 'Error-nota') {
          this.modal = 'errorNota';
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  addComentario(): void {
    if (this.texto.value != "") {
      console.log('-------')
      console.log(this.usuario)
      console.log('-------')
      if (this.usuario == null) {
        this.modal = 'userComentario';
      } else {
        this.newComentario = {
          texto: this.texto.value,
          usuarioId: this.usuario._id,
          peliculaId: this.peliculaId
        }
        this._peliculaService.saveComentario(this.newComentario, this.token).subscribe(
          response => {
            console.log(response);
            if (response.message == 'Guardado') {
              this.texto.setValue('');
              this.ngOnInit();
            }
          },
          error => {
            console.log(<any>error);
          }
        );
      }
    }
  }

  updateComentario(comentario): void {
    if (this.uptexto.value != "") {
      console.log(this.uptexto.value);
      if (this.usuario == null) {
        //alert("Necesitas iniciar sesión");
        //this._router.navigate(['/login']);
        this.modal = 'userComentario';
      } else {
        this.newComentario = {
          comentarioId: comentario,
          texto: this.uptexto.value,
          usuarioId: this.usuario._id,
          peliculaId: this.peliculaId
        }
        this._peliculaService.updateComentario(this.newComentario, this.token).subscribe(
          response => {
            console.log(response);
            if (response.message == 'Modificado') {
              this.upComentario = null;
              this.uptexto.setValue('');
              this.ngOnInit();
            }
          },
          error => {
            console.log(<any>error);
          }
        );
      }
    }
  }

  modalDelComen(comentario) {
    this.comentarioDel = comentario;
    this.modal = 'eliminarComentario';
  }

  deleteComentario() {
    //if(window.confirm('¿Estas seguro de eliminar el comentario?')){
    this._peliculaService.deleteComentario(this.peliculaId, this.usuario._id, this.comentarioDel, this.token).subscribe(
      response => {
        if (response.message == 'Eliminado') {
          //alert('El comentario se ha eliminado correctamente');
          this.modal = null;
          this.ngOnInit();
        }
      },
      error => {
        console.log(<any>error);
      }
    )

  }

  comentarioUp(comentarioId) {
    console.log('up');
    /*this.comentarioText.nativeElement.style.display = "none";
    this.inputUpdate.nativeElement.style.display = "block";*/
    this.upComentario = comentarioId;
    this.aux = false;
  }

  @HostListener('window:click', ['$event'])
  displayUpdate(event) {
    if (this.upComentario) {
      console.log(this.inputUpdate.nativeElement);
      let objetivo = event.target.parentNode;
      console.log("-------");
      console.log(objetivo);
      if (objetivo != this.inputUpdate.nativeElement) {
        if (this.aux) {
          this.upComentario = null;
        }
        this.aux = true;
      }
    }

  }

}
