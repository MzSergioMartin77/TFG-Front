import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PeliculaService } from '../services/pelicula.service';
import { Pelicula } from '../models/pelicula';

@Component({
  selector: 'app-update-critica-peli',
  templateUrl: './update-critica-peli.component.html',
  styleUrls: ['./update-critica-peli.component.scss']
})

export class UpdateCriticaPeliComponent implements OnInit {
 
  public usuario: Usuario;
  public pelicula: Pelicula;
  public criticaForm: FormGroup;
  public token: String;
  public peliculaId: String;
  public criticaId: String;
  public critica: Object;
  public newCritica: Object;
  public identidad;

  constructor(
    private _usuarioService: UsuarioService,
    private _peliculaService: PeliculaService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
   }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.peliculaId = params.pelicula;
      this.criticaId = params.critica;
      this.getCritica();
    });
    this.usuario = this._usuarioService.getIdentidad();
    this.token = this._usuarioService.getToken();
    console.log(this.usuario);
    if (this.usuario == null) {
      alert("Necesitas iniciar sesión");
      this._router.navigate(['/login']);
    }
  }

  getCritica(){
    this._peliculaService.getCritica(this.peliculaId, this.criticaId).subscribe(
      response => {
        this.critica = response.critica;
        console.log(this.critica);
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  reloadUsuario(){
    this._usuarioService.getPerfil(this.usuario._id, this.token).subscribe(
      response => {
        this.identidad = response;
        console.log(this.identidad);
        localStorage.setItem('identidad', JSON.stringify(this.identidad.usuario));
        alert('La crítica se ha guardado correctamente');
        this._router.navigate(['/pelicula', this.peliculaId]);
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  onSubmit(): void {
    console.log('entra');
    this.newCritica = {
      peliculaId: this.peliculaId
    }
    Object.assign(this.critica, this.newCritica);
    console.log(this.critica);
    this._peliculaService.updateCritica(this.critica, this.token).subscribe(
      response => {
        console.log(response);
        if (response.message == 'Guardado') {
          console.log('Entro');
          this.reloadUsuario();
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
