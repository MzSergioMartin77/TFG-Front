import { Component, OnInit } from '@angular/core';
import { Serie } from '../models/serie';
import { SerieService } from '../services/serie.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
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
  public profesionales: Profesional[];
  public profesional: Profesional;
  public usuario: Usuario;
  public status: String;
  public newComentario: Object;
  public serieId: String;
  public token: String;
  public comentarioForm: FormGroup;
  public texto = new FormControl('');
  public criticaUsuario = false;
  public miCritica: Object;
  public identidad;

  constructor(
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
    this.serie.criticas.forEach(element => {
      if(element.usuario == this.usuario._id){
        if(element.texto){
          this.criticaUsuario = true;
          this.miCritica = element;
        }
      }
    });
  }

  getSerie(){
    this._serieService.getSerieId(this.serieId).subscribe(
      response => {
        this.serie = response.serie;
        if(this.usuario){
          this.usuarioSerie();
        }
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
      this._router.navigate(['/addcriticaS/',this.serie._id]);
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
      this._serieService.deleteCritica(this.serieId, this.usuario._id, this.token).subscribe(
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
    if(this.usuario == null){
      alert("Necesitas iniciar sesión");
      this._router.navigate(['/login']);
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
