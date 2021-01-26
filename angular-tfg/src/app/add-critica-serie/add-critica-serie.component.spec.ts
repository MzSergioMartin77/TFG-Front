import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCriticaSerieComponent } from './add-critica-serie.component';

describe('AddCriticaSerieComponent', () => {
  let component: AddCriticaSerieComponent;
  let fixture: ComponentFixture<AddCriticaSerieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCriticaSerieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCriticaSerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
