import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  public usuario: Usuario;
  public registroForm: FormGroup;
  public mayuscula: any = /[A-Z]/;
  public numero: any = /\d/;
  public minuscula: any = /[a-z]/;
  public passMatch: string;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private fb: FormBuilder,
    private _usuarioService: UsuarioService
  ) { 
    this.usuario = new Usuario('',null,'','','','','','', null, null, null, null, null, null);
  }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.compose([
        Validators.required, Validators.maxLength(50)
      ])],
      nick: [this.usuario.nick, Validators.compose([
        Validators.required, Validators.maxLength(50)
      ])],
      email: [this.usuario.email, Validators.compose([
        Validators.required, Validators.email
      ])],
      pass: [this.usuario.pass, Validators.compose([
        Validators.required, Validators.minLength(8), Validators.pattern(this.mayuscula), Validators.maxLength(50),
        Validators.pattern(this.numero), Validators.pattern(this.minuscula)
      ])],
      confirmPass: ['', Validators.required],
      descripcion: [this.usuario.descripcion, Validators.compose([
        Validators.minLength(8), Validators.maxLength(250)
      ])]
    });
    
  }

  onSubmit(){
    if(this.pass.value != this.confirmPass.value){
      this.passMatch = 'false';
    }
    else {
      this._usuarioService.registro(this.registroForm.value).subscribe(
        response => {
          console.log(response);
          if(response.usuario && response.usuario._id){
            this.status = 'true';
            alert('Se ha registrado correctamente');
            this._router.navigate(['/login']);
          }else{
            if(response.message == 'Email-Error'){
              this.status = 'false-email';
            }
            else if(response.message == 'Nick-Error'){
              this.status = 'false-nick';
            }
            else{ this.status = 'false'}
          }
        },
        error => {
          console.log(<any>error);
        }
      );
    }
  }

  get nombre() { return this.registroForm.get('nombre'); }
  get nick() { return this.registroForm.get('nick'); }
  get email() { return this.registroForm.get('email'); }
  get pass() { return this.registroForm.get('pass'); }
  get confirmPass() { return this.registroForm.get('confirmPass'); }
  get descripcion() { return this.registroForm.get('descripcion'); }
}
