import { Injectable, Type } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SerieService {

  public url: String;

  constructor(private _http: HttpClient) {
    this.url = "http://localhost:3700/";
  }

  getSeries() :Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    
    return this._http.get(this.url+'series', {headers:headers});
  }

  getSerieId(id) :Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');

    return this._http.get(this.url+'serie/'+id, {headers:headers});
  }

  getSerieT(titulo) :Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');

    return this._http.get(this.url+'serie/t/'+titulo, {headers:headers});
  }

  getCritica(serie, critica) :Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');

    return this._http.get(this.url+'criticaSerie/'+serie+'/'+critica, {headers:headers});
  }

  saveCritica(critica, token) :Observable<any>{
    let params = JSON.stringify(critica);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.post(this.url+'serieCritica', params, {headers: headers});
  }
  
  updateCritica(critica, token) :Observable<any>{
    let params = JSON.stringify(critica);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.put(this.url+'criticaSupdate', params, {headers: headers});
  }

  deleteCritica(serie, usuario, token) :Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.delete(this.url+'deleteScritica/'+serie+'/'+usuario, {headers: headers});
  }

  saveComentario(comentario, token) :Observable<any>{
    console.log(comentario);
    let params = JSON.stringify(comentario);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.post(this.url+'serieComentario', params, {headers: headers});
  }
}
