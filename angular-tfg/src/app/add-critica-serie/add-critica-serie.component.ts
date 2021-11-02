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
  public identidad;
  public modal: String;

  constructor(
    private _usuarioService: UsuarioService,
    private _serieService: SerieService,
    private _route: ActivatedRoute,
    private _router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.usuario = this._usuarioService.getIdentidad();
    if (this.usuario == null) {
      //alert("Necesitas iniciar sesión");
      //this._router.navigate(['/login']);
      this.modal = 'login';
    } else {
      this._route.params.subscribe(params => {
        this.serieId = params.id;
      });
      this.token = this._usuarioService.getToken();
      this.criticaForm = this.fb.group({
        titulo: ['', Validators.compose([
          Validators.required, Validators.maxLength(100)
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

  getCritica() {
    this._serieService.getCriticaUser(this.serieId, this.usuario._id).subscribe(
      response => {
        if (response.critica) {
          //alert('Este usuario ya ha escrito una crítica');
          //this._router.navigate(['/serie/' + this.serieId]);
          this.modal = 'existCriticaS';
        }
      },
      error => {
        console.log(<any>error);
        if (error.status === 404 || error.status === 500) {
          alert('Esta serie no se encuentra en la base de datos');
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
        //alert('La crítica se ha guardado correctamente');
        this._router.navigate(['/serie', this.serieId]);
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
      serieId: this.serieId
    }
    this._serieService.saveCritica(this.newCritica, this.token).subscribe(
      response => {
        console.log(response);
        if (response.message == 'Guardado') {
          console.log('Entro');
          this.modal = 'addCritica';
          this.reloadUsuario();
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
