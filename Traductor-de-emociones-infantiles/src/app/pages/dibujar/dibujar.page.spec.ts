import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DibujarPage } from './dibujar.page';

describe('DibujarPage', () => {
  let component: DibujarPage;
  let fixture: ComponentFixture<DibujarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DibujarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
