import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SerieService } from '../services/serie.service';
import { Serie } from '../models/serie';

@Component({
  selector: 'app-update-critica-serie',
  templateUrl: '../update-critica-peli/update-critica-peli.component.html',
  styleUrls: ['../update-critica-peli/update-critica-peli.component.scss']
})
export class UpdateCriticaSerieComponent implements OnInit {

  public usuario: Usuario;
  public serie: Serie;
  public criticaForm: FormGroup;
  public token: String;
  public serieId: String;
  public criticaId: String;
  public critica: Object;
  public newCritica: Object;
  public identidad;

  constructor(
    private _usuarioService: UsuarioService,
    private _serieService: SerieService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
   }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.serieId = params.serie;
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
    console.log('entra');
    this._serieService.getCritica(this.serieId, this.criticaId).subscribe(
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
    this._usuarioService.getUsuario(this.usuario._id, this.token).subscribe(
      response => {
        this.identidad = response;
        console.log(this.identidad);
        localStorage.setItem('identidad', JSON.stringify(this.identidad.usuario));
        alert('La crítica se ha guardado correctamente');
        this._router.navigate(['/serie', this.serieId]);
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  onSubmit(): void {
    console.log('entra');
    this.newCritica = {
      serieId: this.serieId
    }
    Object.assign(this.critica, this.newCritica);
    console.log(this.critica);
    this._serieService.updateCritica(this.critica, this.token).subscribe(
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
