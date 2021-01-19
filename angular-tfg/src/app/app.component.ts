import { Component, OnInit,  DoCheck} from '@angular/core';
import { UsuarioService } from './services/usuario.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, DoCheck{
  title = 'angular-tfg';
  public identidad;

  constructor(
    private _usuarioService: UsuarioService,
    private _router: Router
    ){}

  ngOnInit(){
    this.identidad = this._usuarioService.getIdentidad();
  }

  ngDoCheck(){
    this.identidad = this._usuarioService.getIdentidad();
  }

  logout(){
    localStorage.clear();
    this.identidad = null;
    this._router.navigate(['/']);
  }
}
