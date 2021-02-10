import { Injectable, Type } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { Pelicula } from '../models/pelicula';
import { UsuarioService } from './usuario.service';


@Injectable({
  providedIn: 'root',
})
export class PeliculaService {

  public url: String;

  constructor(private _http: HttpClient, private _usuarioService: UsuarioService) {
    this.url = "http://localhost:3700/";
  }

  getSeries() :Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    
    return this._http.get(this.url+'series', {headers:headers});
  }

  getPeliculas() :Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    
    return this._http.get(this.url+'peliculas', {headers:headers});
  }

  getPeliculaId(id) :Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');

    return this._http.get(this.url+'pelicula/'+id, {headers:headers});
  }

  getPeliculaT(titulo) :Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');

    return this._http.get(this.url+'pelicula/t/'+titulo, {headers:headers});
  }

  saveCritica(critica, token) :Observable<any>{
    console.log(critica);
    let params = JSON.stringify(critica);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.post(this.url+'peliCritica', params, {headers: headers});
  }

  saveComentario(comentario, token) :Observable<any>{
    console.log(comentario);
    let params = JSON.stringify(comentario);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.post(this.url+'peliComentario', params, {headers: headers});
  }
}
