import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RotasPage } from './rotas.page';

describe('RotasPage', () => {
  let component: RotasPage;
  let fixture: ComponentFixture<RotasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RotasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
