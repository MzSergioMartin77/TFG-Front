import { Injectable, Type } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public url: String;
  public identidad;
  public token;

  constructor(private _http: HttpClient) {
    this.url = "http://localhost:3700/";
  }

  registro(usuario: Usuario): Observable<any> {
    let params = JSON.stringify(usuario);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url+'registro', params, {headers: headers});
  }

  login(usuario, getToken = null): Observable<any> {
    if(getToken!=null){
      usuario.token = getToken;
    }

    let params = JSON.stringify(usuario);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url+'login', params, {headers: headers});
  }

  getIdentidad(){
    let localIdentidad = JSON.parse(localStorage.getItem('identidad'));

    if(localIdentidad != 'undefined'){
      this.identidad = localIdentidad;
    }else{
      this.identidad = null;
    }

    return this.identidad;
  }

  getToken(){
    let localToken = localStorage.getItem('token');

    if(localToken != 'undefined'){
      this.token = localToken.toString();
      console.log(this.token);
    }else{
      this.token = null;
    }
    
    return this.token;
  }

  getPerfil(usuarioId, token) :Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.get(this.url+'usuario/'+usuarioId, {headers:headers});
  }

  getUsuario(usuarioId) :Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');

    return this._http.get(this.url+'otroUsuario/'+usuarioId, {headers:headers});
  }

  getUpdateUsuario(usuario, usuarioId, token) :Observable<any>{
    let params = JSON.stringify(usuario);
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

    return this._http.put(this.url+'updateUsuario/'+usuarioId, params, {headers: headers});
  }

  seguirUsuario(identificadorId, usuarioId, token) :Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

    return this._http.get(this.url+'seguir/'+identificadorId+'/'+usuarioId, {headers:headers});
  }

  dejarSeguir(identificadorId, usuarioId, token) :Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

    return this._http.delete(this.url+'dejarSeguir/'+identificadorId+'/'+usuarioId, {headers:headers});
  }

}
