import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  public identidad;

  constructor(private _usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.identidad = this._usuarioService.getIdentidad();
  }

}
