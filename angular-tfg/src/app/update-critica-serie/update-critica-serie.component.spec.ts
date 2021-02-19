import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCriticaSerieComponent } from './update-critica-serie.component';

describe('UpdateCriticaSerieComponent', () => {
  let component: UpdateCriticaSerieComponent;
  let fixture: ComponentFixture<UpdateCriticaSerieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCriticaSerieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCriticaSerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
