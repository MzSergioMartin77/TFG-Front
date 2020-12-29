import { Component, OnInit } from '@angular/core';
import { Serie } from '../models/serie';
import { SerieService } from '../services/serie.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss'],
  providers: [SerieService]
})
export class SeriesComponent implements OnInit {

  public serie: Serie;

  constructor(
    private _route: ActivatedRoute,
    private _serieService: SerieService
    ) { }

  ngOnInit(): void {
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

}
