import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CombustivelPage } from './combustivel.page';

describe('CombustivelPage', () => {
  let component: CombustivelPage;
  let fixture: ComponentFixture<CombustivelPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CombustivelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
