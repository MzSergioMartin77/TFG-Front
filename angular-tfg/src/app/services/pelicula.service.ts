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

  getBuscarPeli(titulo) :Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');

    return this._http.get(this.url+'buscarPeli/'+titulo, {headers:headers});
  }

  getCriticaUser(pelicula, usuario) :Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');

    return this._http.get(this.url+'criticaPeliUser/'+pelicula+'/'+usuario, {headers:headers});
  }

  getCritica(pelicula, critica) :Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');

    return this._http.get(this.url+'criticaPeli/'+pelicula+'/'+critica, {headers:headers});
  }

  saveCritica(critica, token) :Observable<any>{
    console.log(critica);
    let params = JSON.stringify(critica);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.post(this.url+'peliCritica', params, {headers: headers});
  }

  updateCritica(critica, token) :Observable<any>{
    let params = JSON.stringify(critica);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.put(this.url+'criticaPupdate', params, {headers: headers});
  }

  deleteCritica(pelicula, usuario, token) :Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.delete(this.url+'deletePcritica/'+pelicula+'/'+usuario, {headers: headers});
  }

  saveComentario(comentario, token) :Observable<any>{
    console.log(comentario);
    let params = JSON.stringify(comentario);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.post(this.url+'peliComentario', params, {headers: headers});
  }

  saveNota(nota, token) :Observable<any>{
    console.log(nota);
    let params = JSON.stringify(nota);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.post(this.url+'peliculaNota', params, {headers: headers});
  }
}
