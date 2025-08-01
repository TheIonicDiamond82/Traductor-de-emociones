import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EscribirPage } from './escribir.page';

describe('EscribirPage', () => {
  let component: EscribirPage;
  let fixture: ComponentFixture<EscribirPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EscribirPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
