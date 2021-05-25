import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public usuario: Usuario;
  public loginForm: FormGroup;
  public mayuscula: any = /[A-Z]/;
  public numero: any = /\d/;
  public minuscula: any = /[a-z]/;
  public passMatch: string;
  public status: string;
  public identidad;
  public token;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private fb: FormBuilder,
    private _usuarioService: UsuarioService
  ) { 
    this.usuario = new Usuario('',null,'','','','','','',null, null, null, null, null, null);
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [this.usuario.email, Validators.compose([
        Validators.required, Validators.email
      ])],
      pass: [this.usuario.pass, Validators.compose([
        Validators.required, Validators.minLength(8), Validators.pattern(this.mayuscula), Validators.maxLength(50),
        Validators.pattern(this.numero), Validators.pattern(this.minuscula)
      ])]
    });
  }

  onSubmit(){
    this._usuarioService.login(this.loginForm.value).subscribe(
      response => {
        this.identidad = response.usuario;
        console.log(this.identidad);
        if(!this.identidad){
          console.log("Fallo1");
          this.status = 'false';
        }else{
          console.log("Bien1");
          //this.status = "true";
          localStorage.setItem('identidad', JSON.stringify(this.identidad));
          this.getToken();
        }
        
      },
      error => {
        var errorMessage = <any>error;
        if(errorMessage != null){
          this.status = 'false';
        }
      }
    );
  }

  getToken(){
    this._usuarioService.login(this.loginForm.value, 'true').subscribe(
      response => {
        console.log(response.token);
        this.token = response.token;
        if(this.token.length <= 0){
          console.log('Fallo2');
          this.status = 'false';
        }else{
          console.log('Bien2');
          this.status = "true";
          localStorage.setItem('token', this.token);
          this._router.navigate(['/']);
        }
        
      },
      error => {
        var errorMessage = <any>error;
        if(errorMessage != null){
          this.status = 'false';
        }
      }
    );
  }

  get email() { return this.loginForm.get('email'); }
  get pass() { return this.loginForm.get('pass'); }

}
