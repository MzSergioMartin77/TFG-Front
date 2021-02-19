import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCriticaPeliComponent } from './update-critica-peli.component';

describe('UpdateCriticaPeliComponent', () => {
  let component: UpdateCriticaPeliComponent;
  let fixture: ComponentFixture<UpdateCriticaPeliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCriticaPeliComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCriticaPeliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
