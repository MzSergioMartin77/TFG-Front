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
  public url = 'http://localhost:3700/';

  constructor(
    private _usuarioService: UsuarioService,
    private _router: Router
    ) { }

  ngOnInit(): void {
    this.usuario = this._usuarioService.getIdentidad();
    console.log(this.usuario);
    if(this.usuario == null){
      alert("Necesitas iniciar sesión");
      this._router.navigate(['/login']);
    } 
    console.log(this.usuario.imagen);
  }

}
