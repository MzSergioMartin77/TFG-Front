import { Injectable, Type } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfesionalService {

  public url: String;

  constructor(private _http: HttpClient) {
    this.url = "http://localhost:3700/";
  }

  getProfesionalId(id) :Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');

    return this._http.get(this.url+'profesional/'+id, {headers:headers});
  }

  getProfesionalN(nombre) :Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');

    return this._http.get(this.url+'profesional/n/'+nombre, {headers:headers});
  }
}
