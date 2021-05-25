import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  //public identidad;
  public nombre = String;
  public usuario: Usuario;
  public token: String;
  public url = 'http://localhost:3700/';
  public recomendaciones = [];
  public status = false;

  constructor(
    private _usuarioService: UsuarioService,
    private _router: Router
    ) { }

  ngOnInit(): void {
    this.usuario = this._usuarioService.getIdentidad();
    this.token = this._usuarioService.getToken();
    console.log(this.usuario);
    if(this.usuario == null){
      alert("Necesitas iniciar sesión");
      this._router.navigate(['/login']);
    } 
    console.log(this.usuario.imagen);
  }

  recomendador() {
    this._usuarioService.recomendador(this.usuario._id, this.token).subscribe(
      response => {
        this.recomendaciones = response.recomendaciones;
        this.recomendaciones.splice(0, 1);
        this.status = true;
        console.log(this.recomendaciones);
      },
      error =>{
        console.log(<any>error);
      }
    )
  }

}
