import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public url: String;

  constructor(private _http: HttpClient) {
    this.url = "http://localhost:3700/";
  }


  addPeli(pelicula, token) :Observable<any>{
    let params = JSON.stringify(pelicula);
    console.log(params);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.post(this.url+'addPelicula', params, {headers: headers});
  }

  addSerie(serie, token) :Observable<any>{
    let params = JSON.stringify(serie);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.post(this.url+'addSerie', params, {headers: headers});
  }

  addProf(profesional, token) :Observable<any>{
    let params = JSON.stringify(profesional);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.post(this.url+'addProfesional', params, {headers: headers});
  }

  upPlataformasPeli(token, admin) :Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);
    
    return this._http.get(this.url+'upPlataformasPeli/'+admin, {headers:headers});
  }
  
  upPlataformasSerie(token, admin) :Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);
    
    return this._http.get(this.url+'upPlataformasSerie/'+admin, {headers:headers});
  }

  upRecomendador(token, admin) :Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);
    
    return this._http.get(this.url+'upRecomendador/'+admin, {headers:headers});
  }
}
