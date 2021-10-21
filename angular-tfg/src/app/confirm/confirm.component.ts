import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  @Input() mensaje: string;
  @Input() status: string;
  @Output() aceptButton = new EventEmitter<void>();
  @Output() yesButton = new EventEmitter<void>();
  @Output() noButton = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

}
