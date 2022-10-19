import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { AdminService } from '../services/admin.service';
import { Usuario } from '../models/usuario';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public usuario: Usuario;
  public token: String;
  public modal: String;
  public serieId = new FormControl('', [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]);
  public peliId= new FormControl('', [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]);
  public profId = new FormControl('', [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]);
  public option: String;
  public pelicula: Object;
  public serie: Object;
  public profesional: Object;

  constructor(
    private _usuarioService: UsuarioService,
    private _adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.usuario = this._usuarioService.getIdentidad();
    if(this.usuario.rol != 'admin'){
      this.modal = 'denegado';
    }
    this.token = this._usuarioService.getToken();
  }

  addPeli(){
    console.log(this.peliId.value);
    this.pelicula = {
      idPeli: this.peliId.value,
      adminId: this.usuario._id
    }
    this._adminService.addPeli(this.pelicula, this.token).subscribe(
      response => {
        this.peliId.reset();
        this.pelicula = null;
        if (response.peli) {
          this.modal = 'addPeli';
        } else{
          this.modal = 'ErrorPeli';
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  addSerie(){
    console.log(this.serieId.value);
    this.serie = {
      idSerie: this.serieId.value,
      adminId: this.usuario._id
    }
    console.log(this.serie);
    this._adminService.addSerie(this.serie, this.token).subscribe(
      response => {
        this.serieId.reset();
        this.serie = null;
        if (response.serie) {
          this.modal = 'addSerie';
        } else{
          this.modal = 'ErrorSerie';
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  addProf(){
    console.log(this.profId.value);
    this.profesional = {
      idProf: this.profId.value,
      adminId: this.usuario._id
    }
    this._adminService.addProf(this.profesional, this.token).subscribe(
      response => {
        this.profId.reset();
        this.profesional = null;
        if (response.profesional) {
          this.modal = 'addProf';
        } else{
          this.modal = 'ErrorProf';
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  upPlataformasPeli(){
    this._adminService.upPlataformasPeli(this.token, this.usuario._id).subscribe(
      response => {
        if (response.message == 'Actualizado'){
          this.modal = 'plataformaPeli';
        } else {
          this.modal = 'noPlataformaPeli'
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  upPlataformasSerie(){
    this._adminService.upPlataformasSerie(this.token, this.usuario._id).subscribe(
      response => {
        if (response.message == 'Actualizado'){
          this.modal = 'plataformaSerie';
        } else {
          this.modal = 'noPlataformaSerie';
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  upRecomendador(){
    this._adminService.upRecomendador(this.token, this.usuario._id).subscribe(
      response => {
        if (response.message == 'Actualizado'){
          this.modal = 'upRecomendador';
        } else {
          this.modal = 'noUpRecomendador';
        }
      }, 
      error => {
        console.log(<any>error);
      }
    )
  }

}
