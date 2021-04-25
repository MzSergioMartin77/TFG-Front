import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PeliculaService } from '../services/pelicula.service';
import { error } from 'protractor';

@Component({
  selector: 'app-add-critica',
  templateUrl: './add-critica.component.html',
  styleUrls: ['./add-critica.component.scss']
})
export class AddCriticaComponent implements OnInit {

  public usuario: Usuario;
  public criticaForm: FormGroup;
  public newCritica: Object;
  public token: String;
  public peliculaId: String;
  public identidad;

  constructor(
    private _usuarioService: UsuarioService,
    private _peliculaService: PeliculaService,
    private _route: ActivatedRoute,
    private _router: Router,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.usuario = this._usuarioService.getIdentidad();
    if (this.usuario == null) {
      alert("Necesitas iniciar sesión");
      this._router.navigate(['/login']);
    }
    else {
      this._route.params.subscribe(params => {
        this.peliculaId = params.id;
        this.getCritica();
      });
      this.token = this._usuarioService.getToken();
      console.log(this.usuario);

      this.criticaForm = this.fb.group({
        titulo: ['', Validators.compose([
          Validators.required, Validators.maxLength(50)
        ])],
        texto: ['', Validators.compose([
          Validators.required, Validators.minLength(140)
        ])],
        nota: ['', Validators.compose([
          Validators.required, Validators.min(1)
        ])]
      });
    }
  }

  getCritica(){
    this._peliculaService.getCriticaUser(this.peliculaId, this.usuario._id).subscribe(
      response => {
        if(response.critica){
          alert('Este usuario ya ha escrito una crítica');
          this._router.navigate(['/pelicula/'+this.peliculaId]);
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


  reloadUsuario() {
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
    this.newCritica = {
      nota: this.nota.value,
      titulo: this.titulo.value,
      texto: this.texto.value,
      usuario: this.usuario._id,
      peliculaId: this.peliculaId
    }
    this._peliculaService.saveCritica(this.newCritica, this.token).subscribe(
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

  get titulo() { return this.criticaForm.get('titulo'); }
  get texto() { return this.criticaForm.get('texto'); }
  get nota() { return this.criticaForm.get('nota'); }

}
