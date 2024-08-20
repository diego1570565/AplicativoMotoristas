import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbastecimentoPage } from './abastecimento.page';

describe('AbastecimentoPage', () => {
  let component: AbastecimentoPage;
  let fixture: ComponentFixture<AbastecimentoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AbastecimentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
