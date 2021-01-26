import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCriticaComponent } from './add-critica.component';

describe('AddCriticaComponent', () => {
  let component: AddCriticaComponent;
  let fixture: ComponentFixture<AddCriticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCriticaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCriticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
