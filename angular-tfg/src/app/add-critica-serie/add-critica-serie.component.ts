import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SerieService } from '../services/serie.service';

@Component({
  selector: 'app-add-critica-serie',
  templateUrl: '../add-critica/add-critica.component.html',
  styleUrls: ['../add-critica/add-critica.component.scss']
})
export class AddCriticaSerieComponent implements OnInit {

  public usuario: Usuario;
  public criticaForm: FormGroup;
  public newCritica: Object;
  public token: String;
  public serieId: String;

  constructor(
    private _usuarioService: UsuarioService,
    private _serieService: SerieService,
    private _route: ActivatedRoute,
    private _router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.serieId = params.id;
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
      serieId: this.serieId
    }
    this._serieService.saveCritica(this.newCritica, this.token).subscribe(
      response => {
        console.log(response);
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
