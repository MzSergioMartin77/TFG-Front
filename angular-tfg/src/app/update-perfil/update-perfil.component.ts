import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-update-perfil',
  templateUrl: './update-perfil.component.html',
  styleUrls: ['./update-perfil.component.scss']
})
export class UpdatePerfilComponent implements OnInit {

  public usuario: Usuario;
  public registroForm: FormGroup;
  public mayuscula: any = /[A-Z]/;
  public numero: any = /\d/;
  public minuscula: any = /[a-z]/;
  public passMatch: string;
  public status: string;
  public token: string;
  public userUp: Object;
  public filesToUpload: Array<File>;
  public url = 'http://localhost:3700/';

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private fb: FormBuilder,
    private _usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.usuario = this._usuarioService.getIdentidad();
    if(this.usuario == null){
      alert("Necesitas iniciar sesión");
      this._router.navigate(['/login']);
    }
    this.token = this._usuarioService.getToken();
    this.registroForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.compose([
        Validators.required, Validators.maxLength(50)
      ])],
      /*nick: [this.usuario.nick, Validators.compose([
        Validators.required, Validators.minLength(4), Validators.maxLength(50)
      ])],*/
      email: [this.usuario.email, Validators.compose([
        Validators.required, Validators.email
      ])],
      pass: ['', Validators.compose([
        Validators.required, Validators.minLength(8), Validators.pattern(this.mayuscula), Validators.maxLength(50),
        Validators.pattern(this.numero), Validators.pattern(this.minuscula)
      ])],
      confirmPass: ['', Validators.required],
      descripcion: [this.usuario.descripcion, Validators.compose([
        Validators.minLength(8), Validators.maxLength(150)
      ])],
      imagen: [this.usuario.imagen]
    });
    
  }

  onSubmit(){
    if(this.pass.value != this.confirmPass.value){
      this.passMatch = 'false';
    }
    else {
      console.log(this.nombre.value);
      this.userUp = {
        nombre: this.nombre.value,
        email: this.email.value,
        pass: this.pass.value,
        descripcion: this.descripcion.value
      }
      this._usuarioService.getUpdateUsuario(this.userUp, this.usuario._id, this.token).subscribe(
        response => {
          console.log(response);
          if(response.userUpdate){
            //Actualizar imagen de perfil
            this._usuarioService.imagenFile(this.url+'uploadImagen/'+response.userUpdate._id, [], this.filesToUpload, this.token, 'imagen')
              .then((result: any) => {
                console.log('entra');
                console.log(result);
                response.userUpdate.imagen = result.userUpdate.imagen;
                localStorage.setItem('identidad', JSON.stringify(response.userUpdate));
                alert('Se han guardado los cambios correctamente');
                //this._router.navigate(['/perfil']);
              });

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

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  get nombre() { return this.registroForm.get('nombre'); }
  //get nick() { return this.registroForm.get('nick'); }
  get email() { return this.registroForm.get('email'); }
  get pass() { return this.registroForm.get('pass'); }
  get confirmPass() { return this.registroForm.get('confirmPass'); }
  get descripcion() { return this.registroForm.get('descripcion'); }

}
