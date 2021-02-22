import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { element } from 'protractor';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  public usuario: Usuario;
  public usuarioId: String;
  public identificado: Usuario;
  public status: String;
  public token: String;
  public identidad;

  constructor(
    private _usuarioService: UsuarioService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.status = 'nada';
    this._route.params.subscribe(params => {
      this.usuarioId = params.id;
      this.getUsuario();
    });
    this.identificado = this._usuarioService.getIdentidad();
    if(this.identificado != null){
      this.status = 'noSeguido'
      this.getSeguidor();
    }
    this.token = this._usuarioService.getToken();
  }

  getUsuario(){
    this._usuarioService.getUsuario(this.usuarioId).subscribe(
      response => {
        this.usuario = response.usuario;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  reloadUsuario(){
    this._usuarioService.getPerfil(this.identificado._id, this.token).subscribe(
      response => {
        this.identidad = response;
        console.log(this.identidad);
        localStorage.setItem('identidad', JSON.stringify(this.identidad.usuario));
        alert('Los cambios se han guardado correctamente');
        window.location.reload();
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  getSeguidor(){
    this.identificado.seguidos.forEach((element) => {
      if(element.usuario == this.usuarioId){
        this.status = 'seguido';
      }
    })
  }

  seguirUsuario(){
    this._usuarioService.seguirUsuario(this.identificado._id, this.usuarioId, this.token).subscribe(
      response => {
        if(response.message == 'Guardado'){
          this.reloadUsuario();
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  dejarSeguir(){
    this._usuarioService.dejarSeguir(this.identificado._id, this.usuarioId, this.token).subscribe(
      response => {
        if(response.message == 'Guardado'){
          this.reloadUsuario();
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

}
