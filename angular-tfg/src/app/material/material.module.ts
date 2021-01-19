import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion'; 
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    MatExpansionModule,
    MatListModule,
    MatIconModule
  ]
})
export class MaterialModule { }
