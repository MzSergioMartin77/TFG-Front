import { Component, OnInit } from '@angular/core';
import { Serie } from '../models/serie';
import { SerieService } from '../services/serie.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Profesional } from '../models/profesional';
import { ProfesionalService } from '../services/profesional.service';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit {

  public serie: Serie;
  public profesionales: Profesional[];
  public profesional: Profesional;
  public usuario: Usuario;
  public status: String;

  constructor(
    private _route: ActivatedRoute,
    private _serieService: SerieService,
    private _profesionalService: ProfesionalService,
    private _router: Router,
    private _usuarioService: UsuarioService
    ) {}

  ngOnInit(): void {
    this.status = 'critica';
    this._route.params.subscribe(params => {
      let id = params.id;
      this.getSerie(id);
    });
  }

  getSerie(id){
    this._serieService.getSerieId(id).subscribe(
      response => {
        this.serie = response.serie;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  getProfesionalN(nombre){
    this._profesionalService.getProfesionalN(nombre).subscribe(
      response => {
        this.profesionales = response.profesional;
        this.profesional = this.profesionales[0];
        this._router.navigate(['/profesional/',this.profesional._id]);
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  getProfesional(nombre){
    this.getProfesionalN(nombre);
  }

  addCritica(){
    this.usuario = this._usuarioService.getIdentidad();
    if(this.usuario == null){
      alert("Necesitas iniciar sesión");
      this._router.navigate(['/login']);
    }else {
      this._router.navigate(['/addcriticaS/',this.serie._id]);
    }
  }

  statusCritica(){
    this.status = 'critica';
  }

  statusComentario(){
    this.status = 'comentario';
  }

}
