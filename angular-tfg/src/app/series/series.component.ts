import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Serie } from '../models/serie';
import { SerieService } from '../services/serie.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Profesional } from '../models/profesional';
import { ProfesionalService } from '../services/profesional.service';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit {

  public serie: Serie;
  videoUrl: SafeResourceUrl;
  public profesionales: Profesional[];
  public profesional: Profesional;
  public usuario: Usuario;
  public status: String;
  public newComentario: Object;
  public upComentario: String;
  public serieId: String;
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
    private _route: ActivatedRoute,
    private _serieService: SerieService,
    private _profesionalService: ProfesionalService,
    private _router: Router,
    private _usuarioService: UsuarioService
    ) {}

  ngOnInit(): void {
    this.status = 'critica';
    this._route.params.subscribe(params => {
      this.serieId = params.id;
      this.getSerie();
    });
    this.usuario = this._usuarioService.getIdentidad();
    this.token = this._usuarioService.getToken();
  }

  usuarioSerie(){
    for(let i=0; i<this.serie.criticas.length; i++){
      if(this.serie.criticas[i].usuario == this.usuario._id){
        this.nota.setValue(this.serie.criticas[i].nota);
        if(this.serie.criticas[i].texto){
          this.criticaUsuario = true;
          this.miCritica = this.serie.criticas[i];
        }
        break;
      }
    }
    /*this.serie.criticas.forEach(element => {
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
    this.video = true;
    this.videoUrl =
        this.sanitizer.bypassSecurityTrustResourceUrl(trailer);
  }

  getSerie(){
    this._serieService.getSerieId(this.serieId).subscribe(
      response => {
        this.serie = response.serie;
        this.generos = this.serie.generos.join(' | ');
        if(response.serie.criticas){
          response.serie.criticas.forEach(element => {
            if(element.texto){
              element.texto = element.texto.split("\n").join("<br>");
              console.log(element);
            }
          });
        }
        if(response.serie.trailer_es){
          this.updateVideoUrl(response.serie.trailer_es);
        } else if(response.serie.trailer_en){
          this.updateVideoUrl(response.serie.trailer_en);
        } else {
          this.video = false;
        }
        if(this.usuario){
          this.usuarioSerie();
        }
      },
      error => {
        console.log(<any>error);
        if(error.status === 404 || error.status === 500){
          alert('Esta serie no se encuentra en la base de datos');
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
      //alert("Necesitas iniciar sesión");
      //this._router.navigate(['/login']);
      this.modal = 'userCritica';
    }else {
      this._router.navigate(['/addcriticaS/',this.serie._id]);
    }
  }

  reloadUsuario(){
    this._usuarioService.getPerfil(this.usuario._id, this.token).subscribe(
      response => {
        this.identidad = response;
        console.log(this.identidad);
        localStorage.setItem('identidad', JSON.stringify(this.identidad.usuario));
        this.modal = null;
        this.ngOnInit();
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  deleteCritica(){
    if(window.confirm('¿Estas seguro de eliminar la crítica?')){
      console.log('borrar');
      this._serieService.deleteCritica(this.serieId, this.usuario._id, this.token).subscribe(
        response => {
          if(response.message == 'Eliminada'){
            //alert('La crítica se ha eliminado correctamente');
            this.modal = 'deleteCritica';
            //this.reloadUsuario();
          }
        },
        error => {
          console.log(<any>error);
        }
      )
    }
  }

  /*statusCritica(){
    this.status = 'critica';
  }

  statusComentario(){
    this.status = 'comentario';
  }*/

  addNota(): void{
    this.newNota = {
      nota: this.nota.value,
      usuario: this.usuario._id,
      serieId: this.serieId
    }
    this._serieService.saveNota(this.newNota, this.token).subscribe(
      response => {
        console.log(response);
        if(response.message == 'Guardado'){
          //alert("Nota guardada");
          //this.reloadUsuario();
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

  addComentario(): void{
    if (this.texto.value != ""){
      if(this.usuario == null){
        this.modal = 'userComentario';
      }else{
        this.newComentario = {
          texto: this.texto.value,
          usuarioId: this.usuario._id,
          serieId: this.serieId
        }
        this._serieService.saveComentario(this.newComentario, this.token).subscribe(
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

  updateComentario(comentario): void{
    if(this.uptexto.value != ""){
      console.log(this.uptexto.value);
      if(this.usuario == null){
        //alert("Necesitas iniciar sesión");
        //this._router.navigate(['/login']);
        this.modal = 'userComentario';
      }else{
        this.newComentario = {
          comentarioId: comentario,
          texto: this.uptexto.value,
          usuarioId: this.usuario._id,
          serieId: this.serieId
        }
        this._serieService.updateComentario(this.newComentario, this.token).subscribe(
          response => {
            console.log(response);
            if (response.message == 'Modificado') {
              console.log('nada');
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

  modalEliminar(comentario) {
    this.comentarioDel = comentario;
    this.modal = 'eliminarComentario';
  }

  deleteComentario(){
    //if(window.confirm('¿Estas seguro de eliminar el comentario?')){
      console.log('borrar');
      this._serieService.deleteComentario(this.serieId, this.usuario._id, this.comentarioDel, this.token).subscribe(
        response => {
          if(response.message == 'Eliminado'){
            //alert('El comentario se ha eliminado correctamente');
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
