import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PeliculaService } from '../services/pelicula.service';

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

  constructor(
    private _usuarioService: UsuarioService,
    private _peliculaService: PeliculaService,
    private _route: ActivatedRoute,
    private _router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.peliculaId = params.id;
    });
    this.usuario = this._usuarioService.getIdentidad();
    this.token = this._usuarioService.getToken();
    console.log(this.usuario);
    if(this.usuario == null){
      alert("Necesitas iniciar sesión");
      this._router.navigate(['/login']);
    }
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

  onSubmit(): void{
    this.newCritica = {
      nota: this.nota.value,
      titulo: this.titulo.value,
      texto: this.texto.value,
      usuarioId: this.usuario._id,
      peliculaId: this.peliculaId
    }
    this._peliculaService.saveCritica(this.newCritica, this.token).subscribe(
      response => {
        console.log(response);
        if(response == 'Guardado'){
          console.log('Entro');
        }
      },
      error => {
        console.log(<any>error);
      }
    );
    console.log('Bien');
  }

  get titulo() { return this.criticaForm.get('titulo'); }
  get texto() { return this.criticaForm.get('texto'); }
  get nota() { return this.criticaForm.get('nota'); }

}
