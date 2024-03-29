import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { Upload } from './upload';
import { EMPTY, Observable } from 'rxjs';

@Component({
  selector: 'app-update-perfil',
  templateUrl: './update-perfil.component.html',
  styleUrls: ['./update-perfil.component.scss']
})
export class UpdatePerfilComponent implements OnInit {

  public usuario: Usuario;
  public usuarioParam: String;
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
  public imagen = false;
  public modal: String = 'nada';
  public user: String;
  public progress = 0;
  file: File | null | undefined;
  upload$: Observable<Upload> = EMPTY;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private fb: FormBuilder,
    private _usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.usuario = this._usuarioService.getIdentidad();
    this._route.params.subscribe(params => {
      this.usuarioParam = params.id;
      console.log(this.usuarioParam);
    });
    console.log(this.usuario);
    if (this.usuario == null || this.usuario._id != this.usuarioParam) {
      console.log('prueba');
      this.user = 'false';
      this.modal = 'login';
      console.log(this.modal);
      //alert("Necesitas iniciar sesión");
      //this._router.navigate(['/login']);
    } else {
      this.user = 'true';
      this.token = this._usuarioService.getToken();

      this.registroForm = this.fb.group({
        nombre: [this.usuario.nombre, Validators.compose([
          Validators.maxLength(50)
        ])],
        /*nick: [this.usuario.nick, Validators.compose([
          Validators.required, Validators.minLength(4), Validators.maxLength(50)
        ])],*/
        email: [this.usuario.email, Validators.compose([
          Validators.email
        ])],
        /*pass: ['', Validators.compose([
          Validators.required, Validators.minLength(8), Validators.pattern(this.mayuscula), Validators.maxLength(50),
          Validators.pattern(this.numero), Validators.pattern(this.minuscula)
        ])],
        confirmPass: ['', Validators.required],*/
        descripcion: [this.usuario.descripcion, Validators.compose([
          Validators.minLength(8), Validators.maxLength(500)
        ])]
        //imagen: [this.usuario.imagen]
      });
    }
  }


  onSubmit(){
    console.log('entra')
    if(this.imagen){
      console.log('entra imagen')
      this.upload$ = this._usuarioService.uploadImagen(this.file,  this.token, this.usuario._id)
      this.upload$.subscribe(
        response => {
          if(response.state == 'SUBIDO'){
            console.log('subido');
            this.updateInfo();
          }
        }
      )
    }else{
      this.updateInfo();
    }
  }

  updateInfo(){
    this._usuarioService.getUpdateUsuario(this.registroForm.value, this.usuario._id, this.token).subscribe(
      response => {
        if (response.userUpdate){
          console.log('nooooooooo')
          localStorage.setItem('identidad', JSON.stringify(response.userUpdate));
          this.modal = 'updateUser';
        }else {
          if (response.message == 'Email-Error') {
            this.status = 'false-email';
          }
          else { this.status = 'false' }
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  /*imagenChangeEvent(fileInput: any) {
    let file = (<HTMLInputElement>fileInput.target.files[0]);
    
    if(file.type == "image/jpeg" || file.type == "image/JPEG" || file.type == "image/jpg" || file.type == "image/JPG"
      || file.type == "image/png" || file.type == "image/PNG" || file.type == "image/gif" || file.type == "image/GIF"){
        this.status = "imagen";
        this.imagen = true;
        this.filesToUpload = <Array<File>>fileInput.target.files;
      } else {
        this.status = "false-imagen";
      }
  }*/

  imagenEvent(files: FileList) {
    console.log('imagen');
    this.status = "imagen";
    let file = files[0];
    if(file.type == "image/jpeg" || file.type == "image/JPEG" || file.type == "image/jpg" || file.type == "image/JPG"
      || file.type == "image/png" || file.type == "image/PNG" || file.type == "image/gif" || file.type == "image/GIF"){
        this.file = files.item(0);
        this.imagen = true;
      } else {
        this.status = "false-imagen";
      }
  }



  get nombre() { return this.registroForm.get('nombre'); }
  //get nick() { return this.registroForm.get('nick'); }
  get email() { return this.registroForm.get('email'); }
  get pass() { return this.registroForm.get('pass'); }
  get confirmPass() { return this.registroForm.get('confirmPass'); }
  get descripcion() { return this.registroForm.get('descripcion'); }

}
